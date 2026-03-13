import { motion } from "framer-motion";
import { CheckCircle2, Target, BarChart3, MessageCircle, Users } from "lucide-react";

const capabilities = [
  { icon: CheckCircle2, title: "Idea Validation", desc: "Get your concept validated by experts and AI before investing time and resources." },
  { icon: Target, title: "Startup Strategy", desc: "Develop a clear roadmap with actionable steps to bring your startup to life." },
  { icon: BarChart3, title: "Pitch Improvement", desc: "Refine your pitch deck with data-driven insights and expert feedback." },
  { icon: MessageCircle, title: "Expert Reviews", desc: "Receive in-depth reviews from industry professionals in your domain." },
  { icon: Users, title: "Founder Community", desc: "Connect with like-minded founders, mentors, and startup experts." },
];

const steps = [
  "Submit your idea",
  "AI and expert evaluation",
  "Improve your pitch",
  "Launch your startup",
];

const CapabilitiesSection = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to Build Your Startup
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card-hover rounded-2xl p-6 text-center cursor-pointer relative overflow-hidden flex flex-col items-center justify-between group"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 text-primary-foreground group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <cap.icon className="h-7 w-7 drop-shadow-sm" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-10">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card-hover rounded-2xl p-5 text-center relative cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {i + 1}
                </div>
                <p className="text-sm font-bold text-foreground relative z-10 group-hover:text-primary transition-colors">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
