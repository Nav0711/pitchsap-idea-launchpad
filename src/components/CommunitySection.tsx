import { motion } from "framer-motion";
import { Users, Handshake, Globe } from "lucide-react";

const CommunitySection = () => {
  return (
    <section className="py-24 relative z-10 bg-pink-100 dark:bg-violet-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Collaborate with <span className="gradient-text">Mentors & Experts</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join a thriving community where founders collaborate with experienced mentors and startup experts. Share insights, get feedback, and grow together.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Users, label: "Expert Mentors", value: "500+" },
                { icon: Handshake, label: "Ideas Validated", value: "2,000+" },
                { icon: Globe, label: "Countries", value: "40+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card-hover rounded-2xl p-6 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-white drop-shadow-sm" />
                    </div>
                    <div className="text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors">{stat.value}</div>
                    <div className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wide group-hover:text-foreground/80 transition-colors">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
