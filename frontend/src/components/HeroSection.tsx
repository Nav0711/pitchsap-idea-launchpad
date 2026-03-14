import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { VantaBackground } from "@/components/VantaBackground";
import heroLaptop from "@/assets/hero-laptop.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <style>{`
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-brand-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 6s linear infinite;
        }
      `}</style>
      {/* Full-bleed Vanta behind everything */}
      <VantaBackground />

      {/* ── Two-column layout, items-stretch so both columns match height ── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-stretch pt-24 px-4 sm:px-6 lg:px-10 pb-10 gap-6">

        {/* LEFT ── Content Glass Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          className="flex-1 glass-hero-card rounded-[2rem] flex flex-col justify-center p-8 sm:p-12 md:p-14 relative overflow-hidden"
        >
          {/* Subtle interior glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent pointer-events-none rounded-[2rem]" />

          <div className="relative z-10 max-w-xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">AI-Powered Startup Validation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-2xl">
              Ideas are wild.
              <br />
              <span className="text-white/90 ">
                <span className="text-transparent text-8xl bg-clip-text bg-gradient-to-r from-white via-purple-400 via-indigo-200 via-purple-500 to-white animate-brand-shimmer drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                  Pitchsap
                </span>{" "}
                tames them.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 mb-10 leading-relaxed font-medium">
              Turn ideas into action with confidence. AI-powered insights, expert guidance, and community feedback — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-white text-purple-950 font-bold border-0 text-base px-8 h-14 rounded-2xl hover:scale-105 hover:bg-purple-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.35)]"
                >
                  Get Started <Rocket className=" rotate-45 ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-base px-8 h-14 rounded-2xl hover:scale-105 transition-all border-white/30 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm font-medium"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT ── Laptop image matching the left card's height */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          className="hidden lg:flex flex-1 items-stretch"
        >
          <img
            src={heroLaptop}
            alt="Pitchsap dashboard on laptop"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
