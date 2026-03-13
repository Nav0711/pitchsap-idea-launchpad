import { motion } from "framer-motion";

const AnimatedP = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        viewBox="0 0 400 1200"
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] md:w-[700px] lg:w-[800px] h-auto"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
        }}
      >
        {/* The P shape - bowl + stem */}
        <defs>
          <linearGradient id="pGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(256 100% 64%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(263 69% 42%)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(256 100% 64%)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(263 69% 55%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(256 100% 64%)" stopOpacity="0.4" />
          </linearGradient>
          <filter id="pBlur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          {/* P path for stroke */}
          <path
            id="pPath"
            d="M 140 120 L 140 1100 M 140 120 L 220 120 Q 320 120 320 240 Q 320 360 220 360 L 140 360"
            fill="none"
          />
        </defs>

        {/* Background blurred P */}
        <use href="#pPath" stroke="url(#pGradient)" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" filter="url(#pBlur)" />

        {/* Main P outline */}
        <use href="#pPath" stroke="url(#pGradient)" strokeWidth="35" strokeLinecap="round" strokeLinejoin="round" />

        {/* Animated glow that traces the P */}
        <motion.circle
          r="12"
          fill="hsl(256 100% 72%)"
          filter="url(#glowFilter)"
          opacity="0.8"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 140 120 L 220 120 Q 320 120 320 240 Q 320 360 220 360 L 140 360 L 140 1100"
          />
        </motion.circle>

        {/* Smaller trailing glow */}
        <motion.circle
          r="6"
          fill="hsl(256 100% 80%)"
          filter="url(#glowFilter)"
          opacity="0.5"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 140 120 L 220 120 Q 320 120 320 240 Q 320 360 220 360 L 140 360 L 140 1100"
            begin="-0.5s"
          />
        </motion.circle>
      </svg>
    </div>
  );
};

export default AnimatedP;
