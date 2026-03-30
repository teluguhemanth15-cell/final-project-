import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ADMIN_PASSWORD = "tourfinco2026";

const AdminGate = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  // If user has admin role in DB, bypass password
  if (isAdmin || unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      toast.success("Admin access granted!");
    } else {
      toast.error("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto flex items-center justify-center shadow-elevated mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter admin password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-elevated p-6 space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="pl-10 h-12 rounded-xl"
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-hero text-primary-foreground font-semibold">
            Unlock Admin Panel
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminGate;
