
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Users, DollarSign, LineChart, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const HowItWorks: React.FC = () => {
  const { theme } = useTheme();

  const steps = [
    {
      title: 'Create your account',
      description: 'Sign up for a free account to get started with IPOSplit.',
      icon: Users,
    },
    {
      title: 'Find an IPO',
      description: 'Browse and search for upcoming and open IPOs based on your investment interests.',
      icon: LineChart,
    },
    {
      title: 'Form a collaboration',
      description: 'Invite friends or join existing groups to pool funds for IPO applications.',
      icon: Users,
    },
    {
      title: 'Apply for IPO',
      description: 'Submit your application with the pooled resources to increase allocation chances.',
      icon: DollarSign,
    },
    {
      title: 'Manage allocations',
      description: 'Track allocations and distribute shares among group members based on contributions.',
      icon: Shield,
    },
  ];

  const benefits = [
    'Access to larger IPO allocations through pooled resources',
    'Lower individual investment required to participate in premium IPOs',
    'Higher chances of allocation in oversubscribed issues',
    'Simplified management of investments through our platform',
    'Secure and transparent process with clear terms for all participants',
    'Instant notifications on IPO status and allocation updates',
  ];

  const faqs = [
    {
      question: 'How does IPO allocation work in India?',
      answer: 'IPO allocations in India follow a proportional allocation system. If an IPO is oversubscribed, shares are allocated proportionally among applicants. By pooling resources, you can apply for a larger lot, increasing your chances of meaningful allocation.'
    },
    {
      question: 'Is it legal to pool money for IPO applications?',
      answer: 'Yes, it\'s legal as long as the ultimate beneficial ownership is properly declared and tax compliance is maintained. IPOSplit ensures compliance with all regulatory requirements and provides transparent documentation for all parties.'
    },
    {
      question: 'How are the shares distributed after allocation?',
      answer: 'After successful allocation, shares are distributed according to the pre-agreed proportions based on each member\'s contribution. Our platform automates this process and provides documentation for all transactions.'
    },
    {
      question: 'What happens if the IPO application is not successful?',
      answer: 'If the application is unsuccessful, the funds are returned to the respective contributors according to their contribution ratio, minus any applicable transaction fees.'
    },
    {
      question: 'How secure is the platform for financial transactions?',
      answer: 'IPOSplit uses bank-grade security measures including 256-bit encryption, two-factor authentication, and secure payment gateways. We don\'t store your banking information and all transactions are verified through authorized financial institutions.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">How IPOSplit Works</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              IPOSplit enables friends and family to pool resources for IPO applications, 
              increasing allocation chances and making premium IPOs accessible to everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/auth?signup=true">
                <Button>
                  Get Started
                </Button>
              </Link>
              <Link to="/ipo-listings">
                <Button variant="outline">
                  Explore IPOs
                </Button>
              </Link>
            </div>
          </div>
          
          {/* How It Works Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-heading text-center mb-8">Simple Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {steps.slice(0, 3).map((step, index) => (
                <Card key={index} className={`relative overflow-hidden h-full transition-all hover:shadow-sm ${theme === 'dark' ? 'bg-gray-800/70' : ''}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full ${theme === 'dark' ? 'bg-green-500/70' : 'bg-green-500/90'}`}></div>
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className={`p-2 mb-3 rounded-full w-10 h-10 flex items-center justify-center ${theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600'}`}>
                      <step.icon size={20} />
                    </div>
                    <h3 className="text-base font-semibold mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center my-3">
              <ArrowRight className="text-green-500 h-6 w-6" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {steps.slice(3).map((step, index) => (
                <Card key={index} className={`relative overflow-hidden h-full transition-all hover:shadow-sm ${theme === 'dark' ? 'bg-gray-800/70' : ''}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full ${theme === 'dark' ? 'bg-green-500/70' : 'bg-green-500/90'}`}></div>
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className={`p-2 mb-3 rounded-full w-10 h-10 flex items-center justify-center ${theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600'}`}>
                      <step.icon size={20} />
                    </div>
                    <h3 className="text-base font-semibold mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold font-heading text-center mb-8">Benefits of Using IPOSplit</h2>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-green-50 to-emerald-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-1 rounded-full flex-shrink-0 mr-2 ${theme === 'dark' ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                      <Check size={16} />
                    </div>
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className={`overflow-hidden transition-all hover:shadow-sm ${theme === 'dark' ? 'bg-gray-800/70' : ''}`}>
                  <CardContent className="p-5">
                    <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className={`max-w-3xl mx-auto text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40' : 'bg-gradient-to-r from-green-50 to-emerald-50'}`}>
            <h2 className="text-xl font-bold mb-3">Ready to invest in IPOs with friends?</h2>
            <p className="text-sm text-muted-foreground mb-5 max-w-lg mx-auto">
              Join IPOSplit today to access premium IPOs with smaller investments and higher allocation chances.
            </p>
            <Link to="/auth?signup=true">
              <Button>
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
