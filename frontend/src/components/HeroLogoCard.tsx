import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export const HeroLogoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="glass-card px-10 py-6 sm:px-16 sm:py-8 rounded-3xl flex items-center justify-center gap-4 relative overflow-hidden backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] bg-white/10"
      >
        {/* Subtle interior glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        
        {/* Rocket Icon acting as 'P' ascender, and text */}
        <div className="flex items-center">
            <div className="relative flex flex-col items-center justify-center mr-2">
                <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white -mb-2 z-10" strokeWidth={1.5} />
                <svg width="24" height="40" viewBox="0 0 24 40" className="opacity-80">
                   <path d="M12 0 V20 Q12 40 24 40" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
            <span className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-1">
              itchsap
            </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
