import { motion } from "framer-motion";

export const WavyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-[#5A189A]">
      <svg
        className="absolute w-full h-[150%] top-[-25%] left-0 opacity-80"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,200 C300,100 700,400 1000,200 L1000,1000 L0,1000 Z"
          fill="url(#grad1)"
          initial={{ x: -50, y: 0 }}
          animate={{ x: 50, y: 20 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 12,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,400 C300,500 700,200 1000,400 L1000,1000 L0,1000 Z"
          fill="url(#grad2)"
          initial={{ x: 50, y: 20 }}
          animate={{ x: -50, y: -20 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,600 C400,500 600,800 1000,600 L1000,1000 L0,1000 Z"
          fill="url(#grad3)"
          initial={{ x: -25, y: -10 }}
          animate={{ x: 25, y: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 18,
            ease: "easeInOut",
          }}
        />
         <motion.path
          d="M0,800 C300,900 700,700 1000,900 L1000,1000 L0,1000 Z"
          fill="url(#grad4)"
          initial={{ x: 30, y: 10 }}
          animate={{ x: -30, y: -10 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B2CBF" />
            <stop offset="100%" stopColor="#3C096C" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9D4EDD" />
            <stop offset="100%" stopColor="#5A189A" />
          </linearGradient>
          <linearGradient id="grad3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0AAFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="grad4" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#C77DFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5A189A" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
