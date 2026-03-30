import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Suspense, lazy } from "react";

const GlobeScene = lazy(() => import("@/components/GlobeScene"));

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-4rem)]">
          {/* Left content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-8">
                <Sparkles className="w-4 h-4" />
                AI-Powered Trip Planning
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground mb-6"
            >
              Your AI Travel
              <br />
              <span className="text-gradient">Budget Planner</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed"
            >
              Tell us your destination, budget & group size — get a complete AI-generated itinerary with food, stays, transport & hidden gems. All within your budget.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to="/planner">
                <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-90 text-base px-8 h-14 rounded-full">
                  Plan My Trip
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted h-14 rounded-full text-base px-8">
                  How it Works
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                No sign-up needed
              </div>
            </motion.div>
          </div>

          {/* Right - 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] hidden md:block"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse" />
                </div>
              }
            >
              <GlobeScene />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
