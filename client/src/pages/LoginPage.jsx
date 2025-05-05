import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api";
import toast from "react-hot-toast";

const Login = () => {

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");
    try {
      const response = await login(formData);
      if(response.token){
        localStorage.setItem("token", response.token);
        toast.success("Login Successful!")
        navigate("/");
      }
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Try again.");
      setError("Login failed. Try again.");
    } 
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="bg-white/5 p-8 rounded-xl w-full max-w-md border border-purple-700 shadow-lg backdrop-blur-md">
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-purple-200">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full mt-1 p-2 rounded bg-black text-white border border-gray-600" required/>
          </div>
          <div>
            <label className="text-sm text-purple-200">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" className="w-full mt-1 p-2 rounded bg-black text-white border border-gray-600" required/>
          </div>
          <button type="submit" className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 transition text-white font-semibold">Login</button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
