"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { UserButton } from "@civic/auth/react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-4xl px-6"
    >
      {/* Main Navigation Container */}
      <motion.div whileHover={{ scale: 1.02 }} className="relative w-full max-w-3xl mx-auto">
        {/* Animated background glow */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -inset-1 bg-gradient-to-r from-orange-400/30 via-red-400/30 to-orange-400/30 rounded-full blur-lg"
        />

        {/* Main navbar */}
        <div className="relative bg-black/80 backdrop-blur-xl border border-orange-500/30 rounded-full px-8 py-3 shadow-2xl shadow-orange-500/20">
          <div className="flex items-center justify-between">
            {/* Logo - Left Side */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 flex-shrink-0">
              <div className="relative">
                <img
                  src="/cork-logo.png"
                  alt="Cork Logo"
                  className="w-10 h-10 rounded-lg shadow-lg shadow-orange-500/30"
                />
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg blur-sm"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                CORK
              </span>
            </motion.div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
              {["Features", "Pricing", "About", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{
                    scale: 1.1,
                    color: "#fb923c",
                    textShadow: "0 0 8px rgba(251, 146, 60, 0.8)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium relative"
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Login Button - Right Side */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block flex-shrink-0"
            >
              {/* <Button > */}
                <UserButton className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-black font-semibold px-6 py-2 rounded-full shadow-lg shadow-orange-500/30 border-0" />
              {/* </Button> */}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-orange-400 p-2 flex-shrink-0"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -20,
            scale: isMenuOpen ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className={`md:hidden absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-4 shadow-2xl shadow-orange-500/20 ${
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="space-y-4">
            {["Features", "Pricing", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ x: 10, color: "#fb923c" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1 }}
                className="block text-gray-300 hover:text-orange-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.4 }}
              className="pt-4 border-t border-orange-500/20"
            >
              <Button className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-black font-semibold rounded-full">
                Login
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}
