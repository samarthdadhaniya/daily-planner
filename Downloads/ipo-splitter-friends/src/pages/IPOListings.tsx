
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IPOList from '@/components/IPOList';

const IPOListings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 font-heading">IPO Listings</h1>
            <p className="text-lg text-muted-foreground">
              Discover and track upcoming, open, and closed IPOs from NSE and BSE.
            </p>
          </div>
          
          <IPOList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IPOListings;
