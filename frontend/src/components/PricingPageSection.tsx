import * as React from "react"
import { motion } from "framer-motion"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} paymentFrequency={selectedFrequency} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PricingPageSection
