const cors = require("cors");

// Configure CORS to allow all origins
module.exports = cors({
  origin: "*",
  methods: "GET",
  allowedHeaders: ["Content-Type"]
});
