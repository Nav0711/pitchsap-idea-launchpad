import { motion } from "framer-motion";
import { Lightbulb, Users, Cpu, Shield } from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "Sharper Ideas",
    desc: "AI-powered feedback that uncovers blindspots before they cost you time or money.",
    accent: "bg-primary/10 text-primary",
    border: "hover:border-primary/40",
  },
  {
    icon: Users,
    title: "Expert Network",
    desc: "Real consultants, real guidance. Build credibility and grow alongside vetted mentors.",
    accent: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    border: "hover:border-violet-400/40",
  },
  {
    icon: Cpu,
    title: "AI at the Core",
    desc: "Smart, structured reviews that surface what matters—instantly, at scale.",
    accent: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    border: "hover:border-indigo-400/40",
  },
  {
    icon: Shield,
    title: "Trusted by Design",
    desc: "End-to-end privacy, transparent process, zero idea leakage.",
    accent: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    border: "hover:border-purple-400/40",
  },
];

const WhyPitchsapSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
            Why Pitchsap
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            From idea to impact,{" "}
            <span className="text-transparent bg-clip-text gradient-text">faster</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Built for founders and experts who demand clarity, trust, and real traction.
          </p>
        </motion.div>

        {/* 4-column pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -7, transition: { duration: 0.2, ease: "easeOut" } }}
              whileTap={{ scale: 0.97 }}
              className={`glass-card-hover rounded-2xl p-7 group cursor-default flex flex-col gap-4 border border-transparent transition-colors duration-300 ${p.border}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${p.accent}`}>
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 glass-card rounded-2xl px-8 py-6 grid grid-cols-3 divide-x divide-border"
        >
          {[
            { v: "2×", l: "Faster validation" },
            { v: "500+", l: "Expert mentors" },
            { v: "92%", l: "Satisfaction rate" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center text-center px-4">
              <span className="text-2xl md:text-3xl font-extrabold text-primary">{s.v}</span>
              <span className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wide">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPitchsapSection;
