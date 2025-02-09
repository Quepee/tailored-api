const axios = require("axios");
const { isPrime, isPerfect, isArmstrong, sumOfDigits } = require("../utils/numberUtils");

// Function to classify a number
exports.classifyNumber = async (req, res) => {
  const number = req.params.number; // Get number from the URL path

  // Validate input: Ensure the number is an integer
  if (!/^-?\d+$/.test(number)) {
    return res.status(400).json({
      number: number,
      error: true
    });
  }

  const num = parseInt(number, 10);
  const properties = [];

  if (num % 2 === 0) {
    properties.push("even");
  } else {
    properties.push("odd");
  }

  if (isArmstrong(num)) {
    properties.unshift("armstrong"); // Ensure "armstrong" comes first if present
  }

  // Fetch fun fact from Numbers API
  let funFact = "No fun fact available.";
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    funFact = response.data;
  } catch (error) {
    console.error("Error fetching fun fact:", error.message);
  }

  res.json({
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties: properties,
    digit_sum: sumOfDigits(num),
    fun_fact: funFact
  });
};
