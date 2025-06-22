"use client"

import { motion } from "framer-motion"
import { Card3D } from "@/components/card-3d"
import { Database, Warehouse, ShoppingCart, Calendar, Target } from "lucide-react"

const timelineData = [
  {
    month: "Months 1-6",
    title: "Data Collection Phase",
    description: "Aggressive data acquisition from multiple sources and partnerships with leading data providers",
    icon: Database,
    color: "from-orange-400 to-red-400",
    details: ["Partner with 100+ data providers", "Collect 10M+ datasets", "Quality assurance protocols"],
  },
  {
    month: "Months 7-12",
    title: "Data Warehouse Integration",
    description: "Building robust data warehouses and establishing partnerships with major cloud providers",
    icon: Warehouse,
    color: "from-blue-400 to-purple-400",
    details: ["Multi-cloud infrastructure", "Advanced data processing", "Real-time data pipelines"],
  },
  {
    month: "Months 13-18",
    title: "Dataset Marketplace Launch",
    description: "Launch the world's largest dataset marketplace with premium and community datasets",
    icon: ShoppingCart,
    color: "from-green-400 to-teal-400",
    details: ["Marketplace platform", "Community features", "Premium dataset tiers"],
  },
]

export default function TimelineSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

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
              Our 18-Month Roadmap
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Building the future of AI datasets through strategic partnerships and cutting-edge infrastructure
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 via-red-400 to-green-400 rounded-full hidden lg:block" />

          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full border-4 border-black shadow-lg shadow-orange-500/50" />

                {/* Content */}
                <div className="flex-1">
                  <Card3D>
                    <div
                      className={`p-8 bg-gradient-to-br ${
                        index === 0
                          ? "from-orange-500/10 to-red-500/10 border-orange-400/30"
                          : index === 1
                            ? "from-blue-500/10 to-purple-500/10 border-blue-400/30"
                            : "from-green-500/10 to-teal-500/10 border-green-400/30"
                      } rounded-2xl border`}
                    >
                      <div className="flex items-center mb-6">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mr-4`}
                        >
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-orange-400 uppercase tracking-wide">
                            {item.month}
                          </span>
                          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        </div>
                      </div>

                      <p className="text-gray-300 text-lg mb-6 leading-relaxed">{item.description}</p>

                      <ul className="space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-gray-400">
                            <Target className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card3D>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card3D>
            <div className="p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl border border-orange-500/20">
              <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Join Our Journey</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Be part of the revolution as we build the world's most comprehensive dataset ecosystem. Early adopters
                get exclusive access to premium datasets and advanced features.
              </p>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  )
}
