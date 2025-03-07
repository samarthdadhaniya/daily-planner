import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { User, Lock, BellRing, Globe, Moon, Sun, Lightbulb } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { toast } = useToast();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been successfully changed.",
    });
  };

  const handleToggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
    toast({
      title: "Notifications Updated",
      description: `Notifications have been ${isNotificationsEnabled ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleToggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
    toast({
      title: "Theme Updated",
      description: `Dark mode has been ${isDarkModeEnabled ? 'disabled' : 'enabled'}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your personal information and account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">Profile Information</h3>
                  <p className="text-sm text-muted-foreground">Update your profile details</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleUpdateProfile}>Update Profile</Button>
              </div>
              <Separator />
              <div className="flex items-center space-x-4">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleChangePassword}>Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BellRing className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Enable or disable notifications</p>
                  </div>
                </div>
                <Switch id="notifications" checked={isNotificationsEnabled} onCheckedChange={handleToggleNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {isDarkModeEnabled ? (
                    <Sun className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Toggle dark mode</p>
                  </div>
                </div>
                <Switch id="dark-mode" checked={isDarkModeEnabled} onCheckedChange={handleToggleDarkMode} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
