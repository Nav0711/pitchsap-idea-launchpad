import { motion } from "framer-motion";
import { Lightbulb, Users, Cpu, Shield } from "lucide-react";

const blocks = [
  {
    icon: Lightbulb,
    title: "Why Ideators Need Pitchsap",
    desc: "Get early, honest, actionable feedback to understand risks, see how experts view your idea, identify improvements, and save time by shaping a clearer, stronger startup plan from the start.",
    color: "from-primary to-primary-deep",
  },
  {
    icon: Users,
    title: "Why Consultants Love Pitchsap",
    desc: "Help people who truly need guidance, build your reputation through quality reviews, expand your network in a trusted community, and gain steady opportunities as more ideators seek your expertise.",
    color: "from-accent to-emerald-600",
  },
  {
    icon: Cpu,
    title: "Why AI Matters Here",
    desc: "AI makes idea reviews faster and smarter, bringing clarity to complex concepts. It supports consultants with deeper insights and gives ideators balanced, structured understanding for meaningful validation.",
    color: "from-blue-500 to-primary",
  },
  {
    icon: Shield,
    title: "A Clear, Transparent System",
    desc: "Easy steps, straightforward communication, and organized reviews. Pitchsap builds trust, supports growth, encourages collaboration, and ensures strong privacy to prevent idea leakage.",
    color: "from-amber-500 to-orange-600",
  },
];

const WhyPitchsapSection = () => {
  return (
    <section className="py-24 relative z-10 bg-pink-100 dark:bg-violet-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Pitchsap</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for founders and experts who want clarity, trust, and results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card-hover rounded-2xl p-8 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${block.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${block.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <block.icon className="h-7 w-7 text-white drop-shadow-sm" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{block.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">{block.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPitchsapSection;
