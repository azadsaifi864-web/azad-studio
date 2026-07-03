import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorSpotlight from "@/components/CursorSpotlight";

export default function Home() {
  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" role="presentation" />

      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* Loading screen */}
      <Loader />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <PortfolioSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
