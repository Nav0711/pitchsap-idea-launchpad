import { motion } from "framer-motion";
import { Users, Handshake, Globe } from "lucide-react";

const stats = [
  { icon: Users,     label: "Expert Mentors",    value: "500+"    },
  { icon: Handshake, label: "Ideas Validated",   value: "2,000+"  },
  { icon: Globe,     label: "Countries",          value: "40+"     },
];

const CommunitySection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-card rounded-[2rem] p-10 md:p-14 relative overflow-hidden shimmer"
        >
          {/* Decorative radial glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center mb-10">
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest ring-pulse">
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
              Collaborate with{" "}
              <span className="text-transparent bg-clip-text gradient-text">Mentors & Experts</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Join a thriving community where founders collaborate with experienced mentors. Share insights, get feedback, and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.96 }}
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
