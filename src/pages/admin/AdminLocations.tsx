import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const initialLocations = [
  { id: 1, name: "Goa", state: "Goa", lat: 15.2993, lng: 74.124, popular: true },
  { id: 2, name: "Manali", state: "Himachal Pradesh", lat: 32.2396, lng: 77.1887, popular: true },
  { id: 3, name: "Kerala", state: "Kerala", lat: 10.8505, lng: 76.2711, popular: true },
  { id: 4, name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, popular: true },
  { id: 5, name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, popular: true },
  { id: 6, name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, popular: true },
  { id: 7, name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, popular: false },
  { id: 8, name: "Darjeeling", state: "West Bengal", lat: 27.0360, lng: 88.2627, popular: false },
];

const AdminLocations = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState(initialLocations);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newState, setNewState] = useState("");

  const addLocation = () => {
    if (!newName || !newState) return;
    setLocations([...locations, { id: Date.now(), name: newName, state: newState, lat: 20, lng: 78, popular: false }]);
    setNewName("");
    setNewState("");
    setShowAdd(false);
    toast({ title: "Location added", description: `${newName} has been added.` });
  };

  const removeLocation = (id: number) => {
    setLocations(locations.filter((l) => l.id !== id));
    toast({ title: "Location removed" });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Location Management</h1>
          <p className="text-sm text-muted-foreground">{locations.length} destinations</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-90 rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Destination
        </Button>
      </motion.div>

      {showAdd && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card rounded-2xl p-6 border border-border shadow-card flex flex-col sm:flex-row gap-4">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Destination name"
            className="flex-1 h-10 px-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="State"
            className="flex-1 h-10 px-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button onClick={addLocation} className="bg-gradient-hero text-primary-foreground rounded-xl">Add</Button>
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-elevated transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{l.name}</h4>
                  <p className="text-xs text-muted-foreground">{l.state}</p>
                </div>
              </div>
              {l.popular && (
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Popular</span>
              )}
            </div>
            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="flex-1 rounded-lg h-8 text-xs">
                <Edit className="w-3 h-3 mr-1" /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 rounded-lg h-8 text-xs text-destructive" onClick={() => removeLocation(l.id)}>
                <Trash2 className="w-3 h-3 mr-1" /> Remove
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminLocations;
