"use client"

import { motion } from "framer-motion"
import { Card3D } from "@/components/card-3d"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for individuals and small projects",
    features: ["5 AI models per month", "10GB data storage", "Basic model templates", "Email support", "API access"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing teams and businesses",
    features: [
      "25 AI models per month",
      "100GB data storage",
      "Advanced model templates",
      "Priority support",
      "API access",
      "Team collaboration",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited AI models",
      "Unlimited data storage",
      "Custom model development",
      "24/7 dedicated support",
      "Full API access",
      "Advanced team features",
      "Custom integrations",
      "On-premise deployment",
    ],
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section className="py-32 px-6 relative" id="pricing">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
              Simple Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your AI journey. All plans include our core features with no hidden fees.
          </p>
        </motion.div>

        {/* Enhanced pricing cards with better popular badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-red-400 text-black px-6 py-3 rounded-full text-sm font-bold flex items-center shadow-lg shadow-orange-500/50">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              <Card3D>
                <div
                  className={`p-8 h-full ${
                    plan.popular
                      ? "bg-gradient-to-b from-orange-500/20 to-red-500/20 border-orange-400/60"
                      : "bg-gray-900/60"
                  } rounded-2xl border border-gray-700/50 relative overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-2xl" />
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-auto">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-black"
                          : "bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </motion.div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <p className="text-sm text-gray-500">
            Need a custom solution?{" "}
            <span className="text-orange-400 cursor-pointer hover:underline">Contact our sales team</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
