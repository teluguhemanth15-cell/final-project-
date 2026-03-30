import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">Tourfinco</span>
          </div>
          <p className="text-secondary-foreground/60 text-sm max-w-sm leading-relaxed">
            AI-powered trip planning for budget travelers across India. Discover hidden gems without breaking the bank.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-secondary-foreground/40">Quick Links</h4>
          <div className="space-y-2.5">
            <Link to="/" className="block text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Home</Link>
            <Link to="/planner" className="block text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Plan Trip</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-secondary-foreground/40">Destinations</h4>
          <div className="space-y-2.5">
            {["Goa", "Manali", "Kerala", "Jaipur"].map(d => (
              <Link key={d} to="/planner" className="block text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{d}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center text-xs text-secondary-foreground/40">
        © {new Date().getFullYear()} Tourfinco. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
