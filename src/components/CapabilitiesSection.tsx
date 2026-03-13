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
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card-hover rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_hsl(256_100%_64%/0.15)]"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground group-hover:scale-110 transition-transform">
                <cap.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{cap.title}</h3>
              <p className="text-sm text-muted-foreground">{cap.desc}</p>
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
                whileHover={{ y: -4, scale: 1.03 }}
                className="glass-card rounded-xl p-5 text-center relative cursor-pointer hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_20px_hsl(256_100%_64%/0.1)]"
              >
                <div className="w-8 h-8 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-foreground">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
