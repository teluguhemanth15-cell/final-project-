import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="destinations">
        <FeaturedDestinations />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
