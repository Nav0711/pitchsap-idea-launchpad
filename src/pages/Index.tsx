import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyPitchsapSection from "@/components/WhyPitchsapSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import CommunitySection from "@/components/CommunitySection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AnimatedP from "@/components/AnimatedP";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedP />
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <WhyPitchsapSection />
      <CapabilitiesSection />
      <CommunitySection />
      <EarlyAccessSection />
      <BlogPreviewSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
