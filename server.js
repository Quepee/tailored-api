// Import dependencies
const express = require("express");
const cors = require("./config/corsConfig");
const classifyRoute = require("./src/routes/classifyRoute");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
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

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
