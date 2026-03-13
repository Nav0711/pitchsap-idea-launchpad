import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Users, Brain, Rocket, Target, Presentation, UserPlus, ClipboardCheck, ShieldCheck, GitBranch, MessageSquare, BookOpen } from "lucide-react";

const ideatorSteps = [
  { icon: Lightbulb, title: "Submit Ideas", desc: "Share your startup idea and get the validation process started." },
  { icon: Brain, title: "Expert Mentorship + AI Review", desc: "Receive combined human expertise and AI-powered analysis." },
  { icon: Target, title: "Refine and Adapt", desc: "Iterate on feedback to strengthen your concept." },
  { icon: Rocket, title: "Elevate and Optimize", desc: "Polish your strategy for maximum impact." },
  { icon: Presentation, title: "Prototype Powerhouse", desc: "Build a compelling prototype to showcase your vision." },
  { icon: Users, title: "Investor Pitching", desc: "Get ready to pitch with confidence to investors." },
];

const consultantSteps = [
  { icon: UserPlus, title: "Join as Consultant", desc: "Sign up and become part of the expert network." },
  { icon: ClipboardCheck, title: "Fill Out Expert Form", desc: "Share your expertise, skills, and domain knowledge." },
  { icon: ShieldCheck, title: "Get Reviewed & Accepted", desc: "Our team verifies your credentials and approves your profile." },
  { icon: GitBranch, title: "Get Matched with Ideas", desc: "Receive ideas aligned with your domain expertise." },
  { icon: MessageSquare, title: "Share Feedback & Mentor", desc: "Provide actionable reviews and guide founders." },
  { icon: BookOpen, title: "Access the Pitchsap Library", desc: "Explore resources, case studies, and tools." },
];

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState<"ideator" | "consultant">("ideator");
  const steps = activeTab === "ideator" ? ideatorSteps : consultantSteps;

  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're an ideator or a consultant, Pitchsap has a clear path for you.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="glass-card rounded-full p-1 flex gap-1">
            <button
              onClick={() => setActiveTab("ideator")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === "ideator"
                  ? "gradient-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Ideator
            </button>
            <button
              onClick={() => setActiveTab("consultant")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === "consultant"
                  ? "gradient-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Consultant
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card-hover rounded-xl p-6 group cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_hsl(256_100%_64%/0.15)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary mb-1 block">Step {i + 1}</span>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowItWorksSection;
