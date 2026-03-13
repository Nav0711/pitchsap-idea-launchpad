import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] hero-orb rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-accent" />
            AI-Powered Startup Validation
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Ideas are wild.
            <br />
            <span className="gradient-text">Pitchsap tames them.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Turn ideas into action with confidence. Pitchsap combines expert guidance, AI-powered insights, and community feedback to help you shape, validate, and move forward with clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-primary-foreground border-0 text-base px-8 h-12">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
