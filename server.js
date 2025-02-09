const express = require("express");
const cors = require("cors");
const classifyRoute = require("./src/routes/classifyRoute");

const app = express(); // Initialize Express

app.use(cors()); // Handle CORS
app.use(express.json()); // Parse JSON request bodies

// Root Route (Fix)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Number Classification API" });
});

// Register API route
app.use("/api", classifyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
