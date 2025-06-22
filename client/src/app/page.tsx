"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import WhyUsSection from "@/components/why-us-section"
import FeaturesSection from "@/components/features-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"
import BackgroundAnimation from "@/components/background-animation"
import TimelineSection from "@/components/timeline-section"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <BackgroundAnimation />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Header />
            <HeroSection />
            <WhyUsSection />
            <TimelineSection />
            <FeaturesSection />
            <PricingSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
