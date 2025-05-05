import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { createIdea } from '../api/api';

const CreateIdea = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("AI");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");
    if(!title || !description){
      setError("Title and description are required");
      return;
    }
    const token = localStorage.getItem("token");
    if(!token){
      toast.error("You need to be logged in to create an idea");
      return;
    }

    try {
      await createIdea({title,description,category},token);
      toast.success("Idea created successfully!");
      navigate("/ideas");
    } catch (error) {
      toast.error("Failed to create idea. Try again.");
      console.error("Error creating idea:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/5 border border-purple-700 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-300">Submit Your Idea</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full italic px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              placeholder="Enter idea title"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full italic px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              placeholder="Write about your idea"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 italic py-2 rounded bg-gray-800 text-white focus:outline-none"
            >
              <option value="AI">AI</option>
              <option value="Web">Web</option>
              <option value="Mobile">Mobile</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 transition w-full"
          >
            Submit Idea
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateIdea;

