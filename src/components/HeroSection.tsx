import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { VantaBackground } from "@/components/VantaBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center overflow-hidden">
      <VantaBackground />
      {/* The Glassmorphism Container (lesser in size from borders) */}
      <div className="w-full max-w-7xl min-h-[calc(100vh-10rem)] glass-card bg-white/10 dark:bg-black/20 border-white/20 backdrop-blur-xl rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl relative p-6 sm:p-12 md:p-16 lg:p-24 overflow-hidden">
        
        {/* Subtle interior glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-4xl text-center mx-auto"
          >
            {/* Tagline */}
            

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-white drop-shadow-xl">
              Ideas are wild.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white drop-shadow-sm">Pitchsap tames them.</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-purple-50/90 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-md font-medium">
              Turn ideas into action with confidence. Pitchsap combines expert guidance, AI-powered insights, and community feedback to help you shape, validate, and move forward with clarity.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 justify-center mt-6"
            >
              <Button size="lg" className="bg-white text-purple-950 font-bold border-0 text-base md:text-lg px-8 sm:px-10 h-14 md:h-16 rounded-2xl hover:scale-105 hover:bg-purple-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                Get Started <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <Button size="lg" variant="outline" className="text-base md:text-lg px-8 sm:px-10 h-14 md:h-16 rounded-2xl hover:scale-105 transition-all border-white/30 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm shadow-sm font-medium">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
