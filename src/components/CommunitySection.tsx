import { motion } from "framer-motion";
import { Users, Handshake, Globe } from "lucide-react";

const CommunitySection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 hero-orb opacity-30 pointer-events-none" />
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
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-5">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
