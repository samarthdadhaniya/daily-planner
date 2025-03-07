
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui-custom/Button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui-custom/Card';
import { SearchIcon, Filter, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import IPOCard from '@/components/IPOCard';
import { Link } from 'react-router-dom';
import { IPO } from '@/types/ipo';

// Dummy data for IPOs
const ipoData: IPO[] = [
  {
    id: '1',
    name: 'TechVision Innovations',
    symbol: 'TCHV',
    exchange: 'NSE',
    openDate: '2023-12-15',
    closeDate: '2023-12-20',
    priceRange: '450-500',
    lotSize: 30,
    status: 'upcoming',
    description: 'TechVision Innovations is a leading technology company specializing in AI and machine learning solutions.',
    totalShares: 18000000,
    issueSize: '₹900 Cr',
    minInvestment: '₹15,000',
    companyInfo: {
      founded: '2015',
      headquarters: 'Bangalore, India',
      employees: '1200+',
      industry: 'Information Technology',
      website: 'https://techvision.example.com',
    },
    financials: {
      revenue: '₹450 Cr (FY 2022-23)',
      profit: '₹85 Cr (FY 2022-23)',
      growthRate: '28% YoY',
    },
    keyHighlights: [
      'Market leader in enterprise AI solutions',
      'Strong R&D team with 200+ patents',
      'Expanding global presence in 15+ countries',
      'Strategic partnerships with Fortune 500 companies',
    ],
    riskFactors: [
      'Highly competitive market',
      'Regulatory changes in tech sector',
      'Dependency on key clients',
      'Rapid technological changes',
    ],
  },
  {
    id: '2',
    name: 'GreenEnergy Solutions',
    symbol: 'GREN',
    exchange: 'BSE',
    openDate: '2023-12-10',
    closeDate: '2023-12-17',
    priceRange: '300-340',
    lotSize: 40,
    status: 'open',
    description: 'GreenEnergy Solutions is a renewable energy company focused on solar and wind power solutions.',
    totalShares: 25000000,
    issueSize: '₹850 Cr',
    minInvestment: '₹13,600',
    companyInfo: {
      founded: '2010',
      headquarters: 'Chennai, India',
      employees: '950+',
      industry: 'Renewable Energy',
      website: 'https://greenenergy.example.com',
    },
    financials: {
      revenue: '₹380 Cr (FY 2022-23)',
      profit: '₹65 Cr (FY 2022-23)',
      growthRate: '32% YoY',
    },
    keyHighlights: [
      'One of India\'s largest solar power developers',
      'Portfolio of 2.5 GW of renewable projects',
      'Strong government partnerships',
      'Innovative energy storage solutions',
    ],
    riskFactors: [
      'Policy changes affecting renewable subsidies',
      'Seasonal variability in energy production',
      'High capital requirements',
      'Supply chain constraints for key components',
    ],
  },
  {
    id: '3',
    name: 'HealthPlus Diagnostics',
    symbol: 'HLTH',
    exchange: 'NSE',
    openDate: '2023-12-05',
    closeDate: '2023-12-10',
    priceRange: '550-600',
    lotSize: 25,
    status: 'closed',
    description: 'HealthPlus Diagnostics is a leading healthcare diagnostics and wellness company with nationwide presence.',
    totalShares: 15000000,
    issueSize: '₹900 Cr',
    minInvestment: '₹15,000',
    companyInfo: {
      founded: '2008',
      headquarters: 'Mumbai, India',
      employees: '2200+',
      industry: 'Healthcare',
      website: 'https://healthplus.example.com',
    },
    financials: {
      revenue: '₹520 Cr (FY 2022-23)',
      profit: '₹110 Cr (FY 2022-23)',
      growthRate: '24% YoY',
    },
    keyHighlights: [
      'Network of 500+ diagnostic centers across India',
      'Advanced testing capabilities for 2000+ parameters',
      'Strong brand recognition with 15+ million customers',
      'Digital-first approach with home collection services',
    ],
    riskFactors: [
      'Increasing competition from unorganized players',
      'Regulatory changes in healthcare sector',
      'Dependency on skilled healthcare professionals',
      'Price sensitivity in tier 2 and tier 3 markets',
    ],
  },
  {
    id: '4',
    name: 'Urban Mobility Networks',
    symbol: 'UMON',
    exchange: 'BSE',
    openDate: '2023-12-18',
    closeDate: '2023-12-22',
    priceRange: '200-230',
    lotSize: 60,
    status: 'upcoming',
    description: 'Urban Mobility Networks is revolutionizing urban transportation with electric vehicle fleets and smart mobility solutions.',
    totalShares: 30000000,
    issueSize: '₹690 Cr',
    minInvestment: '₹13,800',
    companyInfo: {
      founded: '2017',
      headquarters: 'Hyderabad, India',
      employees: '850+',
      industry: 'Transportation & Mobility',
      website: 'https://urbanmobility.example.com',
    },
    financials: {
      revenue: '₹280 Cr (FY 2022-23)',
      profit: '₹42 Cr (FY 2022-23)',
      growthRate: '45% YoY',
    },
    keyHighlights: [
      'Operates 5000+ electric vehicles across 10 major cities',
      'Proprietary mobility-as-a-service platform',
      'Strategic partnerships with metro authorities',
      'Carbon offset program with environmental impact tracking',
    ],
    riskFactors: [
      'High capital expenditure for fleet expansion',
      'Evolving regulatory framework for mobility services',
      'Competition from ride-sharing giants',
      'Battery technology limitations and charging infrastructure',
    ],
  },
  {
    id: '5',
    name: 'Agritech Innovations',
    symbol: 'AGRI',
    exchange: 'NSE',
    openDate: '2023-12-08',
    closeDate: '2023-12-13',
    priceRange: '250-280',
    lotSize: 50,
    status: 'open',
    description: 'Agritech Innovations provides smart farming solutions leveraging IoT, data analytics, and precision agriculture technologies.',
    totalShares: 22000000,
    issueSize: '₹616 Cr',
    minInvestment: '₹14,000',
    companyInfo: {
      founded: '2013',
      headquarters: 'Pune, India',
      employees: '720+',
      industry: 'Agriculture Technology',
      website: 'https://agritech.example.com',
    },
    financials: {
      revenue: '₹230 Cr (FY 2022-23)',
      profit: '₹35 Cr (FY 2022-23)',
      growthRate: '38% YoY',
    },
    keyHighlights: [
      'Smart farming solutions deployed across 500,000+ acres',
      'AI-powered crop prediction and health monitoring',
      'Farm-to-market platform connecting 100,000+ farmers',
      'Water conservation technology reducing usage by 30%',
    ],
    riskFactors: [
      'Seasonal nature of agriculture business',
      'Dependency on monsoon and climate conditions',
      'Rural digital adoption challenges',
      'International competition in agritech space',
    ],
  },
  {
    id: '6',
    name: 'FinSecure Technologies',
    symbol: 'FNSC',
    exchange: 'BSE',
    openDate: '2023-12-01',
    closeDate: '2023-12-06',
    priceRange: '380-420',
    lotSize: 35,
    status: 'closed',
    description: 'FinSecure Technologies specializes in cybersecurity solutions for the financial sector, with a focus on fraud prevention and secure transactions.',
    totalShares: 20000000,
    issueSize: '₹840 Cr',
    minInvestment: '₹14,700',
    companyInfo: {
      founded: '2012',
      headquarters: 'Gurgaon, India',
      employees: '650+',
      industry: 'Financial Technology & Cybersecurity',
      website: 'https://finsecure.example.com',
    },
    financials: {
      revenue: '₹310 Cr (FY 2022-23)',
      profit: '₹58 Cr (FY 2022-23)',
      growthRate: '33% YoY',
    },
    keyHighlights: [
      'Secures 25% of India\'s digital banking transactions',
      'Patented AI-based fraud detection algorithms',
      'Compliance solutions for 100+ financial institutions',
      'Zero-breach track record for core protected systems',
    ],
    riskFactors: [
      'Rapidly evolving threat landscape',
      'Talent acquisition challenges in cybersecurity',
      'Regulatory changes in financial services',
      'Increasing sophistication of cyber attacks',
    ],
  },
  {
    id: '7',
    name: 'EduTech Platforms',
    symbol: 'EDUT',
    exchange: 'NSE',
    openDate: '2023-12-20',
    closeDate: '2023-12-26',
    priceRange: '320-350',
    lotSize: 40,
    status: 'upcoming',
    description: 'EduTech Platforms is revolutionizing education with personalized learning solutions, online certification courses, and AI-based tutoring.',
    totalShares: 24000000,
    issueSize: '₹840 Cr',
    minInvestment: '₹14,000',
    companyInfo: {
      founded: '2014',
      headquarters: 'Bangalore, India',
      employees: '880+',
      industry: 'Education Technology',
      website: 'https://edutech.example.com',
    },
    financials: {
      revenue: '₹290 Cr (FY 2022-23)',
      profit: '₹48 Cr (FY 2022-23)',
      growthRate: '40% YoY',
    },
    keyHighlights: [
      '5 million+ active learners across platforms',
      'Content partnership with 50+ leading universities',
      'Adaptive learning technology with personalized paths',
      'Enterprise solutions for corporate training adopted by 200+ companies',
    ],
    riskFactors: [
      'Highly competitive edtech landscape',
      'Post-pandemic normalization of education',
      'Content piracy and intellectual property challenges',
      'Dependency on internet infrastructure in rural areas',
    ],
  },
  {
    id: '8',
    name: 'Consumer Retail Chain',
    symbol: 'CRTL',
    exchange: 'BSE',
    openDate: '2023-12-12',
    closeDate: '2023-12-18',
    priceRange: '400-450',
    lotSize: 30,
    status: 'open',
    description: 'Consumer Retail Chain operates a nationwide network of supermarkets, hypermarkets, and specialty stores with an integrated omnichannel approach.',
    totalShares: 26000000,
    issueSize: '₹1170 Cr',
    minInvestment: '₹13,500',
    companyInfo: {
      founded: '2005',
      headquarters: 'New Delhi, India',
      employees: '12000+',
      industry: 'Retail',
      website: 'https://consumerretail.example.com',
    },
    financials: {
      revenue: '₹6500 Cr (FY 2022-23)',
      profit: '₹320 Cr (FY 2022-23)',
      growthRate: '22% YoY',
    },
    keyHighlights: [
      '350+ stores across 75 cities in India',
      'Integrated e-commerce platform with 5 million+ customers',
      'Private label brands contributing 30% of revenue',
      'Advanced supply chain optimization reducing wastage by 40%',
    ],
    riskFactors: [
      'Thin profit margins in retail sector',
      'Real estate costs and location dependencies',
      'Competition from e-commerce giants',
      'Inventory management and seasonal demand fluctuations',
    ],
  },
];

const IPOPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIPOs, setFilteredIPOs] = useState<IPO[]>(ipoData);
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'open' | 'closed'>('all');
  const [savedIPOs, setSavedIPOs] = useState<string[]>([]);

  // Filter IPOs based on search term and status
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    filterIPOs(term, filterStatus);
  };

  const handleFilterChange = (status: 'all' | 'upcoming' | 'open' | 'closed') => {
    setFilterStatus(status);
    filterIPOs(searchTerm, status);
  };

  const filterIPOs = (term: string, status: 'all' | 'upcoming' | 'open' | 'closed') => {
    let results = ipoData;
    
    // Filter by search term
    if (term) {
      results = results.filter(ipo => 
        ipo.name.toLowerCase().includes(term.toLowerCase()) || 
        ipo.symbol.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by status
    if (status !== 'all') {
      results = results.filter(ipo => ipo.status === status);
    }
    
    setFilteredIPOs(results);
  };

  const handleSaveIPO = (ipoId: string) => {
    setSavedIPOs(prev => {
      if (prev.includes(ipoId)) {
        return prev.filter(id => id !== ipoId);
      } else {
        return [...prev, ipoId];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 font-heading">IPO Explorer</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover, research, and collaborate on Initial Public Offerings (IPOs) from NSE and BSE exchanges.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="mb-10 space-y-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by company name or symbol..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={filterStatus === 'all' ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterChange('all')}
                  >
                    All IPOs
                  </Button>
                  <Button 
                    variant={filterStatus === 'upcoming' ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterChange('upcoming')}
                  >
                    Upcoming
                  </Button>
                  <Button 
                    variant={filterStatus === 'open' ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterChange('open')}
                  >
                    Open
                  </Button>
                  <Button 
                    variant={filterStatus === 'closed' ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterChange('closed')}
                  >
                    Closed
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> More Filters
                </Button>
              </div>
            </div>
            
            {/* Results Stats */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredIPOs.length}</span> IPOs
                {filterStatus !== 'all' && (
                  <> with status <span className="font-medium capitalize">{filterStatus}</span></>
                )}
                {searchTerm && (
                  <> matching "<span className="font-medium">{searchTerm}</span>"</>
                )}
              </p>
              
              <Link to="/ipo-listings" className="text-primary text-sm font-medium hover:underline flex items-center">
                View as list <ArrowUpRight size={14} className="ml-1" />
              </Link>
            </div>
            
            {/* IPO Cards */}
            {filteredIPOs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIPOs.map((ipo) => (
                  <IPOCard
                    key={ipo.id}
                    id={ipo.id}
                    name={ipo.name}
                    symbol={ipo.symbol}
                    exchange={ipo.exchange}
                    openDate={ipo.openDate}
                    closeDate={ipo.closeDate}
                    priceRange={ipo.priceRange}
                    lotSize={ipo.lotSize}
                    status={ipo.status}
                    isSaved={savedIPOs.includes(ipo.id)}
                    onSave={() => handleSaveIPO(ipo.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className={`p-10 text-center ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <p className="text-muted-foreground">No IPOs found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setFilteredIPOs(ipoData);
                  }}
                >
                  Clear all filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IPOPage;
