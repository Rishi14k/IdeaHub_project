import React from 'react'
import { motion } from "framer-motion";

const HowItWork = () => {
  return (
    <>
        <section className="bg-black py-20 px-6">
  <motion.h3 
    className="text-3xl font-bold text-center text-white mb-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    How It Works
  </motion.h3>

  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
    {[
      {
        title: "1. Post Your Idea",
        desc: "Write down your unique idea with a description and let the world know.",
        icon: "💡",
      },
      {
        title: "2. Comment & Like",
        desc: "Get feedback, likes, and team up with other innovators.",
        icon: "🤝",
      },
      {
        title: "3. Win a Badge!",
        desc: "Every week, the top ideas are automatically awarded a badge.",
        icon: "🏆",
      },
    ].map((step, index) => (
      <motion.div
        key={index}
        className="bg-white/5 p-6 mb-20 rounded-xl border border-gray-700 text-center hover:shadow-lg hover:scale-105 transition"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-5xl mb-4">{step.icon}</div>
        <h4 className="text-xl font-semibold text-purple-300 mb-2">{step.title}</h4>
        <p className="text-gray-300 text-sm">{step.desc}</p>
      </motion.div>
    ))}
  </div>
</section>
    </>
  )
}

export default HowItWork