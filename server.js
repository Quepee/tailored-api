require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const classifyRoute = require("./src/routes/classifyRoute");

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
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
