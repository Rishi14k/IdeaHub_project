const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "All fields are mandatory" });
    }

    const exstingEmail = await User.findOne({ email });

    if (exstingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const bPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: bPassword });
    return res.status(201).json({ message: "Register successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error in internal server" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email doen't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id,name:user.name,email:user.email }, process.env.SCRATE_KEY, {
      expiresIn: "3650d",
    });

    return res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    return res.status(400).json({ message: "Error in internal server" });
  }
};

module.exports = {
  register,
  login,
};
