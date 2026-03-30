import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, DollarSign, Store, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Stats {
  totalUsers: number;
  totalTrips: number;
  totalRevenue: number;
  totalVendors: number;
}

interface Trip {
  id: string;
  destination: string;
  budget: number;
  status: string;
  created_at: string;
  user_id: string | null;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalTrips: 0, totalRevenue: 0, totalVendors: 0 });
  const [recentTrips, setRecentTrips] = useState<Trip[]>([]);
  const [destData, setDestData] = useState<{ dest: string; trips: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [profilesRes, tripsRes, vendorsRes] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("trips").select("*").order("created_at", { ascending: false }),
      supabase.from("vendors").select("id, revenue", { count: "exact" }),
    ]);

    const trips = tripsRes.data || [];
    const totalRevenue = trips.reduce((sum, t) => sum + Number(t.budget), 0);
    const vendorRevenue = (vendorsRes.data || []).reduce((sum, v) => sum + Number(v.revenue), 0);

    setStats({
      totalUsers: profilesRes.count || 0,
      totalTrips: trips.length,
      totalRevenue: totalRevenue + vendorRevenue,
      totalVendors: vendorsRes.count || 0,
    });

    setRecentTrips(trips.slice(0, 8));

    // Aggregate destinations
    const destMap: Record<string, number> = {};
    trips.forEach((t) => {
      destMap[t.destination] = (destMap[t.destination] || 0) + 1;
    });
    setDestData(
      Object.entries(destMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([dest, trips]) => ({ dest, trips }))
    );

    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Real-time subscriptions
    const tripsChannel = supabase
      .channel("admin-trips")
      .on("postgres_changes", { event: "*", schema: "public", table: "trips" }, () => fetchData())
      .subscribe();

    const vendorsChannel = supabase
      .channel("admin-vendors")
      .on("postgres_changes", { event: "*", schema: "public", table: "vendors" }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(tripsChannel);
      supabase.removeChannel(vendorsChannel);
    };
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Total Trips", value: stats.totalTrips, icon: MapPin, color: "from-primary to-amber-500" },
    { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, icon: DollarSign, color: "from-emerald-500 to-green-600" },
    { label: "Vendors", value: stats.totalVendors, icon: Store, color: "from-violet-500 to-purple-600" },
  ];

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time overview</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                Live
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="font-display font-bold text-foreground mb-4">Top Destinations</h3>
          {destData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={destData}>
                <XAxis dataKey="dest" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="trips" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">No trip data yet</div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="font-display font-bold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentTrips.length > 0 ? recentTrips.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.destination}</p>
                  <p className="text-xs text-muted-foreground">₹{Number(t.budget).toLocaleString("en-IN")} • {t.status}</p>
                </div>
                <span className="text-xs text-muted-foreground">{timeAgo(t.created_at)}</span>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-8">No trips yet. Users will show up here in real-time!</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
