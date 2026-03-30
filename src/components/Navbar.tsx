import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Plane, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Plan Trip", to: "/planner" },
  { label: "How it Works", to: "/#how-it-works" },
  { label: "Destinations", to: "/#destinations" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Playful animated logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft relative"
          >
            <Plane className="w-5 h-5 text-primary-foreground" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-sm" />
            </motion.div>
          </motion.div>
          <div className="flex items-baseline gap-0">
            <motion.span className="font-display text-xl font-bold text-primary" whileHover={{ scale: 1.05 }}>Tour</motion.span>
            <motion.span className="font-display text-xl font-bold text-foreground" whileHover={{ scale: 1.05 }}>fin</motion.span>
            <motion.span className="font-display text-xl font-bold text-primary" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>co</motion.span>
            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-primary ml-0.5">✈</motion.span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium transition-colors relative group ${
                location.pathname === link.to ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-hero rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Admin
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5 text-muted-foreground">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/auth">
                <Button size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-soft rounded-full px-6">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3"
        >
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">
              {link.label}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">
            Admin Panel
          </Link>
          {user ? (
            <Button size="sm" variant="outline" onClick={() => { handleSignOut(); setOpen(false); }} className="w-full">
              Logout
            </Button>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full bg-gradient-hero text-primary-foreground rounded-full">Sign Up / Login</Button>
            </Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
