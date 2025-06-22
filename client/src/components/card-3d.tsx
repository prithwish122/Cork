"use client"

import { motion } from "framer-motion"
import { div } from "framer-motion/client"
import type { ReactNode } from "react"

interface Card3DProps {
  children: ReactNode
  className?: string
}

export function Card3D({ children, className = "" }: Card3DProps) {
  return (
    <motion.div
      whileHover={{
        rotateX: 8,
        rotateY: 8,
        scale: 1.05,
        z: 50,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={`perspective-1000 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-orange-500/20 rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 relative overflow-hidden"
        whileHover={{
          boxShadow: "0 35px 80px -15px rgba(251, 146, 60, 0.4)",
          borderColor: "rgba(251, 146, 60, 0.5)",
        }}
      >
        {/* Animated border gradient */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 rounded-2xl opacity-20 blur-sm"
        />
        <div className="relative bg-gray-900/95 rounded-2xl">{children}</div>
      </motion.div>
    </motion.div>
  )
}
