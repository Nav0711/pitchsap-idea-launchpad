import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, Users, Brain, Rocket, Target, Presentation,
  UserPlus, ClipboardCheck, ShieldCheck, GitBranch, MessageSquare, BookOpen,
} from "lucide-react";

const ideatorSteps = [
  { icon: Lightbulb,    title: "Submit Idea",        desc: "Describe your concept through a guided form. Private and secure from day one." },
  { icon: Brain,        title: "AI + Expert Review",  desc: "AI analysis combined with real consultant insights, simultaneously." },
  { icon: Target,       title: "Refine & Iterate",    desc: "Close gaps and evolve your concept using structured, actionable feedback." },
  { icon: Rocket,       title: "Elevate Strategy",    desc: "Build a market-ready plan with experts who've navigated funding rounds." },
  { icon: Presentation, title: "Build Prototype",     desc: "Create an MVP or pitch deck with matched builders and resources." },
  { icon: Users,        title: "Pitch Investors",     desc: "Rehearse your pitch, get pre-flight feedback, and step in confident." },
];

const consultantSteps = [
  { icon: UserPlus,       title: "Join Network",     desc: "Create your expert profile and describe your domain and mentorship style." },
  { icon: ClipboardCheck, title: "Expert Form",      desc: "Fill in credentials and areas you love advising — better detail, better matches." },
  { icon: ShieldCheck,    title: "Get Verified",     desc: "We review your profile for quality. Approvals typically within 48 hours." },
  { icon: GitBranch,      title: "Get Matched",      desc: "Ideas are routed by domain fit, availability, and your past performance." },
  { icon: MessageSquare,  title: "Mentor & Review",  desc: "Provide structured feedback. Build reputation and earn rewards." },
  { icon: BookOpen,       title: "Library Access",   desc: "Tap into case studies, frameworks, and tools for advisors at every level." },
];

// Reusable rocket SVG component
const RocketIcon = ({ flip = false }: { flip?: boolean }) => (
  <motion.div
    className="flex-shrink-0 text-primary"
    animate={{ x: flip ? [0, 7, 0] : [0, -7, 0] }}
    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
  >
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      className={`${flip ? "rotate-[45deg]" : "rotate-[225deg]"}`}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </motion.div>
);

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState<"ideator" | "consultant">("ideator");
  const steps = activeTab === "ideator" ? ideatorSteps : consultantSteps;

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 md:px-10 relative z-10 section-bg-a">
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
        <div className="flex justify-center mb-16">
          <div className="glass-card rounded-full p-1.5 flex gap-1">
            {(["ideator", "consultant"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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

        {/* ─── TIMELINE ─────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >

            {/* ── HORIZONTAL (md+) ─────────────────────────────────── */}
            <div className="hidden md:block">

              {/* TOP ROW – steps 0, 2, 4 (above the line) */}
              <div className="grid grid-cols-6">
                {steps.map((step, i) => (
                  <div key={`top-${i}`} className="flex flex-col items-center justify-end min-h-[180px]">
                    {i % 2 === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex flex-col items-center w-full px-2"
                      >
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-2xl gradient-primary text-white flex items-center justify-center mb-3 shadow-lg shadow-primary/25">
                          <step.icon className="h-5 w-5" />
                        </div>
                        {/* Step label */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">
                          Step {i + 1}
                        </p>
                        {/* Title */}
                        <h3 className="text-lg font-extrabold text-foreground text-center leading-tight mb-2">
                          {step.title}
                        </h3>
                        {/* Description – always visible */}
                        <p className="text-base text-muted-foreground text-center leading-relaxed">
                          {step.desc}
                        </p>
                        {/* Stem ↓ */}
                        <div className="flex flex-col items-center mt-4">
                          <div className="w-px h-8 bg-gradient-to-b from-primary/30 to-primary/70" />
                          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-primary/70" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* ─── THE LINE ──────────────────────────────────────── */}
              <div className="relative flex items-center select-none py-0.5">
                {/* Left rocket */}
                <RocketIcon flip={false} />
                {/* Arrow left cap */}
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-primary/60 flex-shrink-0 ml-0.5" />

                {/* Line */}
                <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40" />

                {/* Arrow right cap */}
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-primary/60 flex-shrink-0 mr-0.5" />
                {/* Right rocket */}
                <RocketIcon flip={true} />
              </div>

              {/* BOTTOM ROW – steps 1, 3, 5 (below the line) */}
              <div className="grid grid-cols-6">
                {steps.map((step, i) => (
                  <div key={`bot-${i}`} className="flex flex-col items-center justify-start min-h-[180px]">
                    {i % 2 === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex flex-col items-center w-full px-2"
                      >
                        {/* Stem ↑ */}
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-primary/70" />
                          <div className="w-px h-8 bg-gradient-to-b from-primary/70 to-primary/30" />
                        </div>
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-2xl gradient-primary text-white flex items-center justify-center mb-3 shadow-lg shadow-primary/25">
                          <step.icon className="h-5 w-5" />
                        </div>
                        {/* Step label */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">
                          Step {i + 1}
                        </p>
                        {/* Title */}
                        <h3 className="text-lg font-extrabold text-foreground text-center leading-tight mb-2">
                          {step.title}
                        </h3>
                        {/* Description – always visible */}
                        <p className="text-base text-muted-foreground text-center leading-relaxed">
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── VERTICAL / MOBILE ─────────────────────────────────── */}
            <div className="md:hidden relative flex flex-col gap-6">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-px" />
              {steps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={`relative flex items-start ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-[44%] ${isLeft ? "pr-3 text-right" : "pl-3 text-left"}`}>
                      <div className={`w-9 h-9 rounded-xl gradient-primary text-white flex items-center justify-center mb-2 shadow-md ${isLeft ? "ml-auto" : "mr-auto"}`}>
                        <step.icon className="h-4 w-4" />
                      </div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-0.5`}>Step {i + 1}</p>
                      <h3 className="text-xs font-bold text-foreground leading-tight mb-1">{step.title}</h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Centre dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 z-10">
                      <div className="w-3 h-3 rounded-full gradient-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                    </div>

                    <div className="w-[44%]" />
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default HowItWorksSection;
