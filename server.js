const express = require("express");
const cors = require("cors");
const classifyRoute = require("./src/routes/classifyRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Number Classification API",
    endpoints: {
      classify: "/api/classify/:number"
    },
  });
});

// Register API route
app.use("/api", classifyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
