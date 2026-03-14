import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyPitchsapSection from "@/components/WhyPitchsapSection";
import CommunitySection from "@/components/CommunitySection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import PricingPageSection from "@/components/PricingPageSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  const isLoggedIn = localStorage.getItem("pitchsap_logged_in") === "true";

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <WhyPitchsapSection />
      <PricingPageSection />
      <CommunitySection />
      <EarlyAccessSection />
      <BlogPreviewSection />
      <CTASection />
      <Footer />
      <ChatWidget isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Index;
