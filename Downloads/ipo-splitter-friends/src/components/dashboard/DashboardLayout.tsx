// src/components/DashboardLayout.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, LineChart, Users, Settings,
  Bell, LogOut, ChevronLeft, ChevronRight, Menu,
  Sun, Moon, MessageSquare,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui-custom/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      message: 'Rahul Kumar has accepted your collaboration request for XYZ Technologies IPO.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      message: 'Reminder: EFG Consumer Goods IPO closes tomorrow.',
      time: '5 hours ago',
      read: false
    },
    {
      id: '3',
      message: 'Priya Singh has sent you a message regarding XYZ Technologies IPO.',
      time: '1 day ago',
      read: true
    }
  ]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: LineChart, label: 'Investments', href: '/dashboard/investments' },
    { icon: Users, label: 'Collaborations', href: '/dashboard/collaborations' },
    { icon: MessageSquare, label: 'Chat', href: '/dashboard/chat/1' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];


  const [invitations, setInvitations] = useState<any[]>([]);
  const { toast } = useToast();

  // Fetch invitations data from Firebase
  const { data: fetchedInvitations, isLoading: invitationsLoading } = useQuery({
    queryKey: ['invitations'],
    queryFn: async () => {
      const invitationsCollection = collection(db, 'invitations');
      const invitationsSnapshot = await getDocs(invitationsCollection);
      return invitationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  });

  useEffect(() => {
    if (fetchedInvitations) {
      setInvitations(fetchedInvitations);
    }
  }, [fetchedInvitations]);

  // Handle accept invitation
  const handleAccept = async (invitationId: string) => {
    try {
      const invitationRef = doc(collection(db, 'invitations'), invitationId);
      await updateDoc(invitationRef, { status: 'accepted' });
      toast({
        title: 'Invitation Accepted',
        description: 'You have accepted the collaboration invitation.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept the invitation.',
        variant: 'destructive',
      });
    }
  };

  // Handle reject invitation
  const handleReject = async (invitationId: string) => {
    try {
      const invitationRef = doc(collection(db, 'invitations'), invitationId);
      await updateDoc(invitationRef, { status: 'rejected' });
      toast({
        title: 'Invitation Rejected',
        description: 'You have rejected the collaboration invitation.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject the invitation.',
        variant: 'destructive',
      });
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className={cn(
        "fixed top-0 left-0 right-0 z-10 h-14 border-b",
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800 text-white'
          : 'bg-white border-gray-100 text-gray-900'
      )}>
        <div className="flex items-center justify-between px-4 h-full max-w-7xl mx-auto">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2 lg:hidden w-8 h-8 p-0 flex items-center justify-center"
            >
              <Menu size={20} />
            </Button>
            <Link to="/" className="text-xl font-bold text-primary">
              IPOSplit
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative w-8 h-8 p-0 flex items-center justify-center rounded-full">
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-0" align="end">
                <div className={cn(
                  "flex items-center justify-between p-3 border-b",
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                )}>
                  <h3 className="font-medium text-sm">Invitations</h3>
                  {invitations.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
                      Mark all as read
                    </Button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {invitations.length > 0 ? (
                    <div>
                      {invitations.map((invitation) => (
                        <div
                          key={invitation.id}
                          className={cn(
                            "p-3 border-b text-sm flex justify-between items-center",
                            theme === 'dark'
                              ? 'bg-blue-900/20 border-gray-700'
                              : 'bg-blue-50 border-gray-200'
                          )}
                        >
                          <div>
                            <p className="text-sm">{invitation.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{invitation.time}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAccept(invitation.id)}
                              className="bg-green-600 text-white p-1 rounded-full"
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(invitation.id)}
                              className="bg-red-600 text-white p-1 rounded-full"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-sm text-muted-foreground">No invitations</p>
                    </div>
                  )}
                </div>

                <div className={cn(
                  "p-2 border-t",
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                )}>
                  <Link to="/dashboard/invitations">
                    <Button variant="ghost" size="sm" className="w-full h-8">View all invitations</Button>
                  </Link>
                </div>
              </PopoverContent>

            </Popover>

            <Link to="/profile">
              <Button variant="ghost" className="flex items-center space-x-2 rounded-full">
                <Avatar className="h-8 w-8">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user?.name} />
                  ) : (
                    <AvatarFallback className={cn(
                      "text-sm font-medium",
                      theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
                    )}>
                      <span>{user?.name?.[0]?.toUpperCase() || 'U'}</span>
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="hidden md:inline text-sm">{user?.name || 'User'}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex pt-14 flex-1">
        <AnimatePresence mode="wait">
          <motion.aside
            key={`sidebar-${sidebarOpen}`}
            initial={{ width: sidebarOpen ? 0 : 240, opacity: sidebarOpen ? 0 : 1 }}
            animate={{ width: sidebarOpen ? 240 : 70, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed top-14 bottom-0 z-10",
              sidebarOpen ? "w-60" : "w-[70px]",
              theme === 'dark'
                ? 'bg-gray-900 border-r border-gray-800'
                : 'bg-white border-r border-gray-100'
            )}
          >
            <div className="p-3 flex flex-col h-full">
              <div className="hidden lg:flex justify-end mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
                >
                  {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </Button>
              </div>

              <nav className="space-y-1 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? theme === 'dark'
                          ? "bg-primary/20 text-primary"
                          : "bg-primary/10 text-primary"
                        : theme === 'dark'
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className={cn("flex-shrink-0", sidebarOpen ? "mr-3 h-5 w-5" : "h-5 w-5")} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                ))}
              </nav>

              <Button
                variant="ghost"
                onClick={logout}
                className={cn(
                  "mt-auto flex items-center justify-start",
                  theme === 'dark'
                    ? "text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    : "text-red-600 hover:bg-red-50 hover:text-red-700"
                )}
              >
                <LogOut className={cn("flex-shrink-0", sidebarOpen ? "mr-3 h-4 w-4" : "h-5 w-5")} />
                {sidebarOpen && <span className="text-sm">Logout</span>}
              </Button>
            </div>
          </motion.aside>
        </AnimatePresence>

        <main className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          sidebarOpen ? "lg:ml-60" : "lg:ml-[70px]",
          "ml-0 py-6 px-4 md:px-6",
          theme === 'dark' ? 'bg-gray-950' : 'bg-background'
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
