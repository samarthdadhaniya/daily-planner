import React, { useState, useContext } from 'react';
import { ArrowUpRight, Calendar, DollarSign, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import InvestmentModal from './InvestmentModal';
import CollaborationModal from './CollaborationModal'; // Import the CollaborationModal component
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface IPOCardProps {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  openDate: string;
  closeDate: string;
  priceRange: string;
  lotSize: number;
  status: 'upcoming' | 'open' | 'closed';
  isSaved?: boolean;
  onSave?: () => void;
}

const IPOCard: React.FC<IPOCardProps> = ({
  id,
  name,
  symbol,
  exchange,
  openDate,
  closeDate,
  priceRange,
  lotSize,
  status,
  isSaved = false,
  onSave
}) => {
  const { theme } = useTheme();
  const { user } = useAuth(); // Access the authenticated user context
  const [showInvestmentModal, setShowInvestmentModal] = useState(false); // State to control investment modal visibility
  const [showCollaborationModal, setShowCollaborationModal] = useState(false); // State to control collaboration modal visibility

  const statusColors = {
    upcoming: {
      light: 'bg-blue-100 text-blue-800',
      dark: 'bg-blue-900/50 text-blue-300'
    },
    open: {
      light: 'bg-green-100 text-green-800',
      dark: 'bg-green-900/50 text-green-300'
    },
    closed: {
      light: 'bg-gray-100 text-gray-800',
      dark: 'bg-gray-800 text-gray-300'
    }
  };

  const parsedOpenDate = new Date(openDate);
  const formattedOpenDate = parsedOpenDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const parsedCloseDate = new Date(closeDate);
  const formattedCloseDate = parsedCloseDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md group h-full magic-hover ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center mb-1">
                <span className={cn(
                  "px-2 py-1 text-xs rounded-full mr-2",
                  theme === 'dark' ? statusColors[status].dark : statusColors[status].light
                )}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">{exchange}</span>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">{name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{symbol}</p>
            </div>
            {onSave && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSave();
                }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={isSaved ? "Remove from saved" : "Save IPO"}
              >
                {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground flex items-center">
                <Calendar size={14} className="mr-1" /> Open Date
              </p>
              <p className="text-sm font-medium">{formattedOpenDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center">
                <Calendar size={14} className="mr-1" /> Close Date
              </p>
              <p className="text-sm font-medium">{formattedCloseDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center">
                <DollarSign size={14} className="mr-1" /> Price Range
              </p>
              <p className="text-sm font-medium">₹{priceRange}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Lot Size</p>
              <p className="text-sm font-medium">{lotSize} shares</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4 flex justify-end space-x-2">
          <Button
            onClick={() => setShowInvestmentModal(true)}  // Trigger investment popup
            className="text-sm font-medium bg-primary text-white hover:bg-primary/80"
          >
            Invest Now
          </Button>
          <Button
            onClick={() => setShowCollaborationModal(true)}  // Trigger collaboration popup
            className="text-sm font-medium bg-secondary text-white hover:bg-secondary/80"
          >
            Collaborate
          </Button>
        </CardFooter>
      </Card>

      {/* Investment Modal */}
      {user && (
        <InvestmentModal
          isOpen={showInvestmentModal}
          onClose={() => setShowInvestmentModal(false)}
          ipoId={id}
          ipoName={name}
          userId={user.id}  // Pass userId from authentication context
        />
      )}

      {/* Collaboration Modal */}
      {user && (
        <CollaborationModal
          isOpen={showCollaborationModal}
          onClose={() => setShowCollaborationModal(false)}
          ipoId={id}
          ipoName={name}
          userId={user.id}  // Pass userId from authentication context
        />
      )}
    </>
  );
};

export default IPOCard;
