const express = require("express");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);

module.exports = app;
