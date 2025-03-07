// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, collection, db } from '@/lib/firebase'; // Import Firebase auth
import { doc, setDoc } from 'firebase/firestore';

interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ipoSplitUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('ipoSplitUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential)
      if (userCredential.user) {
        const userData: User = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.email?.split('@')[0] || '', // Store before @ in the email as name
          avatar: userCredential.user.photoURL || '', // Use photoURL if available
        };

        // Save to localStorage
        localStorage.setItem('ipoSplitUser', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        toast.success('Successfully logged in!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your email and password.');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup logic - in real app, this would call an API
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        const userData: User = {
          id: userCredential.user.uid,
          name: name,
          email: userCredential.user.email,
          avatar: '', // You can set a default avatar if needed
        };
        const usersCollection = collection(db, 'users');
        await setDoc(doc(usersCollection, userData.id), userData);
        
        localStorage.setItem('ipoSplitUser', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        toast.success('Account created successfully!');
        return true;
      }
      return false;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already exists. Please try again with a different email.');
      } else {
        console.error('Signup failed:', error);
        toast.error('Signup failed. Please try again.');
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('ipoSplitUser');
    setUser(null);
    setIsAuthenticated(false);
    toast.info('You have been logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
