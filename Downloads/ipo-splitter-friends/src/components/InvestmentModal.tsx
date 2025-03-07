import React, { useState } from 'react';
import { db, collection, addDoc } from '@/lib/firebase'; // Firestore imports
import { Input } from './ui/input'; // Custom Input component
import { Button } from './ui/button'; // Custom Button component
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription  } from './ui/dialog';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ipoId: string;
  ipoName:string;
  userId: string;  // Add userId prop
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ isOpen, onClose, ipoId,ipoName, userId }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number | ''>('');
  const [error, setError] = useState<string>('');
 const [loader,setLoader] = useState(false);
  const handleSubmit = async () => {
    if (investmentAmount === '') {
      setError('Please enter a valid investment amount');
      return;
    }
    setLoader(true);
    try {
      // Add investment data to Firestore
      await addDoc(collection(db, 'investments'), {
        ipoId,
        ipoName,
        amount: investmentAmount,
        userId,  // Store the userId in Firestore
        timestamp: new Date(),
      });

      setLoader(false);
      // Close the modal
      onClose();
    } catch (error) {
      setLoader(false);

      setError('Failed to submit investment. Please try again.');
      console.error('Error adding investment:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-6 w-80">
        <DialogTitle className="text-lg font-bold">Investment Details</DialogTitle>
        <DialogDescription className="mt-2 text-sm text-muted-foreground">
          Enter the amount you want to invest in this IPO.
        </DialogDescription>
        <div className="mt-4">
          <Input
            type="number"
            placeholder="Enter amount"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={investmentAmount === ''}>
            {
                loader ? "Loading...":"Submit"
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
