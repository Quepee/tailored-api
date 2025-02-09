// Import dependencies
const express = require("express");
const cors = require("./config/corsConfig");
const classifyRoute = require("./src/routes/classifyRoute");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors);

// Routes
app.use("/api", classifyRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
