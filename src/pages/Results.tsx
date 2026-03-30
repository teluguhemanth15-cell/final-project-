import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Utensils, Bus, Eye, Star, ArrowLeft, Download, Share2, Hotel, Lightbulb, Map, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import { TripMapFallback } from "@/components/TripMap";

interface TripState {
  destination: string;
  travelers: string;
  budget: number;
  duration: string;
}

const durationDays: Record<string, number> = { "1-2": 2, "3-5": 4, "7": 7, "10+": 10 };

const generateItinerary = (state: TripState) => {
  const days = durationDays[state.duration] || 3;
  const b = state.budget;

  const breakdown = [
    { name: "Accommodation", value: Math.round(b * 0.35), color: "#f97316" },
    { name: "Food", value: Math.round(b * 0.25), color: "#22c55e" },
    { name: "Travel", value: Math.round(b * 0.2), color: "#3b82f6" },
    { name: "Activities", value: Math.round(b * 0.15), color: "#a855f7" },
    { name: "Misc", value: Math.round(b * 0.05), color: "#6b7280" },
  ];

  const activities: Record<string, string[][]> = {
    Goa: [
      ["Visit Baga Beach & swim", "Explore Fort Aguada", "Sunset at Chapora Fort"],
      ["Old Goa churches", "Spice plantation tour", "Dudhsagar Falls trip"],
      ["Palolem Beach relaxation", "Water sports at Calangute", "Night market shopping"],
      ["Anjuna Flea Market", "Kayaking in backwaters", "Casino visit"],
    ],
    Manali: [
      ["Hadimba Temple visit", "Walk through Old Manali", "Mall Road shopping"],
      ["Solang Valley adventure", "Paragliding experience", "Hot springs at Vashisht"],
      ["Rohtang Pass day trip", "Snow activities", "Riverside camping"],
      ["Jogini Waterfall trek", "Tibetan monastery", "Local market exploration"],
    ],
    Kerala: [
      ["Alleppey houseboat ride", "Backwater cruise", "Sunset at Marari Beach"],
      ["Munnar tea gardens", "Mattupetty Dam", "Echo Point visit"],
      ["Thekkady spice tour", "Periyar boat ride", "Kathakali show"],
      ["Fort Kochi walking tour", "Chinese fishing nets", "Jewish synagogue"],
    ],
    Jaipur: [
      ["Amber Fort & elephant ride", "Jal Mahal photo stop", "Nahargarh Fort sunset"],
      ["City Palace tour", "Jantar Mantar", "Hawa Mahal"],
      ["Albert Hall Museum", "Birla Temple", "Chokhi Dhani dinner"],
      ["Jaigarh Fort", "Shopping at Johari Bazaar", "Block printing workshop"],
    ],
  };

  const foodRecs: Record<string, string[]> = {
    Goa: ["Fish curry rice at local shack (₹150)", "Bebinca dessert (₹80)", "Pork vindaloo at family restaurant (₹200)"],
    Manali: ["Siddu & Dham at Chopsticks (₹120)", "Trout fish at Johnson's Café (₹300)", "Momos at roadside stall (₹60)"],
    Kerala: ["Appam & stew at Kayees (₹100)", "Fish moilee at local toddy shop (₹180)", "Banana chips & halwa (₹50)"],
    Jaipur: ["Dal Baati Churma at LMB (₹200)", "Pyaaz Kachori at Rawat (₹40)", "Lassi at Lassiwala (₹30)"],
  };

  const defaultActivities = [
    ["Explore the city center", "Visit main attractions", "Local food trail"],
    ["Day trip to nearby spots", "Cultural experience", "Market shopping"],
    ["Adventure activity", "Temple/heritage visit", "Sunset viewpoint"],
    ["Nature walk/trek", "Souvenir shopping", "Relaxation day"],
  ];

  const defaultFood = ["Local thali at budget restaurant (₹120)", "Street food tour (₹80)", "Regional specialty dish (₹150)"];

  const dest = state.destination;
  const acts = activities[dest] || defaultActivities;
  const foods = foodRecs[dest] || defaultFood;

  const itinerary = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    activities: acts[i % acts.length],
    food: foods[i % foods.length],
    transport: i === 0 ? "Arrive by train/bus" : "Local auto/bike rental",
    hiddenGem: i === 0 ? `Secret viewpoint near ${dest}` : `Hidden café in old town`,
  }));

  return { breakdown, itinerary, days };
};

const Results = () => {
  const location = useLocation();
  const state = (location.state as TripState) || {
    destination: "Goa",
    travelers: "couple",
    budget: 15000,
    duration: "3-5",
  };

  const { breakdown, itinerary, days } = generateItinerary(state);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const travelerLabel: Record<string, string> = {
    solo: "Solo Traveler",
    couple: "Couple",
    family: "Family (3–5)",
    group: "Group (6+)",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero header with particles */}
      <div className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <ParticleField />
        </div>
        <div className="relative z-10 pt-12 pb-16 container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/planner" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to planner
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Your <span className="text-gradient">{state.destination}</span> Trip Plan
            </h1>
            <p className="text-muted-foreground">
              {days} days · {travelerLabel[state.travelers] || state.travelers} · Budget ₹{state.budget.toLocaleString("en-IN")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl pb-16 space-y-10">
        {/* Trip overview cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Destination", value: state.destination, icon: MapPin },
            { label: "Total Budget", value: `₹${state.budget.toLocaleString("en-IN")}`, icon: Star },
            { label: "Duration", value: `${days} days`, icon: Eye },
          ].map((c) => (
            <motion.div key={c.label} whileHover={{ scale: 1.02, y: -2 }} className="bg-card rounded-2xl p-6 border border-border shadow-card cursor-default">
              <c.icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="text-xl font-bold text-foreground">{c.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Map Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Trip Map</h2>
          </div>
          <TripMapFallback destination={state.destination} />
        </motion.div>

        {/* Budget Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-8 border border-border shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-6">Budget Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={breakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none" animationBegin={0} animationDuration={1200}>
                  {breakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {breakdown.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                    <span className="text-sm text-foreground">{b.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">₹{b.value.toLocaleString("en-IN")}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Daily Itinerary - Accordion style */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">Daily Itinerary</h2>
          <div className="space-y-3">
            {itinerary.map((day, idx) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      D{day.day}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Day {day.day}</h3>
                  </div>
                  {expandedDay === idx ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {expandedDay === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-5 pb-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2 mt-4">
                          <Eye className="w-4 h-4 text-primary" /> Places to Visit
                        </div>
                        <ul className="space-y-2">
                          {day.activities.map((a, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {a}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4 mt-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
                            <Utensils className="w-4 h-4 text-accent" /> Food
                          </div>
                          <p className="text-sm text-muted-foreground">{day.food}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
                            <Bus className="w-4 h-4 text-primary" /> Transport
                          </div>
                          <p className="text-sm text-muted-foreground">{day.transport}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
                            <Lightbulb className="w-4 h-4 text-primary" /> Hidden Gem
                          </div>
                          <p className="text-sm text-muted-foreground">{day.hiddenGem}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hotel suggestions - with hover 3D tilt */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Stays</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "Budget Hostel", price: "₹500/night", rating: 4.2, desc: "Clean dorms, great vibe" },
              { name: "Cozy Guesthouse", price: "₹1,200/night", rating: 4.5, desc: "Homely stay with breakfast" },
              { name: "Budget Hotel", price: "₹1,800/night", rating: 4.3, desc: "AC rooms, central location" },
            ].map((h, i) => (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.03, rotateY: 3, rotateX: -2 }}
                className="bg-card rounded-2xl p-5 border border-border shadow-card cursor-default"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Hotel className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-bold text-foreground">{h.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{h.desc}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-primary fill-primary" /> {h.rating}
                </div>
                <p className="mt-3 text-lg font-bold text-gradient">{h.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4">
          <Button className="bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-90 h-12 px-6 rounded-xl">
            <Download className="mr-2 w-4 h-4" /> Download PDF
          </Button>
          <Button variant="outline" className="h-12 px-6 rounded-xl">
            <Share2 className="mr-2 w-4 h-4" /> Share Trip
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
