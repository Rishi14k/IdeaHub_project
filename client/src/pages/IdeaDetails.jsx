import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Award, User } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import IdeaLikeButton from "../components/IdeaLikeButton";

const IdeaDetails = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();



  const fetchIdea = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/idea/${id}`);
      const data = await response.json();
      setIdea(data);
    } catch (error) {
      toast.error("Something went wrong while fetching the idea details.");
      console.error("Error fetching idea details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIdea();
  }, [id]);

  const handleComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to comment!");
      navigate("/login");
      return;
    }
    if (!comment.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/comment/${id}/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text: comment }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      await fetchIdea();

      setComment("");
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.error("Something went wrong while posting the comment.");
      console.error("Error posting comment:", error);
    }
  };

  if (loading || !idea) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white/5 p-6 mt-20 rounded-xl border border-purple-700 min-h-[600px]"
      >
        {/* Title & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-4"
        >
          <h1 className="text-3xl font-bold text-purple-300">{idea.title}</h1>
          <div className="flex items-center gap-4">
        
            <IdeaLikeButton ideaId={idea._id} initialLikes={idea.like} />

            {idea.badgeWinner && (
              <span className="flex items-center gap-1 text-yellow-400">
                <Award className="w-5 h-5" /> Winner
              </span>
            )}
          
            
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-gray-300 mb-6"
        >
          {idea.description}
        </motion.p>

        {/* Posted By */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <User className="w-6 h-6 text-purple-400" />
          <span className="text-gray-300">
            Posted by <strong>{idea.createdBy?.name || "Anonymous"}</strong>
          </span>
          {idea.category && (
              <div>
                <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-xs">
                  {idea.category}
                </span>
              </div>
            )}
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="bg-gray-800 p-4 rounded-lg max-h-64 overflow-y-auto mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Comments</h3>
          {idea.comment && idea.comment.length > 0 ? (
            idea.comment.map((c) => (
              <div key={c._id} className="mb-3">
                <p className="text-sm text-gray-200">
                  <strong>{c.postedBy ? c.postedBy.name : "Unknown"}</strong>:{" "}
                  {c.text}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </motion.div>

        {/* Add Comment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6"
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleComment}
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Send
          </button>
        </motion.div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Share this Idea:</h2>
          <div className="flex gap-3">
            <FacebookShareButton url={window.location.href} quote={idea.title}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href} title={idea.title}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <LinkedinShareButton url={window.location.href} title={idea.title}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <WhatsappShareButton
              url={window.location.href}
              title={idea.title}
              separator=" - "
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={window.location.href}
              subject={idea.title}
              body="Check out this Idea: "
            >
              <EmailIcon size={40} round />
            </EmailShareButton>
          </div>
        </div>
        {/* Collab Button or Manage Requests */}
        {/* <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.35 }}
>
{currentUserId === idea.createdBy._id ? (
  // Render pending collaboration requests for the creator
  <div className="mt-4">
    <h4 className="text-white mb-2">
      Pending Collaboration Requests
    </h4>
    <div className="flex gap-4">
      {idea.collaborationRequests.map((userId) => (
        <div key={userId} className="flex items-center gap-2">
          <h4></h4>
          <button
            onClick={() => acceptRequest(userId,id)}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={() => rejectRequest(userId,id)}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  </div>
) : (
  // Render a button for non-creators to send a request
  <button
    onClick={() => sendRequest(currentUserId,id)}
    className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 transition"
  >
    Request Collaboration
  </button>
)}

</motion.div> */}
      </motion.div>
    </div>
  );
};

export default IdeaDetails;
