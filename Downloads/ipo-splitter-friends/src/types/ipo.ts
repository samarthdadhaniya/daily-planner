export interface IPO {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  openDate: string;
  closeDate: string;
  priceRange: string;
  lotSize: number;
  status: 'upcoming' | 'open' | 'closed';
  description?: string;
  totalShares?: number;
  issueSize?: string;
  minInvestment?: string;
  companyInfo?: {
    founded: string;
    headquarters: string;
    employees: string;
    industry: string;
    website: string;
  };
  financials?: {
    revenue: string;
    profit: string;
    growthRate: string;
  };
  keyHighlights?: string[];
  riskFactors?: string[];
}

export interface UserIPO extends IPO {
  ipoId: ReactNode;
  ipoName: ReactNode;
  amount: ReactNode;
  timestamp: any;
  yourInvestment: string;
  allotmentStatus: string;
  allotmentQuantity?: number;
  currentValue?: string;
  profitLoss?: string;
}

export interface IPODetail extends IPO {
  companyDescription: string;
  financialHighlights: {
    revenue: string;
    profit: string;
    growth: string;
  };
  issueSize: string;
  registrar: string;
  leadManagers: string[];
  minInvestment?: string;
  recommendedInvestment?: boolean;
  grayMarketPremium?: string;
  subscriptionStatus?: {
    qib: string;
    hni: string;
    retail: string;
    total: string;
  };
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  mutualConnections?: number;
}

export interface Collaboration {
  id: string;
  ipoName: string;
  ipoSymbol: string;
  collaborators: Collaborator[];
  totalAmount: string;
  status: string;
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}
