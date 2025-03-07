import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { MessageSquare, Users, Bell, ChevronRight, LineChart, TrendingUp, Info, Wallet, Briefcase } from 'lucide-react';
import { UserIPO, Collaboration, Notification } from '@/types/ipo';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('investments');
  const { user } = useAuth();
  const [investmentCount, setInvestmentCount] = useState(0);
  const [invitationCount, setInvitationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const { data: myInvestments = [], isLoading: investmentsLoading } = useQuery<UserIPO[]>({
    queryKey: ['myInvestments'],
    queryFn: async () => {
      if (!user?.id) return [];
      const db = getFirestore();
      const investmentsQuery = query(collection(db, 'investments'), where('userId', '==', user.id));
      const investmentsSnapshot = await getDocs(investmentsQuery);
      return investmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserIPO[];
    },
    enabled: !!user?.id,
  });

  const { data: collaborations = [], isLoading: collaborationsLoading } = useQuery<Collaboration[]>({
    queryKey: ['collaborations'],
    queryFn: async () => {
      if (!user?.id) return [];
      const db = getFirestore();
      const collaborationsQuery = query(collection(db, 'collaborations'), where('userId', '==', user.id));
      const collaborationsSnapshot = await getDocs(collaborationsQuery);
      return collaborationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Collaboration[];
    },
    enabled: !!user?.id,
  });

  const { data: notifications = [], isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (!user?.id) return [];
      const db = getFirestore();
      const notificationsQuery = query(collection(db, 'notifications'), where('userId', '==', user.id));
      const notificationsSnapshot = await getDocs(notificationsQuery);
      return notificationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user?.id) return;
      const db = getFirestore();
      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      if (userId) {
        // Fetch investment count
        const investmentsQuery = query(collection(db, 'investments'), where('userId', '==', userId));
        const investmentsSnapshot = await getDocs(investmentsQuery);
        setInvestmentCount(investmentsSnapshot.size);

        // Fetch invitation count
        const invitationsQuery = query(collection(db, 'invitations'), where('userId', '==', userId));
        const invitationsSnapshot = await getDocs(invitationsQuery);
        setInvitationCount(invitationsSnapshot.size);

        // Fetch message count
        const messagesQuery = query(collection(db, 'messages'), where('userId', '==', userId));
        const messagesSnapshot = await getDocs(messagesQuery);
        setMessageCount(messagesSnapshot.size);

        // Fetch user count
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);
        setUserCount(usersSnapshot.size);
      }
    };

    fetchCounts();
  }, [user?.id]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Hello, {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1).toLowerCase() || 'User'}</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your investment dashboard. Manage your IPO investments and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Investments</p>
                    <h3 className="text-2xl font-bold mt-1">₹{myInvestments?.reduce((total, ipo) => total + ipo.amount, 0) || 0}</h3>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      +5.2% from last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex items-center text-xs text-blue-600">
                      <Info className="h-3 w-3 mr-1" /> {invitationCount} invitations
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Collaborations</p>
                    <h3 className="text-2xl font-bold mt-1">{collaborations?.length || 0}</h3>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      {messageCount} new this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-xs">
                      Active
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Portfolio Value</p>
                    <h3 className="text-2xl font-bold mt-1">₹{myInvestments?.reduce((total, ipo) => total + ipo.amount, 0) || 0}</h3>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      +8.7% overall return
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="px-0 pt-0">
                <Tabs
                  defaultValue="investments"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 mb-6 w-full md:w-auto">
                    <TabsTrigger value="investments">Investments ({investmentCount})</TabsTrigger>
                    <TabsTrigger value="collaborations">Collaborations ({collaborations?.length || 0})</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications ({notifications?.length || 0})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="investments" className="space-y-5 mt-4">
                    {investmentsLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : myInvestments.length > 0 ? (
                      myInvestments.map((ipo, index) => (
                        <motion.div
                          key={ipo.id}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                        >
                          <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300 overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h2 className="text-lg font-semibold">{ipo.ipoName}</h2>
                                  <p className="text-sm text-muted-foreground">{ipo.ipoId}</p>
                                </div>
                                <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                  Invested
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Your Investment</p>
                                  <p className="font-semibold">₹{ipo.amount}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Investment Date</p>
                                  <p className="font-semibold">{new Date(ipo.timestamp.seconds * 1000).toLocaleDateString()}</p>
                                </div>
                              </div>

                              <div className="mt-5 flex justify-end">
                                <Button variant="outline" size="sm" className="mr-2">Details</Button>
                                <Button size="sm">Manage</Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <p className="text-muted-foreground">You haven't invested in any IPOs yet.</p>
                        <Button className="mt-4">
                          <Link to="/ipo-listings">Explore IPOs</Link>
                        </Button>
                      </div>
                    )}

                    {myInvestments.length > 3 && (
                      <div className="text-center mt-4">
                        <Link to="/dashboard/investments">
                          <Button variant="outline" className="w-full">
                            View all investments ({myInvestments.length})
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="collaborations" className="space-y-5 mt-4">
                    {collaborationsLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : collaborations.length > 0 ? (
                      collaborations.slice(0, 2).map((collab, index) => (
                        <motion.div
                          key={collab.id}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                        >
                          <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-center mb-4">
                                <div>
                                  <h3 className="font-semibold">{collab.ipoName}</h3>
                                  <p className="text-sm text-muted-foreground">{collab.ipoSymbol} • {collab.status}</p>
                                </div>
                                <div className="text-lg font-semibold">
                                  {collab.totalAmount}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {collab.collaborators.map((user, i) => (
                                  <div key={user.id} className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-sm">
                                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-1">
                                      {user.name[0]}
                                    </span>
                                    {user.name}
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-end space-x-3">
                                <Button variant="outline" size="sm" className="flex items-center">
                                  <MessageSquare size={14} className="mr-1" /> Chat
                                </Button>
                                <Button size="sm">Details</Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <p className="text-muted-foreground">You don't have any active collaborations.</p>
                        <Button className="mt-4">
                          <Link to="/ipo-listings">Find Collaborators</Link>
                        </Button>
                      </div>
                    )}

                    {collaborations.length > 2 && (
                      <div className="text-center mt-4">
                        <Link to="/dashboard/collaborations">
                          <Button variant="outline" className="w-full">
                            View all collaborations ({collaborations.length})
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-4 mt-4">
                    {notificationsLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : notifications.length > 0 ? (
                      <>
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className={`p-4 rounded-lg ${notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'} border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all duration-300`}
                          >
                            <div className="flex items-start">
                              <Bell size={16} className={`mt-0.5 mr-3 ${notification.read ? 'text-gray-400 dark:text-gray-500' : 'text-blue-600 dark:text-blue-400'} flex-shrink-0`} />
                              <div>
                                <p className={`${notification.read ? 'text-foreground' : 'text-foreground font-medium'}`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        <div className="text-center mt-4">
                          <Link to="/dashboard/notifications">
                            <Button variant="outline" className="w-full">
                              View all notifications
                              <ChevronRight size={16} className="ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <p className="text-muted-foreground">No notifications at this time.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>

          <div className="space-y-6"> 
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Recommended IPOs</CardTitle>
                  <CardDescription>Based on your interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow duration-300 bg-gray-50/50 dark:bg-gray-800/50 dark:border-gray-700">
                    <h3 className="font-semibold">LMN Renewables</h3>
                    <p className="text-sm text-muted-foreground">LMNR • NSE</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-medium">₹210-230</span>
                      </div>
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-2 py-0.5 rounded-full text-xs font-medium">
                        Upcoming
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow duration-300 bg-gray-50/50 dark:bg-gray-800/50 dark:border-gray-700">
                    <h3 className="font-semibold">QRS Biotech</h3>
                    <p className="text-sm text-muted-foreground">QRSB • BSE</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-medium">₹510-550</span>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-medium">
                        Open
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <Link to="/ipo-listings" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center justify-center">
                      View more IPOs <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
