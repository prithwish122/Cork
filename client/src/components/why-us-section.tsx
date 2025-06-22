"use client"

import { motion } from "framer-motion"
import { Card3D } from "@/components/card-3d"
import { Brain, Zap, Shield, Users, Rocket, Code, Download, MousePointer, Database, Globe } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced machine learning algorithms that adapt to your data and requirements.",
    color: "from-blue-400 to-purple-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Train models in minutes, not hours. Our optimized infrastructure ensures rapid results.",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and compliance certifications.",
    color: "from-green-400 to-teal-400",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time collaboration and version control.",
    color: "from-pink-400 to-red-400",
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    description: "Deploy your trained models instantly with our automated deployment pipeline.",
    color: "from-indigo-400 to-blue-400",
  },
  {
    icon: Code,
    title: "No Code Required",
    description: "Build sophisticated AI models without writing a single line of code.",
    color: "from-purple-400 to-pink-400",
  },
]

export default function WhyUsSection() {
  return (
    <section className="py-32 px-6 relative">
      {/* Section background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block mb-6"
          >
            <img src="/cork-logo.png" alt="Cork Logo" className="w-16 h-16 rounded-xl shadow-lg shadow-orange-500/30" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
              Why Choose Cork?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing how teams build and deploy AI models. Here's what makes us different from the
            competition.
          </p>
        </motion.div>

        {/* Main Description Container */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card3D>
            <div className="p-12 text-center bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-2xl border border-orange-500/20">
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                    <MousePointer className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                No-Code Model Training Revolution
              </h3>

              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Our app is a revolutionary{" "}
                <span className="text-orange-400 font-semibold">no-code model training tool</span> where you can train
                your AI models with zero coding required. Simply use our intuitive click-based interface to build,
                train, and deploy sophisticated machine learning models. Once your model is ready, you can{" "}
                <span className="text-orange-400 font-semibold">download it instantly</span> and integrate it into your
                applications.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <MousePointer className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Click & Build</h4>
                  <p className="text-gray-400">Intuitive drag-and-drop interface</p>
                </div>
                <div className="text-center">
                  <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">AI Training</h4>
                  <p className="text-gray-400">Advanced model training algorithms</p>
                </div>
                <div className="text-center">
                  <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Instant Download</h4>
                  <p className="text-gray-400">Ready-to-use trained models</p>
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card3D>
                <div className="p-8 h-full">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>

                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card3D>
            <div className="p-12 text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Globe className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Coming Soon: Dataset World
              </h3>

              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                We're building the{" "}
                <span className="text-purple-400 font-semibold">world's largest dataset ecosystem</span>. Our upcoming
                Dataset World will be a comprehensive platform where data scientists, researchers, and AI enthusiasts
                can access, share, and collaborate on high-quality datasets from every domain imaginable.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="text-left">
                  <Database className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Massive Scale</h4>
                  <p className="text-gray-400">Millions of curated datasets across all industries and use cases</p>
                </div>
                <div className="text-left">
                  <Users className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Global Community</h4>
                  <p className="text-gray-400">Connect with data contributors and AI researchers worldwide</p>
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  )
}
