"use client"

import { motion } from "framer-motion"
import { Search, Settings, Plus, ArrowUpRight, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  const statsData = [
    { value: "5", label: "Projects" },
    { value: "5 days", label: "Login Streak" },
    { value: "22%", label: "Contributor" },
  ]

  const navigationTabs = ["Community", "Create", "Data Bank"]
  const filterOptions = ["Filters", "Option", "Option", "Option", "Option", "Option", "Option", "Option"]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />

      {/* Blur overlays for depth and readability */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 backdrop-blur-[0.5px]" />

      {/* Additional subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />

      {/* Main content */}
      <div className="relative z-10 p-6 h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-orange-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                className="pl-10 bg-transparent border-orange-400/50 text-white placeholder:text-gray-400 w-64 rounded-full"
                placeholder="Search..."
              />
            </div>
            <motion.div
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </motion.header>

        {/* Welcome Section */}
        <div className="flex-1 flex items-center justify-between">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">WELCOME</h1>
              <motion.h2
                className="text-4xl md:text-6xl font-light italic text-white/90"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Chandreyee!
              </motion.h2>
            </motion.div>

            {/* Action Icons */}
            <motion.div
              className="flex gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[Settings, Plus, ArrowUpRight].map((Icon, index) => (
                <motion.button
                  key={index}
                  className="w-12 h-12 rounded-full border border-orange-400/50 flex items-center justify-center text-orange-400 hover:bg-orange-400/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Stats Cards */}
          <motion.div
            className="flex gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="w-32 h-32 rounded-full border border-orange-400/30 flex flex-col items-center justify-center text-center backdrop-blur-sm bg-black/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "rgb(251 146 60 / 0.6)" }}
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex justify-center gap-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {navigationTabs.map((tab, index) => (
            <motion.button
              key={tab}
              className={`text-lg font-medium transition-colors relative ${
                index === 0 ? "text-white" : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {tab}
              {index === 0 && (
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-400"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Filter Options */}
        <motion.div
          className="flex gap-4 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {filterOptions.map((option, index) => (
            <motion.button
              key={index}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                index === 0
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-transparent border border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.1 + index * 0.05 }}
            >
              {option}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
