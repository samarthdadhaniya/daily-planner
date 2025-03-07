
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui-custom/Button';
import { ArrowRight, CheckCircle, ExternalLink, LineChart, Shield, Sparkles, Users, Zap } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { theme } = useTheme();
  
  // Feature card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Candlestick chart data
  const candlesticks = [
    { height: 40, isUp: true },
    { height: 24, isUp: false },
    { height: 32, isUp: true },
    { height: 45, isUp: true },
    { height: 28, isUp: false },
    { height: 38, isUp: true },
    { height: 30, isUp: false },
    { height: 48, isUp: true },
    { height: 36, isUp: true },
    { height: 22, isUp: false },
    { height: 34, isUp: true },
    { height: 42, isUp: true },
    { height: 26, isUp: false },
    { height: 40, isUp: true },
  ];

  return (
    <div className={cn(
      "flex flex-col relative overflow-hidden",
      theme === 'dark' ? 'dark' : ''
    )}>
      <Navbar />
      
      {/* Hero Section - More Refined & Minimal */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 overflow-hidden">
        {/* Subtle background gradients */}
        <div className="absolute inset-0 z-0">
          <div className={cn(
            "absolute -top-[30%] -left-[10%] w-[40%] h-[60%] rounded-full blur-[120px] opacity-40",
            theme === 'dark' ? 'bg-green-800/40' : 'bg-green-300/40'
          )} />
          <div className={cn(
            "absolute bottom-[20%] -right-[10%] w-[30%] h-[50%] rounded-full blur-[120px] opacity-40",
            theme === 'dark' ? 'bg-emerald-800/40' : 'bg-emerald-200/40'
          )} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 text-xs sm:text-sm font-medium rounded-full border",
                theme === 'dark' 
                  ? 'bg-green-900/30 border-green-800 text-green-300' 
                  : 'bg-green-50 border-green-100 text-green-700'
              )}>
                <Sparkles size={14} className={theme === 'dark' ? 'text-green-400 mr-1.5' : 'text-green-500 mr-1.5'} />
                Reimagining IPO Investments
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 font-heading leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className={theme === 'dark' 
                ? 'bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 text-transparent bg-clip-text' 
                : 'bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 text-transparent bg-clip-text'
              }>
                IPO investing,<br/>made collaborative
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Pool resources with friends and maximize your chances 
              of IPO allotment in the Indian stock market.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/auth?signup=true">
                <Button className="px-6 h-10">
                  Get Started <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="h-10">
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Elegant Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className={cn(
              "rounded-xl overflow-hidden border shadow-sm",
              theme === 'dark' 
                ? 'bg-gray-900/80 border-gray-800' 
                : 'bg-white border-gray-200'
            )}>
              <div className={cn(
                "flex items-center px-3 py-1.5 border-b",
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              )}>
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
                <div className="mx-auto text-xs text-muted-foreground">
                  IPOSplit Dashboard
                </div>
              </div>
              <div className="p-3 font-mono text-sm">
                <div className={cn(
                  "flex items-center p-2 rounded",
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                )}>
                  <span className="text-green-500 mr-2">$</span>
                  <span className="text-sm">Creating investment pool for ACME Corp IPO...</span>
                </div>
                <div className="mt-2 p-2">
                  <span className="text-xs text-muted-foreground">// Inviting collaborators</span>
                  <div className="flex mt-1 gap-2">
                    <div className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-xs",
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    )}>
                      RK
                    </div>
                    <div className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-xs",
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    )}>
                      AP
                    </div>
                    <div className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-xs",
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    )}>
                      VT
                    </div>
                    <div className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-xs",
                      theme === 'dark' ? 'bg-gray-800 text-green-400' : 'bg-green-100 text-green-700'
                    )}>
                      +
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className={cn(
                    "flex items-center justify-between p-2 rounded text-sm",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  )}>
                    <span>Total Pool Amount:</span>
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                      ₹ 100,000
                    </span>
                  </div>
                </div>
                <div className="mt-2 p-2">
                  <span className="text-green-500 mr-2">$</span>
                  <span className="text-sm">IPO application submitted successfully ✓</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Candlestick Chart Visual Element */}
        <div className="flex justify-center mt-20 pt-16 overflow-hidden relative">
        
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        className={cn(
          "py-20 relative overflow-hidden",
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-heading">Why Choose IPOSplit</h2>
            <p className="text-base text-muted-foreground">
              Our platform transforms how you access and invest in IPOs
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <LineChart className="text-green-500" size={24} />,
                title: "Real-Time Analytics",
                description: "Track IPO performance, subscription status, and market sentiment with live data updates."
              },
              {
                icon: <Users className="text-green-500" size={24} />,
                title: "Collaborative Pools",
                description: "Create or join investment pools with friends and family for increased allocation chances."
              },
              {
                icon: <Shield className="text-green-500" size={24} />,
                title: "Secure Transactions",
                description: "Bank-grade security with transparent ledger system for all pooled investments."
              },
              {
                icon: <Zap className="text-green-500" size={24} />,
                title: "Instant Notifications",
                description: "Get alerts on IPO openings, price bands, allotment status, and listing gains."
              },
              {
                icon: <CheckCircle className="text-green-500" size={24} />,
                title: "Simplified Process",
                description: "Streamlined application process with clear documentation and automated distribution."
              },
              {
                icon: <Sparkles className="text-green-500" size={24} />,
                title: "Premium Opportunities",
                description: "Access to high-demand IPOs with lower individual investment requirements."
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={cn(
                  "group relative p-5 rounded-xl border transition-all duration-300 hover:shadow-sm hover:-translate-y-1",
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border-gray-800' 
                    : 'bg-white/50 border-gray-100'
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300",
                  theme === 'dark' 
                    ? 'bg-gray-800 group-hover:bg-gray-700' 
                    : 'bg-gray-50 group-hover:bg-gray-100'
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section 
        className={cn(
          "py-20 relative overflow-hidden",
          theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'
        )}
      >
        {/* Background decorations */}
        <div className="absolute -right-64 top-20 w-96 h-96 rounded-full opacity-10 bg-green-500 blur-[100px]" />
        <div className="absolute -left-64 bottom-20 w-96 h-96 rounded-full opacity-10 bg-emerald-500 blur-[100px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-heading">How IPOSplit Works</h2>
            <p className="text-base text-muted-foreground">
              A simple, three-step process to collaborative IPO investing
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {[
                {
                  number: "01",
                  title: "Discover IPOs",
                  description: "Browse upcoming and open IPOs from NSE and BSE with detailed information on price bands, lot sizes, and company fundamentals.",
                  color: "green"
                },
                {
                  number: "02",
                  title: "Form Your Pool",
                  description: "Invite friends and family to join your investment pool or join existing ones. Set contribution amounts and finalize your group.",
                  color: "emerald"
                },
                {
                  number: "03",
                  title: "Invest Together",
                  description: "Submit your collective application for IPO allotment. Track status in real-time and manage allocations based on individual contributions.",
                  color: "teal"
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1,
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.2 + index * 0.2 
                  }}
                  viewport={{ once: true }}
                  className="col-span-1 md:col-span-4 relative"
                >
                  <div className={cn(
                    "relative z-10 h-full p-5 rounded-xl border",
                    theme === 'dark' 
                      ? 'bg-gray-900 border-gray-800' 
                      : 'bg-white border-gray-100'
                  )}>
                    <div className={cn(
                      `text-${step.color}-500 text-4xl font-bold mb-4 opacity-80`,
                    )}>
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {/* Connect lines between steps */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform translate-x-1/2 -translate-y-1/2 z-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Link to="/how-it-works">
                <Button variant="outline" className="rounded-full group text-sm">
                  Learn More 
                  <ExternalLink size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        className={cn(
          "py-20",
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={cn(
              "inline-flex items-center px-2.5 py-0.5 mb-3 rounded-full border text-xs",
              theme === 'dark'
                ? 'bg-green-900/30 border-green-800 text-green-300'
                : 'bg-green-50 border-green-100 text-green-700'
            )}>
              Success Stories
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-heading">What Our Users Say</h2>
            <p className="text-base text-muted-foreground">
              Join thousands of investors who collaborate on our platform
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Rahul Kumar",
                location: "Delhi",
                text: "I've been able to participate in IPOs that were previously out of reach. The platform makes collaboration easy and secure.",
                initials: "RK"
              },
              {
                name: "Ananya Patel",
                location: "Mumbai",
                text: "The detailed IPO information and collaborative features helped me and my friends make informed investment decisions together.",
                initials: "AP"
              },
              {
                name: "Vikram Thakur",
                location: "Bangalore",
                text: "We pooled our resources for 4 different IPOs and received allotments in 3 of them. This platform has transformed how we invest.",
                initials: "VT"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={cn(
                  "relative p-5 rounded-xl border",
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border-gray-800' 
                    : 'bg-white/50 border-gray-100'
                )}
              >
                <div className="flex items-center mb-4">
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center mr-3 text-sm",
                    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                  )}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">"{testimonial.text}"</p>
                
                {/* Decorative quote marks */}
                <div className={cn(
                  "absolute top-3 right-3 text-4xl leading-none",
                  theme === 'dark' ? 'text-gray-800' : 'text-gray-100'
                )}>
                  "
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={cn(
        "py-16 relative overflow-hidden",
        theme === 'dark' 
          ? 'bg-gradient-to-br from-green-950 to-emerald-950' 
          : 'bg-gradient-to-br from-green-50 to-emerald-100'
      )}>
        {/* Glowing orbs for visual effect */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-green-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-500/10 blur-[100px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">Ready to Start Investing Together?</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of investors who are collaborating on IPO investments and increasing their chances of allocation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/auth?signup=true">
                <Button className="px-6 h-10 rounded-full w-full sm:w-auto">
                  Create Your Free Account
                </Button>
              </Link>
              <Link to="/ipo-listings">
                <Button variant="outline" className="h-10 rounded-full w-full sm:w-auto">
                  Explore Available IPOs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
