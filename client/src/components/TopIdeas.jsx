import React from 'react'
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import IdeaLikeButton from './IdeaLikeButton';
import { useNavigate } from 'react-router-dom';
const TopIdeas = ({topIdeas,loading}) => {
    const navigate = useNavigate();
  return (
    <>
         <section className="bg-gray-950 py-16 px-6">
      <h3 className="text-3xl font-semibold text-center mb-10">Top Like-Winning Ideas</h3>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {loading ? (
      [...Array(3)].map((_, index) => (
    <div
      key={index}
      className="bg-white/5 p-6 rounded-xl border border-purple-800 animate-pulse"
    >
      <div className="h-4 bg-purple-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-5/6 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  ))
) : (
   topIdeas.map((idea) => (
            <motion.div
              key={idea._id}
              className="bg-white/5 p-6 rounded-xl border border-purple-800 hover:scale-105 transition"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idea * 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-2 text-purple-300">Idea Title: {idea.title}</h4>
              <p className="text-gray-300 text-sm">{idea.description}</p>
              {/* <div className="mt-4 text-sm flex items-center gap-2 text-yellow-400"><span><Heart className="w-5 h-5" /></span> {idea.like.length} likes</div> */}
              <div className="mt-4 text-sm gap-3 flex items-center"><IdeaLikeButton ideaId={idea._id} initialLikes={idea.like}/><span className="bg-purple-700 text-white px-3 py-1 rounded-full text-xs">{idea.category}</span></div>
              
              {idea.badgeWinner && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Award className="w-4 h-4" /> Badge
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-gray-700 mt-5">
        <button onClick={()=> navigate(`/ideas/${idea._id}`)} className="text-sm bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition">
          View Details
        </button>
        </div>
            </motion.div>
          ))
)}

</div>

      </section>
    </>
  )
}

export default TopIdeas