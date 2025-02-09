const cors = require("cors");

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["*"]; // Use environment variable if available, fallback to "*" for all origins

module.exports = cors({
  origin: function (origin, callback) {
    // Handle missing origin (e.g., server-to-server requests or requests without Origin header)
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
      callback(null, true); // Allow request if origin is valid or "*"
    } else {
      callback(new Error("Not allowed by CORS"), false); // Reject request if not allowed
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials if needed (cookies, HTTP authentication)
});
