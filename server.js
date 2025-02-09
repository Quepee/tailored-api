require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const classifyRoute = require("./src/routes/classifyRoute");
const classifyService = require("./src/services/classifier"); // Import classifier

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Number Classification API",
    endpoints: [
      "/api/classify-number/371",
      "/api/classify-number/28",
      "/api/classify-number/7",
      "/api/classify-number/{number}" // Dynamic route
    ],
  });
});

// Register API route
app.use("/api", classifyRoute);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: true, message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: true, message: "Internal Server Error" });
});

// Start server
const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Classify some numbers on startup
  const sampleNumbers = [371, 28, 7, -5];

  for (const num of sampleNumbers) {
    try {
      const result = await classifyService.classify(num);
      console.log(`🔍 Classification for ${num}:`, JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`❌ Error classifying ${num}:`, error.message);
    }
  }
});

// Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
