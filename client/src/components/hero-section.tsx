"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/dashboard")
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
      {/* Enhanced background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      <div className="text-center max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <img
              src="/cork-logo.png"
              alt="Cork Logo"
              className="w-24 h-24 mx-auto rounded-2xl shadow-2xl shadow-orange-500/50"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="absolute -inset-4 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-3xl blur-xl"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8"
        >
          <span className="block bg-gradient-to-r from-white via-orange-100 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl">
            {"Let's Save"}
          </span>
          <motion.span
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="block bg-gradient-to-r from-orange-400 via-red-400 via-orange-500 to-orange-400 bg-clip-text text-transparent bg-[length:200%_100%] drop-shadow-2xl"
            style={{
              textShadow: "0 0 40px rgba(251, 146, 60, 0.5)",
            }}
          >
            Some Time
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center mb-12 text-xl md:text-2xl text-gray-300"
        >
          <span>Skip The Code</span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="mx-4"
          >
            <ArrowRight className="w-8 h-8 text-orange-400" />
          </motion.div>
          <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
            Keep The Power
          </span>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Train powerful AI models without writing a single line of code. Cork makes machine learning accessible to
          everyone with our intuitive no-code platform.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Enhanced Get Started Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
            {/* Animated background glow */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />

            <Button
              size="lg"
              onClick={handleGetStarted}
              className="relative bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-black font-bold px-10 py-5 text-lg rounded-full shadow-2xl shadow-orange-500/50 border-0 overflow-hidden group"
            >
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <Sparkles className="mr-2 w-5 h-5 group-hover:animate-spin" />
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>

              {/* Animated shine effect */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />

              {/* Hover particles */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: "50%",
                    }}
                  />
                ))}
              </motion.div>
            </Button>
          </motion.div>

          {/* Enhanced Watch Demo Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
            <Button
              variant="outline"
              size="lg"
              className="relative bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black px-8 py-5 text-lg rounded-full shadow-lg shadow-orange-500/20 overflow-hidden group transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="mr-2 w-5 h-5 group-hover:text-black transition-colors" />
                Watch Demo
              </span>

              {/* Hover fill effect */}
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
