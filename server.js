// Import dependencies
const express = require("express");
const cors = require("./config/corsConfig");
const classifyRoute = require("./src/routes/classifyRoute");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Log headers to inspect the request
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers); // Log headers for debugging
  next();
});

// Apply CORS middleware with the correct settings
app.use(cors()); // ✅ Apply corrected CORS settings

// Base route for testing
app.get("/", (req, res) => {
  res.send("✅ Number Classification API is running!");
});

// API Routes
app.use("/api", classifyRoute);

// 404 Error Handling
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler for uncaught CORS errors
app.use((err, req, res, next) => {
  if (err) {
    console.error("CORS Error:", err.message); // Log the CORS error message
    return res.status(403).json({ error: "CORS error: Not allowed by CORS policy" });
  }
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
