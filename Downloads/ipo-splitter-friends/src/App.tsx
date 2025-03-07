
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import IPOListings from "./pages/IPOListings";
import IPODetail from "./pages/IPODetail";
import IPOPage from "./pages/IPOPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Investments from "./pages/dashboard/Investments";
import Collaborations from "./pages/dashboard/Collaborations";
import Settings from "./pages/dashboard/Settings";
import Chat from "./pages/dashboard/Chat";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import IPODetailDynamic from "./pages/IPODetail";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ipo-listings" element={<IPOListings />} />
              <Route path="/ipo/:ipoId" element={<IPODetail />} />
              <Route path="/ipo" element={<IPOPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/investments" element={
                <ProtectedRoute>
                  <Investments />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/collaborations" element={
                <ProtectedRoute>
                  <Collaborations />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/chat/:userId" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
