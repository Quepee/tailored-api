const cors = require("cors");

module.exports = cors({
  origin: "*", // Allow all origins
  methods: ["GET"],
  allowedHeaders: ["Content-Type"]
});
