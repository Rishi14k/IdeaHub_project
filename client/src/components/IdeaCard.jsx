import React from 'react';
import { Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import IdeaLikeButton from './IdeaLikeButton';

const IdeaCard = ({ idea }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 p-5 rounded-xl border border-purple-700 hover:shadow-lg transition flex flex-col justify-between min-h-[300px] max-h-[350px] w-full"
    >
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl text-purple-300 mb-2 font-bold">{idea.title}</h3>
          <p className="text-lg mt-5 text-gray-300 mb-4 line-clamp-3 "><i>{idea.description}</i></p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mt-auto mb-4">
          <div className="flex items-center gap-2">
            <IdeaLikeButton ideaId={idea._id} initialLikes={idea.like}/>
            <span className='bg-purple-700 text-white px-3 py-1 rounded-full text-xs'>{idea.category}</span>
            
          </div>

          {idea.badgeWinner && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Award className="w-4 h-4" /> Badge
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto flex justify-between pt-2 border-t border-gray-700">
        <button onClick={()=> navigate(`/ideas/${idea._id}`)} className="text-sm bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition">
          View Details
        </button>
        <button onClick={()=> navigate(`/ideas/${idea._id}`)} className="text-sm bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 transition">
          Share Now
        </button>
      </div>
    </motion.div>
  );
};

export default IdeaCard;
