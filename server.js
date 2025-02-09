import "dotenv/config"; // Load environment variables
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Utility functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  if (num < 2) return false;
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
};

const isArmstrong = (num) => {
  if (num < 0) return false;
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
};

const digitSum = (num) => {
  return Math.abs(num).toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
};

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Number Classification API",
    endpoints: [
      "/api/classify-number/371",
      "/api/classify-number/28",
      "/api/classify-number/7",
      "/api/classify-number/{number}", // Dynamic route example
    ],
  });
});

// Number Classification API
app.get("/api/classify-number/:number", async (req, res) => {
  const number = req.params.number;

  // Validate number input
  if (!/^-?\d+$/.test(number)) {
    return res.status(400).json({ number, error: true });
  }

  const num = parseInt(number, 10);
  const properties = [];

  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  try {
    const factResponse = await axios.get(`http://numbersapi.com/${num}/math?json`);
    res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: digitSum(num),
      fun_fact: factResponse.data.text || "No fact found",
    });
  } catch (error) {
    console.error("Error fetching fun fact:", error.message);
    res.status(500).json({ error: "Failed to fetch fun fact" });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: true, message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: true, message: "Internal Server Error" });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful Shutdown Handling
process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
