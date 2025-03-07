// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui-custom/Button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hook

// Mock market data for the ticker
const marketData = [
  { symbol: 'NIFTY', value: '22,456.80', change: '+0.45%', trending: 'up' },
  { symbol: 'SENSEX', value: '73,782.50', change: '+0.38%', trending: 'up' },
  { symbol: 'RELIANCE', value: '2,845.20', change: '-0.12%', trending: 'down' },
  { symbol: 'TCS', value: '3,567.90', change: '+1.23%', trending: 'up' },
  { symbol: 'HDFC BANK', value: '1,678.35', change: '+0.78%', trending: 'up' },
  { symbol: 'INFOSYS', value: '1,436.50', change: '-0.56%', trending: 'down' },
  { symbol: 'ITC', value: '432.85', change: '+0.32%', trending: 'up' },
  { symbol: 'ICICI BANK', value: '987.40', change: '+0.91%', trending: 'up' },
];

const MarqueeItem = ({ data }) => (
  <div className="marquee-item flex items-center">
    <span className="font-semibold">{data.symbol}</span>
    <span className="ml-1">{data.value}</span>
    <span
      className={cn(
        "ml-1 flex items-center",
        data.trending === 'up' ? 'text-green-500' : 'text-red-500'
      )}
    >
      {data.change}
      {data.trending === 'up' ?
        <TrendingUp size={14} className="ml-0.5" /> :
        <TrendingDown size={14} className="ml-0.5" />
      }
    </span>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const { isAuthenticated, logout } = useAuth(); // Use isAuthenticated from AuthContext

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Double the market data to make a smooth infinite loop
  const extendedMarketData = [...marketData, ...marketData];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Marquee Ticker */}
      <div className={cn(
        "w-full py-1 border-b transition-colors",
        theme === 'dark'
          ? 'bg-black text-white border-gray-800'
          : 'bg-white text-gray-900 border-gray-200'
      )}>
        <div className="marquee">
          <div className="marquee-content">
            {extendedMarketData.map((data, index) => (
              <MarqueeItem key={index} data={data} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        'w-full transition-all duration-300 py-3',
        isScrolled
          ? theme === 'dark'
            ? 'bg-gray-900/80 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-md shadow-sm'
          : theme === 'dark'
            ? 'bg-transparent'
            : 'bg-transparent'
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">
                IPOSplit
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/ipo-listings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                IPO Listings
              </Link>
              <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                How It Works
              </Link>
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className={cn(
                  "absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block transition-all duration-200 animate-fade-in",
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
                )}>
                  <Link to="/faq" className={cn(
                    "block px-4 py-2 text-sm",
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  )}>FAQ</Link>
                  <Link to="/blog" className={cn(
                    "block px-4 py-2 text-sm",
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  )}>Blog</Link>
                  <Link to="/market-insights" className={cn(
                    "block px-4 py-2 text-sm",
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  )}>Market Insights</Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="primary">Dashboard</Button>
                  </Link>
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Log in
                  </Link>
                  <Link to="/auth?signup=true">
                    <Button variant="primary">Sign up</Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className={cn(
            "md:hidden py-4 shadow-sm animate-slide-in",
            theme === 'dark' ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'
          )}>
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link to="/ipo-listings" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                IPO Listings
              </Link>
              <Link to="/how-it-works" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link to="/faq" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link to="/blog" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/market-insights" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                Market Insights
              </Link>

              <div className={cn(
                "pt-4 border-t flex flex-col space-y-4",
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              )}>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="primary" className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link to="/auth?signup=true">
                      <Button variant="primary" className="w-full">Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
