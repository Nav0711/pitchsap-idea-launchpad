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
    <section id="how-it-works" className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 bg-pink-100 dark:bg-violet-950">
      <div className="max-w-7xl mx-auto glass-card rounded-[2.5rem] border-white/20 dark:border-white/10 backdrop-blur-3xl bg-white/10 dark:bg-black/20 p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-3xl rounded-full -ml-48 -mb-48 pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white dark:text-white drop-shadow-md">
              How It Works
            </h2>
            <p className="text-white/80 dark:text-purple-100/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Whether you're an ideator or a consultant, Pitchsap has a clear path for you.
            </p>
          </motion.div>

          <div className="flex justify-center mb-16">
            <div className="bg-black/20 dark:bg-black/40 backdrop-blur-xl rounded-full p-1.5 flex gap-1 border border-white/10 shadow-inner">
              <button
                onClick={() => setActiveTab("ideator")}
                className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                  activeTab === "ideator"
                    ? "bg-white text-purple-900 shadow-xl scale-105"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Ideator
              </button>
              <button
                onClick={() => setActiveTab("consultant")}
                className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                  activeTab === "consultant"
                    ? "bg-white text-purple-900 shadow-xl scale-105"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Consultant
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white/5 dark:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[2rem] p-8 group relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white text-purple-900 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <step.icon className="h-7 w-7" />
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                          {i + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/50">Step {i + 1}</span>
                      </div>
                      <h3 className="font-bold text-xl text-white mb-3 group-hover:text-white transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
