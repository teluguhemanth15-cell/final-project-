import { motion } from "framer-motion";
import { Search, Users, Sparkles, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Enter Destination",
    desc: "Search for any destination across India — from Goa beaches to Himalayan peaks.",
  },
  {
    icon: Users,
    step: "02",
    title: "Select Travelers & Budget",
    desc: "Tell us your group size and budget. We optimize every rupee for maximum experience.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Get AI-Generated Plan",
    desc: "Our AI crafts a complete itinerary with hidden gems, local food spots, and transport.",
  },
  {
    icon: ShoppingBag,
    step: "04",
    title: "Book Affordable Vendors",
    desc: "Connect with verified local vendors for the best prices on stays, food, and activities.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-foreground">
            How Tourfinco Works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Plan your dream budget trip in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-300 h-full">
                <span className="text-6xl font-display font-bold text-muted/80 absolute top-4 right-6">
                  {s.step}
                </span>
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
