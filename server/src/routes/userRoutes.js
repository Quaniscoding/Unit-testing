// routes/userRoutes.js
// Test API endpoints to ensure output is as expected.
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Định nghĩa route POST /auth/register
router.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({
      message: "Registration successful",
      user: {
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Network error" });
  }
});

module.exports = router;
