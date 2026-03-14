"use client"

import * as React from "react"
import { BadgeCheck, ArrowRight } from "lucide-react"
import NumberFlow from "@number-flow/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface PricingTier {
  name: string
  price: Record<string, number | string>
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  popular?: boolean
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency]
  const isHighlighted = tier.highlighted
  const isPopular = tier.popular

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-6 rounded-2xl border p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1",
        isHighlighted
          ? "border-primary bg-primary/[0.03] dark:bg-primary/[0.08] shadow-lg"
          : "border-border bg-card",
        isPopular && "border-primary/50 shadow-md"
      )}
    >
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-foreground">{tier.name}</span>
        {isPopular && (
          <Badge className="z-10 bg-primary text-primary-foreground border-0">
            🔥 Most Popular
          </Badge>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        {typeof price === "number" ? (
          <>
            <NumberFlow
              value={price}
              format={{ style: "currency", currency: "USD", minimumFractionDigits: 0 }}
              className="text-4xl font-bold text-foreground"
            />
            <span className="text-sm text-muted-foreground ml-1">
              Per month/user
            </span>
          </>
        ) : (
          <span className="text-4xl font-bold text-foreground">{price}</span>
        )}
      </div>

      <div className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground">{tier.description}</p>
        <ul className="space-y-2.5">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2.5 text-sm text-foreground">
              <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        className={cn(
          "w-full rounded-xl font-semibold transition-all",
          isHighlighted || isPopular
            ? "gradient-primary text-primary-foreground hover:scale-[1.02]"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        {tier.cta}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </Card>
  )
}

const HighlightedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
    <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-primary/5 blur-3xl" />
  </div>
)

const PopularBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
    <div className="absolute -top-1/3 -left-1/3 h-2/3 w-2/3 rounded-full bg-primary/8 blur-3xl" />
  </div>
)
