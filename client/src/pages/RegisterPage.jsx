import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/api";
import toast from "react-hot-toast";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await register(formData)
      toast.success("Registration Successful! Please log in.")
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message || "Registration failed. Try again.");
      setError("Registration failed. Try again.");
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="bg-white/5 p-8 rounded-xl w-full max-w-md border border-purple-700 shadow-lg backdrop-blur-md ">
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-6">Join IdeaHub</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5 mb-6">
          <div>
            <label className="text-sm text-purple-200">Full Name</label>
            <input type="text" placeholder="xyz ab" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-black text-white border border-gray-600" required/>
          </div>
          <div>
            <label className="text-sm text-purple-200">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full mt-1 p-2 rounded bg-black text-white border border-gray-600" required/>
          </div>
          <div>
            <label className="text-sm text-purple-200">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" className="w-full mt-1 p-2 rounded bg-black text-white border border-gray-600" />
          </div>
          <button type="submit" className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 transition text-white font-semibold">Create Account</button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
