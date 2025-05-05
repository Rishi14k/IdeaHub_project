  import React, { useState } from 'react'
  import axios from 'axios'
  import { Heart } from 'lucide-react';
  import { toast } from 'react-hot-toast';
  import { useNavigate } from 'react-router-dom';

  const IdeaLikeButton = ({ideaId,initialLikes}) => {
      const [likeCount,setLikeCount] = useState(initialLikes.length);
      const [liked,setLiked] = useState(() => {
        const token = localStorage.getItem("token");
        const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const userId = payload?.id;
        return initialLikes.includes(userId);
      });
      const navigate = useNavigate();

      const handleLikeToggle = async () => {
          try {
              const token = localStorage.getItem("token");
            if(!token){
              toast.error("You must be logged in to like!");
              navigate("/login");
               return;
            }
              await axios.patch(`https://ideahub-project.onrender.com/api/idea/${ideaId}/toggle-like`,{},{headers:{Authorization:`Bearer ${token}`}})
              if (liked) {
                  setLikeCount(likeCount - 1);
                } else {
                  setLikeCount(likeCount + 1);
                }
          
                setLiked(!liked);
          } catch (error) {
        console.error("Failed to toggle like:", error);
          }
      }
    return (
      <button onClick={handleLikeToggle} className="flex items-center gap-1 text-yellow-500">
       <Heart 
        className="w-5 h-5 transition-all duration-200"
        fill={liked ? "#facc15" : "none"}  // Yellow fill when liked
        stroke={liked ? "#facc15" : "currentColor"} // Yellow stroke when liked
      />
      {likeCount}
    </button>
    )
  }

  export default IdeaLikeButton
