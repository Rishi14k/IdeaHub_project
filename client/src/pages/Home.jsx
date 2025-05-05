import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IdeaLikeButton from "../components/IdeaLikeButton";
import Hero from "../components/Hero";
import TopIdeas from "../components/TopIdeas";
import HowItWork from "../components/HowItWork";

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch("https://ideahub-project.onrender.com/api/idea");
        const data = await response.json();
        setIdeas(data);
      } catch (error) {
        console.log("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const topIdeas = [...ideas]
    .sort((a, b) => b.like.length - a.like.length)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Ideas Section */}
      <TopIdeas topIdeas={topIdeas} loading={loading} />

      {/* How It Works Section */}
      <HowItWork />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70" />
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24 px-6 text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Got a <span className="text-purple-400">Great Idea</span>?{" "}
            <br className="hidden md:block" />
            Start <span className="text-yellow-400">Finding value Now</span>.
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Turn your vision into reality with the perfect team. Share your
            idea, get values, and build something amazing.
          </p>
          <Link
            to="/collaborate"
            className="inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-full text-lg font-medium"
          >
            Get Value
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
