
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { UserIPO } from '@/types/ipo';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  });

  // Mock past investments
  const pastInvestments: UserIPO[] = [
    {
      id: '3',
      name: 'ABC Pharmaceuticals',
      symbol: 'ABCP',
      exchange: 'NSE',
      openDate: '2023-05-10',
      closeDate: '2023-05-15',
      priceRange: '650-700',
      lotSize: 20,
      status: 'closed',
      yourInvestment: '₹70,000',
      allotmentStatus: 'Allotted'
    },
    {
      id: '5',
      name: 'PQR Automobiles',
      symbol: 'PQRA',
      exchange: 'BSE',
      openDate: '2023-04-20',
      closeDate: '2023-04-25',
      priceRange: '1200-1300',
      lotSize: 10,
      status: 'closed',
      yourInvestment: '₹130,000',
      allotmentStatus: 'Not Allotted'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile via an API
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 font-heading">Your Profile</h1>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="investments">Past Investments</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-medium">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{user?.name}</h2>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <p className="text-sm text-blue-600 mt-1">Member since {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="input-primary"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="input-primary"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="input-primary"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            className="input-primary min-h-[100px]"
                            value={formData.bio}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="investments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment History</CardTitle>
                <CardDescription>Your past IPO investments</CardDescription>
              </CardHeader>
              <CardContent>
                {pastInvestments.length > 0 ? (
                  <div className="space-y-4">
                    {pastInvestments.map((ipo) => (
                      <div key={ipo.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{ipo.name}</h3>
                            <p className="text-sm text-muted-foreground">{ipo.symbol} • {ipo.exchange}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ipo.allotmentStatus === 'Allotted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ipo.allotmentStatus}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Your Investment</p>
                            <p className="font-medium">{ipo.yourInvestment}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Price Range</p>
                            <p className="font-medium">₹{ipo.priceRange}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Issue Period</p>
                            <p className="font-medium">{ipo.openDate} to {ipo.closeDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Lot Size</p>
                            <p className="font-medium">{ipo.lotSize} units</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">You haven't made any IPO investments yet.</p>
                    <Button className="mt-4">
                      Explore IPOs
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                        <input
                          id="current-password"
                          type="password"
                          className="input-primary"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                        <input
                          id="new-password"
                          type="password"
                          className="input-primary"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                        <input
                          id="confirm-password"
                          type="password"
                          className="input-primary"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <Button>Update Password</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <p className="text-muted-foreground mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
