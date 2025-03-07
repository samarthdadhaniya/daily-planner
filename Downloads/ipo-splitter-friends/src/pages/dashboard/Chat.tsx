import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Send, ArrowLeft, Paperclip, MoreVertical } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collaborator } from '@/types/ipo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db, collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot, doc, getDoc } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

// Message type
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

// Format timestamp helper
const formatTime = (date: Date) => {
  if (!date) return '';
  
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user: currentUser } = useAuth();

  // Fetch user data
  const { data: user, isLoading: userLoading } = useQuery<Collaborator>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const userDoc = await getDoc(doc(db, 'users', userId!));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() } as Collaborator;
      }
      throw new Error('User not found');
    },
    enabled: !!userId
  });

  // Fetch chat messages in real-time
  useEffect(() => {
    if (!userId || !currentUser?.id) return;

    setIsLoading(true);

    const q = query(
      collection(db, 'messages'),
      where('senderId', 'in', [currentUser.id, userId]),
      where('receiverId', 'in', [currentUser.id, userId]),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            senderId: data.senderId,
            receiverId: data.receiverId,
            text: data.text,
            timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(),
            read: data.read,
          } as Message;
        })
        .filter((msg) => {
          return (
            (msg.senderId === currentUser.id && msg.receiverId === userId) ||
            (msg.senderId === userId && msg.receiverId === currentUser.id)
          );
        });
        console.log(message)
      setChatMessages(messages);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userId, currentUser]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !userId || !currentUser) return;

    const newMessage = {
      senderId: currentUser.id,
      receiverId: userId,
      text: message,
      timestamp: serverTimestamp(),
      read: false,
    };

    try {
      // Optimistic update
      const optimisticMessage: Message = {
        ...newMessage,
        id: `temp-${Date.now()}`,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, optimisticMessage]);
      setMessage('');

      // Send the message to Firestore
      await addDoc(collection(db, 'messages'), newMessage);

      // Scroll to the bottom after sending
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
      // Revert optimistic update on error
      setChatMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
      setMessage(message); // Restore the message in the input
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (userLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center">
        <Link to="/dashboard/collaborations" className="mr-4">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 flex items-center justify-center">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-heading">Chat</h1>
      </div>
      
      <Card className="overflow-hidden h-[calc(100vh-200px)] flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={user?.name} />
              ) : (
                <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 flex items-center justify-center">
            <MoreVertical size={20} />
          </Button>
        </div>
        
        {/* Chat Messages */}
        <div className="p-4 flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : chatMessages.length > 0 ? (
            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.01, 0.5), duration: 0.2 }}
                  className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-lg ${
                      msg.senderId === currentUser?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.senderId === currentUser?.id
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-2">No messages yet</p>
              <p className="text-sm text-muted-foreground">Send a message to start the conversation</p>
            </div>
          )}
        </div>
        
        {/* Message Input */}
        <CardContent className="border-t p-4">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-10 h-10 p-0 flex items-center justify-center"
            >
              <Paperclip size={20} className="text-muted-foreground" />
            </Button>
            
            <textarea
              className="flex-1 p-3 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              placeholder="Type your message..."
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            
            <Button 
              onClick={handleSendMessage}
              disabled={message.trim() === ''}
              size="sm" 
              className="w-10 h-10 p-0 flex items-center justify-center"
            >
              <Send size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Chat;