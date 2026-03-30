import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Planner from "./pages/Planner.tsx";
import Results from "./pages/Results.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import AdminGate from "./components/AdminGate.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminVendors from "./pages/admin/AdminVendors.tsx";
import AdminRevenue from "./pages/admin/AdminRevenue.tsx";
import AdminAI from "./pages/admin/AdminAI.tsx";
import AdminLocations from "./pages/admin/AdminLocations.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/results" element={<Results />} />

            {/* Admin Panel - Password Protected */}
            <Route path="/admin" element={<AdminGate><AdminLayout /></AdminGate>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="vendors" element={<AdminVendors />} />
              <Route path="revenue" element={<AdminRevenue />} />
              <Route path="ai" element={<AdminAI />} />
              <Route path="locations" element={<AdminLocations />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
