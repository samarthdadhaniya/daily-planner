import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, DollarSign, Building, BarChart, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { IPODetail as IPODetailType } from '@/types/ipo';

// Mock data - in a real app this would come from an API call
const mockIPOData: Record<string, IPODetailType> = {
  '1': {
    id: '1',
    name: 'XYZ Technologies',
    symbol: 'XYZT',
    exchange: 'NSE',
    openDate: '2023-06-15',
    closeDate: '2023-06-20',
    priceRange: '900-950',
    lotSize: 15,
    issueSize: '1,500 crore',
    companyDescription: 'XYZ Technologies is a leading provider of cloud infrastructure services, focusing on AI-driven solutions for enterprise clients. The company has shown consistent growth over the past 5 years.',
    financialHighlights: {
      revenue: '₹850 crore (FY 2022-23)',
      profit: '₹120 crore (FY 2022-23)',
      growth: '32% YoY'
    },
    status: 'open',
    registrar: 'Link Intime India Pvt. Ltd.',
    leadManagers: ['ICICI Securities', 'Axis Capital', 'SBI Capital Markets']
  },
  '4': {
    id: '4',
    name: 'LMN Renewables',
    symbol: 'LMNR',
    exchange: 'NSE',
    openDate: '2023-06-25',
    closeDate: '2023-06-28',
    priceRange: '210-230',
    lotSize: 60,
    issueSize: '800 crore',
    companyDescription: 'LMN Renewables is a clean energy company specializing in solar and wind power projects across India. With operations in 8 states, the company is rapidly expanding its renewable energy portfolio.',
    financialHighlights: {
      revenue: '₹390 crore (FY 2022-23)',
      profit: '₹55 crore (FY 2022-23)',
      growth: '28% YoY'
    },
    status: 'upcoming',
    registrar: 'KFin Technologies Pvt. Ltd.',
    leadManagers: ['Kotak Mahindra Capital', 'HDFC Bank Investment Banking']
  },
  '6': {
    id: '6',
    name: 'EFG Consumer Goods',
    symbol: 'EFGC',
    exchange: 'NSE',
    openDate: '2023-06-18',
    closeDate: '2023-06-21',
    priceRange: '780-820',
    lotSize: 18,
    issueSize: '1,200 crore',
    companyDescription: 'EFG Consumer Goods is one of India\'s fastest growing FMCG companies, with a diverse product portfolio spanning food, beverages, and personal care. The company has a strong distribution network across urban and rural markets.',
    financialHighlights: {
      revenue: '₹720 crore (FY 2022-23)',
      profit: '₹85 crore (FY 2022-23)',
      growth: '22% YoY'
    },
    status: 'open',
    registrar: 'Bigshare Services Pvt. Ltd.',
    leadManagers: ['JM Financial', 'Motilal Oswal Investment Banking']
  }
};

// Mock data for collaborators
interface Collaborator {
  id: string;
  name: string;
  amount: string;
  status: 'confirmed' | 'pending';
}

const mockCollaborators: Collaborator[] = [
  { id: '1', name: 'Rahul Kumar', amount: '₹75,000', status: 'confirmed' },
  { id: '2', name: 'Priya Singh', amount: '₹45,000', status: 'pending' },
  { id: '3', name: 'Vikram Thakur', amount: '₹90,000', status: 'confirmed' }
];

const IPODetail = () => {
  const { ipoId } = useParams<{ ipoId: string }>();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const { toast } = useToast();
  
  // In a real app, this would fetch data from an API
  const { data: ipo, isLoading, error } = useQuery<IPODetailType>({
    queryKey: ['ipo', ipoId],
    queryFn: () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const ipoData = mockIPOData[ipoId as keyof typeof mockIPOData];
          resolve(ipoData);
        }, 500);
      });
    }
  });

  const handleInvestmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investmentAmount || parseInt(investmentAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would submit to an API
    toast({
      title: "Investment request submitted!",
      description: `Your interest of ₹${investmentAmount} for ${ipo?.name} has been recorded.`,
      variant: "default"
    });
    
    setInvestmentAmount('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="p-4">Loading IPO details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !ipo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="p-4">IPO not found or error loading details.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <Link to="/ipo-listings" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to listings
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* IPO Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold font-heading">{ipo.name}</h1>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Building size={16} className="mr-1" />
                      <span className="mr-4">{ipo.symbol}</span>
                      <span>{ipo.exchange}</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {ipo.status === 'open' ? 'Open' : 'Upcoming'}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar size={18} className="text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Issue Period</span>
                    </div>
                    <p className="text-muted-foreground">
                      {ipo.openDate} to {ipo.closeDate}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign size={18} className="text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Price Range</span>
                    </div>
                    <p className="text-muted-foreground">₹{ipo.priceRange}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <BarChart size={18} className="text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Lot Size</span>
                    </div>
                    <p className="text-muted-foreground">{ipo.lotSize} shares</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">About Company</h2>
                  <p className="text-muted-foreground">{ipo.companyDescription}</p>
                  
                  <h2 className="text-xl font-semibold mt-6 mb-4">Financial Highlights</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><span className="font-medium">Revenue:</span> {ipo.financialHighlights.revenue}</li>
                    <li><span className="font-medium">Profit:</span> {ipo.financialHighlights.profit}</li>
                    <li><span className="font-medium">Growth:</span> {ipo.financialHighlights.growth}</li>
                  </ul>
                  
                  <h2 className="text-xl font-semibold mt-6 mb-4">Issue Details</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><span className="font-medium">Issue Size:</span> ₹{ipo.issueSize}</li>
                    <li><span className="font-medium">Minimum Investment:</span> ₹{parseInt(ipo.priceRange.split('-')[0]) * ipo.lotSize}</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Investment and Collaboration Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invest in this IPO</CardTitle>
                  <CardDescription>Specify your investment amount and find collaborators</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInvestmentSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-1">
                        Investment Amount (₹)
                      </label>
                      <input
                        id="amount"
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="input-primary w-full"
                        placeholder="Enter amount"
                        min="1000"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Min investment: ₹{parseInt(ipo.priceRange.split('-')[0]) * ipo.lotSize}
                      </p>
                    </div>
                    <Button type="submit" className="w-full">
                      Express Interest
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Users size={18} className="text-blue-600 mr-2" />
                    <CardTitle>Potential Collaborators</CardTitle>
                  </div>
                  <CardDescription>Others interested in this IPO</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCollaborators.map(collab => (
                      <div key={collab.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                        <div>
                          <p className="font-medium">{collab.name}</p>
                          <p className="text-sm text-muted-foreground">{collab.amount}</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <MessageSquare size={14} className="mr-1" /> Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="text-sm text-muted-foreground">
                    Connect to discuss investment strategies
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IPODetail;
