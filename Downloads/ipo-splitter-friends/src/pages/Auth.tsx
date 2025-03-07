
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/Auth/LoginForm';
import SignupForm from '@/components/Auth/SignupForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  
  useEffect(() => {
    // Check URL for signup parameter
    const params = new URLSearchParams(location.search);
    setIsSignup(params.get('signup') === 'true');
  }, [location]);
  
  const toggleForm = () => {
    const newIsSignup = !isSignup;
    setIsSignup(newIsSignup);
    // Update URL without refreshing the page
    const newUrl = newIsSignup ? '/auth?signup=true' : '/auth';
    navigate(newUrl, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="container mx-auto px-4 md:px-6 max-w-md">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to home
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold font-heading">{isSignup ? 'Create Account' : 'Sign In'}</h1>
              <p className="text-muted-foreground mt-2">
                {isSignup 
                  ? 'Join the IPOSplit community and start investing together' 
                  : 'Welcome back! Continue your investment journey'}
              </p>
            </div>
            
            {isSignup ? (
              <SignupForm />
            ) : (
              <LoginForm />
            )}
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button 
                  onClick={toggleForm}
                  className="text-primary hover:text-primary/80 transition-colors font-medium ml-1"
                >
                  {isSignup ? 'Sign in' : 'Create account'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
