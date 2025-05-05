import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token")); // Replace with your auth logic
  const handleLogout = ()=>{
    localStorage.removeItem("token"); // Replace with your logout logic
    setIsLoggedIn(false);
    navigate("/login")
  }


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/ideas" },
    { name: "Create", path: "/create" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-extrabold">
         
          <img src={logo} alt="IdeaHub" className="w-[200px] h-[120px]"/>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-white hover:text-purple-400 font-medium transition"
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="text-white border border-purple-400 px-4 py-1 rounded-lg hover:bg-purple-500 transition"
            >
              Profile
            </Link>
            <button onClick={handleLogout} className="text-white border border-purple-400 px-4 py-1 rounded-lg hover:bg-purple-500 transition">Logout</button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/80 px-6 py-4 space-y-4 text-white"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-lg border-b border-white/10 pb-2"
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
             <div className="flex flex-col gap-4">
               <Link
                to="/profile"
                className="block bg-purple-600 text-center py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                 onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                to="/profile"
                className="block w-full  bg-purple-600 text-center py-2 rounded-lg"
               
              >
                Logout
              </button>
             </div>
            ) : (
              <Link
                to="/login"
                className="block bg-purple-600 text-center py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Login / Register
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
