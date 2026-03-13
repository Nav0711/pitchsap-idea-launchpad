import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const EarlyAccessSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card rounded-2xl p-10 md:p-16 text-center shadow-xl border border-white/20 relative overflow-hidden"
        >
          {/* Subtle glow layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Early Access
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Be among the first to experience the future of startup validation. Limited spots available.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1 backdrop-blur-md focus:border-white/40 focus:ring-primary/50"
                required
              />
              <Button type="submit" size="lg" className="h-12 bg-white text-primary-deep hover:bg-white/90 border-0 shrink-0 font-bold shadow-lg shadow-black/20">
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
