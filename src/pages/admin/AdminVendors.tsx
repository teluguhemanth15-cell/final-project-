import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Check, X, Star, MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockVendors = [
  { id: 1, name: "Beach Shack Stay", type: "Hotel", location: "Goa", rating: 4.5, status: "approved", price: "₹800/night" },
  { id: 2, name: "Mountain Guide Raj", type: "Local Guide", location: "Manali", rating: 4.8, status: "pending", price: "₹1,500/day" },
  { id: 3, name: "Kerala Houseboat Co.", type: "Transport", location: "Kerala", rating: 4.6, status: "approved", price: "₹3,000/day" },
  { id: 4, name: "Jaipur Street Eats", type: "Food Vendor", location: "Jaipur", rating: 4.3, status: "pending", price: "₹200/meal" },
  { id: 5, name: "Rishikesh Rafting", type: "Transport", location: "Rishikesh", rating: 4.7, status: "approved", price: "₹1,200/trip" },
  { id: 6, name: "Udaipur Heritage Inn", type: "Hotel", location: "Udaipur", rating: 4.4, status: "rejected", price: "₹1,500/night" },
  { id: 7, name: "Goa Spice Market", type: "Local Shop", location: "Goa", rating: 4.1, status: "approved", price: "Varies" },
  { id: 8, name: "Valley Trek Guides", type: "Local Guide", location: "Manali", rating: 4.9, status: "pending", price: "₹2,000/day" },
];

const AdminVendors = () => {
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState(mockVendors);
  const [filter, setFilter] = useState("all");

  const updateStatus = (id: number, status: string) => {
    setVendors(vendors.map((v) => v.id === id ? { ...v, status } : v));
  };

  const filtered = vendors
    .filter((v) => filter === "all" || v.status === filter)
    .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase()));

  const statusColors: Record<string, string> = {
    approved: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Management</h1>
          <p className="text-sm text-muted-foreground">{vendors.length} vendors · {vendors.filter((v) => v.status === "pending").length} pending</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === f ? "bg-gradient-hero text-primary-foreground shadow-soft" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Vendor cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-elevated transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-foreground">{v.name}</h4>
                <p className="text-xs text-muted-foreground">{v.type}</p>
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[v.status]}`}>
                {v.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" /> {v.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" /> {v.rating}
              </div>
              <p className="text-lg font-bold text-gradient">{v.price}</p>
            </div>

            <div className="flex gap-2">
              {v.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => updateStatus(v.id, "approved")} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-primary-foreground rounded-lg h-9">
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(v.id, "rejected")} className="flex-1 rounded-lg h-9 text-destructive border-destructive/30 hover:bg-destructive/10">
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </>
              )}
              {v.status !== "pending" && (
                <Button size="sm" variant="outline" className="flex-1 rounded-lg h-9">
                  <Eye className="w-4 h-4 mr-1" /> View Details
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminVendors;
