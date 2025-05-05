import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <>
        <motion.section 
        className="text-center py-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 mt-40 ">
          Share Your <span className="text-purple-400">Ideas</span>, <br /> Find Collaborators & Win <span className="text-yellow-400">Badges</span>
        </h2>
        <p className="max-w-xl mx-auto text-lg text-gray-300 mb-10">
          A creative platform where innovators post, connect, and grow ideas together. Weekly badges for the most liked ideas!
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/create" className="inline-flex items-center bg-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition">
            Start Creating <ArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.section>
    </>
  )
}

export default Hero