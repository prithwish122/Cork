"use client"

import { motion } from "framer-motion"
import { Card3D } from "@/components/card-3d"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"

const walkthrough = [
  {
    step: "01",
    title: "Upload Your Data",
    description:
      "Simply drag and drop your dataset or connect to your data sources. We support CSV, JSON, databases, and APIs.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    step: "02",
    title: "Choose Your Model",
    description:
      "Select from our library of pre-built models or let our AI recommend the best approach for your use case.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    step: "03",
    title: "Train & Optimize",
    description:
      "Watch as your model trains in real-time. Our platform automatically optimizes for the best performance.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    step: "04",
    title: "Deploy & Scale",
    description:
      "Deploy your model with one click and scale automatically based on demand. Monitor performance in real-time.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Get from data to deployed AI model in just four simple steps. No coding experience required.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Full Demo
            </Button>
          </motion.div>
        </motion.div>

        <div className="space-y-20">
          {walkthrough.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
            >
              <div className="flex-1">
                <Card3D>
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card3D>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
                </div>

                <h3 className="text-4xl font-bold text-white mb-4">{item.title}</h3>

                <p className="text-xl text-gray-400 leading-relaxed mb-6">{item.description}</p>

                <motion.div whileHover={{ x: 10 }} className="flex items-center text-orange-400 cursor-pointer">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
