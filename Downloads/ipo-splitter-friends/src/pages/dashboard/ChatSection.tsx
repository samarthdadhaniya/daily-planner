import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { MessageCircle, User, UserPlus, Search } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collaboration, Collaborator } from '@/types/ipo';
import { Link, useParams } from 'react-router-dom';
import { db, collection, getDocs, doc, updateDoc } from '@/lib/firebase';
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

const ChatSection = () => {
  const { collaboratorId } = useParams<{ collaboratorId: string }>();
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch accepted invitations data
  const { data: acceptedInvitations, isLoading: invitationsLoading } = useQuery({
    queryKey: ['acceptedInvitations'],
    queryFn: async () => {
      const invitationsCollection = collection(db, 'invitations');
      const invitationsSnapshot = await getDocs(invitationsCollection);
      return invitationsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(invitation => invitation.status === 'accepted' && invitation.collaboratorId === collaboratorId);
    }
  });

  // Fetch chat messages data
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', collaboratorId],
    queryFn: async () => {
      const messagesCollection = collection(db, 'messages');
      const messagesSnapshot = await getDocs(messagesCollection);
      return messagesSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(message => message.collaboratorId === collaboratorId || message.senderId === user.id);
    }
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        title: 'Empty Message',
        description: 'Please enter a message before sending.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const newMessage = {
        collaboratorId,
        senderId: user.id,
        message,
        timestamp: new Date().toISOString()
      };
      const messageRef = doc(collection(db, 'messages'));
      await setDoc(messageRef, newMessage);
      setMessage('');
      toast({
        title: 'Message Sent',
        description: 'Your message has been sent.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send the message.',
        variant: 'destructive'
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Chat with {acceptedInvitations?.[0]?.collaborator?.name}</h1>
        <p className="text-muted-foreground mt-2">
          Communicate with your collaborator regarding IPO investments.
        </p>
      </div>

      {/* Chat Messages */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Messages</h2>

        {messagesLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{msg.senderId === user.id ? 'You' : msg.collaboratorId}</CardTitle>
                        <CardDescription>{new Date(msg.timestamp).toLocaleString()}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Send Message */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Send a Message</h2>

        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-primary w-full h-32"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChatSection;
