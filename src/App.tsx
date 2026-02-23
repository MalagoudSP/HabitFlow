import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Gamification from "./pages/Gamification";
import MoodJournal from "./pages/MoodJournal";
import Goals from "./pages/Goals";
import Social from "./pages/Social";
import SmartNotifications from "./pages/Notifications";
import AdvancedScheduling from "./pages/Scheduling";
import AccountSettings from "./pages/Settings";
import DeepAnalytics from "./pages/DeepAnalytics";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/auth" element={<Auth />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      }
    />
    {/* AI-Powered Features */}
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />
    <Route
      path="/deep-analytics"
      element={
        <ProtectedRoute>
          <DeepAnalytics />
        </ProtectedRoute>
      }
    />
    <Route
      path="/gamification"
      element={
        <ProtectedRoute>
          <Gamification />
        </ProtectedRoute>
      }
    />
    <Route
      path="/mood-journal"
      element={
        <ProtectedRoute>
          <MoodJournal />
        </ProtectedRoute>
      }
    />
    <Route
      path="/goals"
      element={
        <ProtectedRoute>
          <Goals />
        </ProtectedRoute>
      }
    />
    <Route
      path="/social"
      element={
        <ProtectedRoute>
          <Social />
        </ProtectedRoute>
      }
    />
    <Route
      path="/notifications"
      element={
        <ProtectedRoute>
          <SmartNotifications />
        </ProtectedRoute>
      }
    />
    <Route
      path="/scheduling"
      element={
        <ProtectedRoute>
          <AdvancedScheduling />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <AccountSettings />
        </ProtectedRoute>
      }
    />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
