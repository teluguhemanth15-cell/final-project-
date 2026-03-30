import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import destGoa from "@/assets/dest-goa.jpg";
import destManali from "@/assets/dest-manali.jpg";
import destKerala from "@/assets/dest-kerala.jpg";
import destJaipur from "@/assets/dest-jaipur.jpg";
import destRishikesh from "@/assets/dest-rishikesh.jpg";
import destUdaipur from "@/assets/dest-udaipur.jpg";

const destinations = [
  { name: "Goa", tag: "Beaches & Nightlife", price: "₹8,000", rating: 4.8, image: destGoa },
  { name: "Manali", tag: "Mountains & Snow", price: "₹12,000", rating: 4.7, image: destManali },
  { name: "Kerala", tag: "Backwaters & Nature", price: "₹10,000", rating: 4.9, image: destKerala },
  { name: "Jaipur", tag: "Heritage & Culture", price: "₹7,000", rating: 4.6, image: destJaipur },
  { name: "Rishikesh", tag: "Adventure & Yoga", price: "₹6,500", rating: 4.7, image: destRishikesh },
  { name: "Udaipur", tag: "Lakes & Palaces", price: "₹9,000", rating: 4.8, image: destUdaipur },
];

const FeaturedDestinations = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Top Picks</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Popular Budget Destinations
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Start from as low as ₹6,500 for a complete trip experience
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <Link to="/planner" className="block group">
                <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={d.image}
                      alt={`${d.name} - ${d.tag}`}
                      loading="lazy"
                      width={768}
                      height={512}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold text-foreground">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                      {d.rating}
                    </div>
                    <h3 className="absolute bottom-4 left-5 text-2xl font-bold text-primary-foreground drop-shadow-lg">{d.name}</h3>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {d.tag}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">from</span>
                      <p className="text-lg font-bold text-foreground">{d.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
