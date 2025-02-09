const express = require("express");
const cors = require("cors");
const classifyRoute = require("./src/routes/classifyRoute");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Number Classification API" });
});


const app = express();
app.use(cors()); // Handle CORS
app.use(express.json()); // Parse JSON request bodies

// Register API route
app.use("/api", classifyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
