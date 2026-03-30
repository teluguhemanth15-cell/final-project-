import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Store, DollarSign, Brain, MapPin, ChevronLeft, ChevronRight, LogOut, Settings, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Users", icon: Users, to: "/admin/users" },
  { label: "Vendors", icon: Store, to: "/admin/vendors" },
  { label: "Revenue", icon: DollarSign, to: "/admin/revenue" },
  { label: "AI Control", icon: Brain, to: "/admin/ai" },
  { label: "Locations", icon: MapPin, to: "/admin/locations" },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-border flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-lg font-bold text-primary">
            Tourfinco
          </motion.span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(item.to)
                ? "bg-primary/10 text-primary shadow-soft"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Back to Site</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        className="hidden md:flex flex-col bg-card border-r border-border h-screen sticky top-0 overflow-hidden"
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-5 -right-3 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMobileOpen(false)} />
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            className="relative w-[260px] h-full bg-card flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 border-b border-border flex items-center px-4 gap-4 bg-card/50 backdrop-blur sticky top-0 z-40">
          <button className="md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="font-display font-semibold text-foreground">
            {navItems.find((n) => isActive(n.to))?.label || "Admin Panel"}
          </h2>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
