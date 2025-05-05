import React, { useEffect, useState } from "react";
import { Award, Heart, User, Edit } from "lucide-react";
import { motion } from "framer-motion";
import {jwtDecode} from "jwt-decode";


// Dummy user data
// const user = {
//   name: "Rishi Kothari",
//   email: "rishi@example.com",
//   avatar: "", // Use default or actual avatar
//   bio: "Passionate full-stack developer. I love solving real-world problems using code.",
//   totalIdeas: 4,
//   totalLikes: 123,
//   badges: 2,
//   ideas: [
//     {
//       id: 1,
//       title: "AI Study Buddy",
//       likes: 42,
//       badgeWinner: true,
//     },
//     {
//       id: 2,
//       title: "Collab Finder",
//       likes: 27,
//       badgeWinner: false,
//     },
//     {
//       id: 3,
//       title: "EduConnect Portal",
//       likes: 31,
//       badgeWinner: true,
//     },
//     {
//       id: 4,
//       title: "Freelance Match",
//       likes: 23,
//       badgeWinner: false,
//     },
//   ],
// };

const Profile = () => {
  const [ideas,setIdeas] = useState([]);
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      const decoded = jwtDecode(token);

      setUser({
        name:decoded.name,
        email:decoded.email,
        id:decoded.id,
      })
    }
    const fetchIdeas = async()=>{
      try {
        const response = await fetch("http://localhost:5000/api/idea");
      const data = await response.json();
      setIdeas(data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    }

    fetchIdeas()
  },[])

  const userIdeas = ideas.filter(
    (idea) => idea.createdBy?._id?.toString() === user.id
  );
  
  if (!user) {
    return <div className="text-center text-white pt-20">Loading profile...</div>;
  }


  
  return (
    <div className="min-h-screen  bg-gray-950 text-white px-6 py-20">
      <div className="max-w-5xl mt-20 mx-auto">
        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-purple-700 rounded-xl p-6 flex items-center gap-6 mb-10"
        >
          <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-xl font-bold">
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-purple-300">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="mt-2 text-gray-300">"Passionate about innovation — working on my dream startup idea."</p>
          </div>
          {/* <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-1">
            <Edit className="w-4 h-4" /> Edit Profile
          </button> */}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10 text-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-300">{userIdeas.length}</p>
            <p className="text-gray-400 text-sm">Ideas Posted</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-400">{userIdeas.reduce((total,idea)=>total + idea.like.length,0)}</p>
            <p className="text-gray-400 text-sm">Total Likes</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-300">{userIdeas.filter((idea)=>idea.badgeWinner).length}</p>
            <p className="text-gray-400 text-sm">Badges Won</p>
          </div>
        </div>

        {/* Posted Ideas */}
        <div className="grid md:grid-cols-2 gap-6">
  {userIdeas.length > 0 ? (
    userIdeas.map((idea) => (
      <div
        key={idea._id}
        className="bg-white/5 border border-purple-700 rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-white">{idea.title}</h4>
          {idea.badgeWinner && (
            <span className="text-yellow-400 flex items-center gap-1 text-sm">
              <Award className="w-4 h-4" /> Winner
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Heart className="w-4 h-4 text-red-500" /> {idea.like.length} Likes
          {idea.badgeWinner && (
            <span className="flex items-center gap-2 text-yellow-400">
              <Award className="w-5 h-5" /> Winner
            </span>
          )}
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400 col-span-2 text-center">
      You haven't posted any ideas yet.
    </p>
  )}
</div>

      </div>
    </div>
  );
};

export default Profile;
