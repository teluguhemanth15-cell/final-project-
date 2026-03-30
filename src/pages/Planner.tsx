import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Users, UsersRound, UserPlus, ArrowRight, ArrowLeft, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";

const suggestions = ["Goa", "Manali", "Kerala", "Jaipur", "Rishikesh", "Udaipur", "Varanasi", "Darjeeling"];

const travelerOptions = [
  { label: "Solo", icon: User, value: "solo" },
  { label: "Couple", icon: Users, value: "couple" },
  { label: "Family (3–5)", icon: UsersRound, value: "family" },
  { label: "Group (6+)", icon: UserPlus, value: "group" },
];

const durationOptions = [
  { label: "1–2 days", value: "1-2" },
  { label: "3–5 days", value: "3-5" },
  { label: "1 week", value: "7" },
  { label: "10+ days", value: "10+" },
];

const Planner = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budget, setBudget] = useState([15000]);
  const [duration, setDuration] = useState("");

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canProceed = [
    destination.length > 0,
    travelers.length > 0,
    true,
    duration.length > 0,
  ][step];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      navigate("/results", {
        state: { destination, travelers, budget: budget[0], duration },
      });
    }
  };

  const formatBudget = (v: number) => {
    if (v >= 100000) return "₹1,00,000+";
    return `₹${v.toLocaleString("en-IN")}`;
  };

  const stepContent = [
    // Step 0: Destination
    <motion.div key="dest" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Where do you want to go?</h2>
      <p className="text-muted-foreground mb-8">Search for your dream destination</p>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setDestination(e.target.value); }}
          placeholder="Search destinations..."
          className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-card"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {filtered.map((s) => (
          <button
            key={s}
            onClick={() => { setDestination(s); setSearchQuery(s); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              destination === s
                ? "bg-gradient-hero text-primary-foreground shadow-soft"
                : "bg-card border border-border text-foreground hover:border-primary/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 1: Travelers
    <motion.div key="travelers" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">How many people are traveling?</h2>
      <p className="text-muted-foreground mb-8">Select your group size</p>
      <div className="grid grid-cols-2 gap-4">
        {travelerOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTravelers(opt.value)}
            className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${
              travelers === opt.value
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              travelers === opt.value ? "bg-gradient-hero" : "bg-muted"
            }`}>
              <opt.icon className={`w-6 h-6 ${travelers === opt.value ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
            <span className="font-semibold text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 2: Budget
    <motion.div key="budget" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">What is your budget?</h2>
      <p className="text-muted-foreground mb-8">Slide to set your total trip budget</p>
      <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
        <div className="flex items-center justify-center gap-2 mb-8">
          <IndianRupee className="w-8 h-8 text-primary" />
          <span className="text-5xl font-bold text-gradient">{formatBudget(budget[0])}</span>
        </div>
        <Slider
          value={budget}
          onValueChange={setBudget}
          min={5000}
          max={100000}
          step={1000}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹5,000</span>
          <span>₹1,00,000+</span>
        </div>
      </div>
    </motion.div>,

    // Step 3: Duration
    <motion.div key="duration" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Trip duration</h2>
      <p className="text-muted-foreground mb-8">How long is your trip?</p>
      <div className="grid grid-cols-2 gap-4">
        {durationOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setDuration(opt.value)}
            className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${
              duration === opt.value
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              duration === opt.value ? "bg-gradient-hero" : "bg-muted"
            }`}>
              <Clock className={`w-6 h-6 ${duration === opt.value ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
            <span className="font-semibold text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <ParticleField />
      </div>
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-2xl">
        {/* Progress bar */}
        <div className="flex gap-2 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-gradient-hero" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">{stepContent[step]}</AnimatePresence>

        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="h-12 px-6 rounded-xl"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="h-12 px-8 rounded-xl bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-soft"
          >
            {step === 3 ? "Generate Plan" : "Next"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Planner;
