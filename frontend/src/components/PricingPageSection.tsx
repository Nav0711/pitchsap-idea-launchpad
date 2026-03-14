import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"
import { ChevronDown, BadgeCheck, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import NumberFlow from "@number-flow/react"

const FREQUENCIES = ["monthly", "yearly"]

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: { monthly: "Free", yearly: "Free" },
    description: "For first-time founders exploring ideas",
    features: [
      "1 idea submission",
      "Basic AI review",
      "Community feedback",
      "Public profile",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Founder",
    price: { monthly: 99, yearly: 999 },
    description: "For serious ideators validating their startup",
    features: [
      "Unlimited idea submissions",
      "Advanced AI analysis",
      "Expert mentor matching",
      "Pitch deck builder",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Growth",
    price: { monthly: 119, yearly: 1199 },
    description: "For teams and scaling startups",
    features: [
      "Everything in Founder",
      "Team collaboration (5 seats)",
      "Investor connect",
      "Custom report exports",
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "For accelerators and venture studios",
    features: [
      "Everything in Growth",
      "Unlimited seats",
      "White-label options",
      "API access",
      "Custom integrations",
    ],
    cta: "Contact Us",
    highlighted: true,
  },
]

/* ── Compact mobile accordion card ─────────────────────────────────── */
const MobilePricingCard = ({
  tier,
  paymentFrequency,
}: {
  tier: PricingTier
  paymentFrequency: string
}) => {
  const [open, setOpen] = React.useState(false)
  const price = tier.price[paymentFrequency]

  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-xl bg-white/10 dark:bg-white/5 ring-1 ring-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.07)] overflow-hidden transition-all duration-300",
        tier.popular
          ? "border-primary/50 shadow-[0_0_18px_rgba(139,92,246,0.18)]"
          : "border-white/20 dark:border-white/10",
        tier.highlighted && "border-primary/60"
      )}
    >
      {/* Header row – always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 gap-3"
      >
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-sm text-foreground">{tier.name}</span>
          {tier.popular && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Popular
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right">
            {typeof price === "number" ? (
              <NumberFlow
                value={price}
                format={{ style: "currency", currency: "INR", minimumFractionDigits: 0 }}
                className="text-lg font-extrabold text-foreground"
              />
            ) : (
              <span className="text-lg font-extrabold text-foreground">{price}</span>
            )}
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 flex flex-col gap-3 border-t border-white/10">
              <p className="text-xs text-muted-foreground">{tier.description}</p>
              <ul className="space-y-1.5">
                {tier.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-foreground">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  "w-full rounded-xl font-bold text-sm h-9 flex items-center justify-center gap-1.5 transition-all",
                  tier.highlighted || tier.popular
                    ? "gradient-primary text-white hover:scale-[1.02]"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {tier.cta} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────────────── */
const PricingPageSection = () => {
  const [selectedFrequency, setSelectedFrequency] = React.useState(FREQUENCIES[0])

  return (
    <section id="pricing" className="section-bg-b py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your startup journey. Upgrade anytime.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center rounded-full bg-muted p-1">
            {FREQUENCIES.map((freq) => (
              <Tab
                key={freq}
                text={freq}
                selected={selectedFrequency === freq}
                setSelected={setSelectedFrequency}
                discount={freq === "yearly"}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 4-col grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} paymentFrequency={selectedFrequency} />
          ))}
        </motion.div>

        {/* ── MOBILE: liquid glass accordion cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="sm:hidden flex flex-col gap-3"
        >
          {TIERS.map((tier) => (
            <MobilePricingCard key={tier.name} tier={tier} paymentFrequency={selectedFrequency} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PricingPageSection
