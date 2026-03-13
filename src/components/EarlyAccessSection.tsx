import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { VantaBackground } from "@/components/VantaBackground";

const EarlyAccessSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list! We'll be in touch soon.");
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 relative overflow-hidden">
      <VantaBackground />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-hero-card rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-violet-900/15 pointer-events-none rounded-[2rem]" />

          <div className="relative z-10">
            {/* Animated pill */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 ring-pulse"
            >
              <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Limited Early Access</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Join Early Access
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-10 max-w-md mx-auto">
              Be among the first. Limited spots available.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center gap-3 text-white"
                >
                  <CheckCircle className="h-12 w-12 text-emerald-400" />
                  <p className="font-bold text-lg">You're on the list!</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 flex-1 backdrop-blur-md focus:border-primary/70 focus:ring-2 focus:ring-primary/40 transition-all duration-200 rounded-xl"
                    required
                  />
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 bg-white text-primary-deep hover:bg-purple-50 border-0 shrink-0 font-bold shadow-lg shadow-primary/20 rounded-xl interactive shimmer"
                    >
                      Join Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
