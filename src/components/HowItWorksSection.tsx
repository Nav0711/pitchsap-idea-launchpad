import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, Users, Brain, Rocket, Target, Presentation,
  UserPlus, ClipboardCheck, ShieldCheck, GitBranch, MessageSquare, BookOpen,
} from "lucide-react";

const ideatorSteps = [
  { icon: Lightbulb, title: "Submit Idea",      desc: "Describe your concept through a guided form. Private and secure." },
  { icon: Brain,     title: "AI + Expert Review",desc: "AI analysis combined with real consultant insights, simultaneously." },
  { icon: Target,    title: "Refine & Iterate",  desc: "Close gaps and evolve your concept using structured feedback." },
  { icon: Rocket,    title: "Elevate Strategy",  desc: "Build a market-ready plan with experts who've navigated funding rounds." },
  { icon: Presentation, title: "Build Prototype",desc: "Create an MVP or pitch prototype with matched builders and resources." },
  { icon: Users,     title: "Pitch Investors",   desc: "Rehearse your pitch, get pre-flight feedback, and step in confident." },
];

const consultantSteps = [
  { icon: UserPlus,       title: "Join Network",    desc: "Create your expert profile and tell us your domain and mentorship style." },
  { icon: ClipboardCheck, title: "Expert Form",     desc: "Fill in credentials and areas you love advising — better detail, better matches." },
  { icon: ShieldCheck,    title: "Get Verified",    desc: "We review your profile for quality. Approvals typically within 48 hours." },
  { icon: GitBranch,      title: "Get Matched",     desc: "Ideas are routed by domain fit, availability, and your past performance." },
  { icon: MessageSquare,  title: "Mentor & Review", desc: "Provide structured feedback. Build reputation and earn rewards." },
  { icon: BookOpen,       title: "Library Access",  desc: "Tap into case studies, frameworks, and tools for advisors at every level." },
];

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState<"ideator" | "consultant">("ideator");
  const [hovered, setHovered] = useState<number | null>(null);
  const steps = activeTab === "ideator" ? ideatorSteps : consultantSteps;

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 md:px-10 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
            Step by Step
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            A clear path — whichever side of the table you're on.
          </p>
        </motion.div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-14">
          <div className="glass-card rounded-full p-1.5 flex gap-1 border border-purple-200 dark:border-white/10">
            {(["ideator", "consultant"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setHovered(null); }}
                className={`px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? "gradient-primary text-white shadow-lg scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Horizontal Timeline ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Desktop: horizontal */}
            <div className="hidden md:block relative">

              {/* Connector line */}
              <div className="absolute top-9 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* Steps row */}
              <div className="grid grid-cols-6 gap-2">
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="relative flex flex-col items-center"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Node */}
                    <motion.div
                      animate={{
                        scale: hovered === i ? 1.2 : 1,
                        rotate: hovered === i ? 8 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      className={`relative z-10 w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center cursor-default shadow-md transition-all duration-300 ${
                        hovered === i
                          ? "gradient-primary text-white shadow-primary/40"
                          : "glass-card text-primary"
                      }`}
                    >
                      <step.icon className="h-6 w-6" />
                      {/* Step number */}
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] min-h-[18px] rounded-full gradient-primary text-white text-[9px] font-extrabold flex items-center justify-center px-1 shadow">
                        {i + 1}
                      </span>
                    </motion.div>

                    {/* Title label */}
                    <motion.p
                      animate={{ color: hovered === i ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
                      className="mt-4 text-xs font-bold text-center leading-tight px-1 select-none"
                    >
                      {step.title}
                    </motion.p>

                    {/* Hover popup */}
                    <AnimatePresence>
                      {hovered === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.94 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-[calc(100%+12px)] z-30 w-52 glass-card rounded-2xl p-4 shadow-xl border border-primary/20 pointer-events-none"
                        >
                          {/* Arrow */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-zinc-900 border-t border-l border-purple-200 dark:border-white/10" />
                          <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1.5">Step {i + 1}</p>
                          <h4 className="text-sm font-bold text-foreground mb-2">{step.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden relative flex flex-col gap-3">
              <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/40 via-violet-400/20 to-transparent" />
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-xl glass-card flex items-center justify-center text-primary">
                    <step.icon className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 min-w-[16px] min-h-[16px] rounded-full gradient-primary text-white text-[8px] font-extrabold flex items-center justify-center px-0.5">
                      {i + 1}
                    </span>
                  </div>
                  <div className="glass-card rounded-2xl px-5 py-3.5 flex-1">
                    <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default HowItWorksSection;
