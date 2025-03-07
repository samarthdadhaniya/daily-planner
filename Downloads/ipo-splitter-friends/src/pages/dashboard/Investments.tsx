import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { LineChart, TrendingUp, TrendingDown, AlertCircle, Info } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { UserIPO } from '@/types/ipo';
import IPOList from '@/components/IPOList';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Investments = () => {
  const { toast } = useToast();

  // In a real app, this would be an actual API call
  const { data: investments, isLoading } = useQuery<UserIPO[]>({
    queryKey: ['investments'],
    queryFn: () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => resolve(investments), 500);
      });
    }
  });

  const handleSellInvestment = (id: string) => {
    toast({
      title: "Action Initiated",
      description: "Sell request has been initiated. You will be notified once processed.",
    });
  };

  return (
    <>
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading">My Investments</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your IPO investments
          </p>
        </div>

        {/* Investment List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">People Who are interested to invest..</h2>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : investments && investments.length > 0 ? (
            <div className="space-y-6">
              {investments.map((investment, index) => (
                <motion.div
                  key={investment.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow dark:border-gray-700">
                    <CardHeader className="bg-gray-50 dark:bg-gray-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{investment.name}</CardTitle>
                          <CardDescription>{investment.symbol} • {investment.exchange}</CardDescription>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          investment.profitLoss.startsWith('+')
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {investment.profitLoss}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Investment</p>
                          <p className="font-semibold">{investment.yourInvestment}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Current Value</p>
                          <p className="font-semibold">{investment.currentValue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Quantity</p>
                          <p className="font-semibold">{investment.allotmentQuantity} units</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Allotment Date</p>
                          <p className="font-semibold">{investment.closeDate}</p>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button
                          size="sm"
                          onClick={() => handleSellInvestment(investment.id)}
                          className={`${
                            investment.profitLoss.startsWith('+')
                              ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
                              : ''
                          }`}
                        >
                          Sell Investment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-muted-foreground">You don't have any investments yet.</p>
              <Button className="mt-4">Explore IPOs</Button>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Investments;
