import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Users, MessageCircle, User, UserPlus, Search } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collaboration, Collaborator } from '@/types/ipo';
import { Link } from 'react-router-dom';
import { db, collection, getDocs, doc, updateDoc, setDoc, query, where } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

const Collaborations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch all users data from Firebase
  const { data: allUsers, isLoading: usersLoading } = useQuery<Collaborator[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Collaborator[];
    }
  });

  // Filter out the current user from all users
  const users = allUsers?.filter(u => u.id !== user?.id) || [];

  // Fetch all invitations data
  const { data: allInvitations, isLoading: invitationsLoading } = useQuery({
    queryKey: ['invitations'],
    queryFn: async () => {
      const invitationsCollection = collection(db, 'invitations');
      const invitationsSnapshot = await getDocs(invitationsCollection);
      return invitationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    enabled: !!user?.id // Only run this query after user data is available
  });

  // Process invitations with user data
  const invitations = React.useMemo(() => {
    if (!allInvitations || !allUsers) return [];
    
    return allInvitations.map(invitation => {
      // Find the collaborator based on the role in the invitation
      let collaboratorId;
      if (invitation.senderId === user?.id) {
        // Current user sent the invitation, so collaborator is the recipient
        collaboratorId = invitation.collaboratorId;
      } else if (invitation.collaboratorId === user?.id) {
        // Current user received the invitation, so collaborator is the sender
        collaboratorId = invitation.senderId;
      }
      
      const collaborator = allUsers.find(u => u.id === collaboratorId);
      
      return {
        ...invitation,
        collaborator,
        // Track if the current user is the sender
        isSender: invitation.senderId === user?.id
      };
    });
  }, [allInvitations, allUsers, user?.id]);

  // Filter invitations for both sent and received invitations that are accepted
  const acceptedInvitations = React.useMemo(() => {
    return invitations.filter(
      invitation => invitation.status === 'accepted' && 
      (invitation.senderId === user?.id || invitation.collaboratorId === user?.id)
    );
  }, [invitations, user?.id]);

  // Pending invitations that the current user has received (to display in notifications)
  const pendingReceivedInvitations = React.useMemo(() => {
    return invitations.filter(
      invitation => invitation.status === 'pending' && invitation.collaboratorId === user?.id
    );
  }, [invitations, user?.id]);

  // Fetch collaborations data
  const { data: collaborations, isLoading: collaborationsLoading } = useQuery<Collaboration[]>({
    queryKey: ['collaborations'],
    queryFn: async () => {
      const collaborationsCollection = collection(db, 'collaborations');
      const collaborationsSnapshot = await getDocs(collaborationsCollection);
      return collaborationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Collaboration[];
    }
  });

  // Filter collaborators by search term and exclude those already invited
  const filteredCollaborators = React.useMemo(() => {
    if (!users) return [];
    
    // Get IDs of users who have already been invited or have accepted
    const alreadyInvitedIds = new Set(invitations.map(inv => 
      inv.senderId === user?.id ? inv.collaboratorId : inv.senderId
    ));
    
    return users.filter(collaborator => 
      // Apply search filter
      (collaborator.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       collaborator.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      // Exclude current user and already invited users
      collaborator.id !== user?.id &&
      !alreadyInvitedIds.has(collaborator.id)
    );
  }, [users, invitations, searchTerm, user?.id]);

  const handleInvite = async (collaboratorId: string) => {
    try {
      const newInvitation = {
        collaboratorId,
        status: 'pending',
        senderId: user.id // Use the current user's ID
      };
      const invitationRef = doc(collection(db, 'invitations'));
      await setDoc(invitationRef, newInvitation);
      toast({
        title: 'Invitation Sent',
        description: 'The invitation has been sent to the collaborator.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send the invitation.',
        variant: 'destructive'
      });
    }
  };

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
        variant: 'destructive'
      });
    }
  };

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
        variant: 'destructive'
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Collaborations</h1>
        <p className="text-muted-foreground mt-2">
          Manage your IPO investment collaborations with friends and colleagues.
        </p>
      </div>

{/* Find Collaborators */}
<div>
        <h2 className="text-xl font-semibold mb-6">Find Collaborators</h2>

        <div className="mb-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search for potential collaborators by name or email"
              className="w-full pl-10 py-2 pr-4 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCollaborators.map((collaborator, index) => (
            <motion.div
              key={collaborator.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center mb-3">
                <Avatar className="h-10 w-10 mr-3">
                  {collaborator.avatar ? (
                    <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  ) : (
                    <AvatarFallback className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                      {collaborator.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{collaborator.name}</p>
                  <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground flex items-center">
                  <User size={14} className="mr-1 text-blue-600 dark:text-blue-400" />
                  {collaborator.mutualConnections || 0} mutual connections
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInvite(collaborator.id)}
                  className="flex items-center"
                >
                  <UserPlus size={14} className="mr-1" />
                  Invite
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accepted Collaborations */}
      <div className="mb-12 mt-14">
        <h2 className="text-xl font-semibold mb-6">Accepted Collaborations</h2>

        {invitationsLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : acceptedInvitations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {acceptedInvitations.map((invitation, index) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center mb-3">
                  <Avatar className="h-10 w-10 mr-3">
                    {invitation.collaborator?.avatar ? (
                      <AvatarImage src={invitation.collaborator.avatar} alt={invitation.collaborator.name} />
                    ) : (
                      <AvatarFallback className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        {invitation.collaborator?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{invitation.collaborator?.name || 'Unknown User'}</p>
                    <p className="text-sm text-muted-foreground">{invitation.collaborator?.email || 'No email'}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Link to={`/dashboard/chat/${invitation.collaborator?.id}`}>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <MessageCircle size={14} className="mr-1" />
                      Chat
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-muted-foreground">No accepted collaborations at this time.</p>
          </div>
        )}
      </div>

      {/* Pending Invitations */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Pending Invitations</h2>

        {invitationsLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : pendingReceivedInvitations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingReceivedInvitations.map((invitation, index) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center mb-3">
                  <Avatar className="h-10 w-10 mr-3">
                    {invitation.collaborator?.avatar ? (
                      <AvatarImage src={invitation.collaborator.avatar} alt={invitation.collaborator.name} />
                    ) : (
                      <AvatarFallback className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
                        {invitation.collaborator?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{invitation.collaborator?.name || 'Unknown User'}</p>
                    <p className="text-sm text-muted-foreground">{invitation.collaborator?.email || 'No email'}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleReject(invitation.id)}
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Reject
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleAccept(invitation.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Accept
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-muted-foreground">No pending invitations at this time.</p>
          </div>
        )}
      </div>

    </DashboardLayout>
  );
};

export default Collaborations;