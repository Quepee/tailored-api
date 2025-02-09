const axios = require("axios");
const { isPrime, isPerfect, isArmstrong, digitSum } = require("../utils/helpers");

const NUMBERS_API_URL = "http://numbersapi.com";

/**
 * Classify a number based on mathematical properties
 */
exports.classify = async (num) => {
    const properties = [];

    // Check Armstrong number
    if (isArmstrong(num)) {
        properties.push("armstrong");
    }

    // Check Even or Odd
    properties.push(num % 2 === 0 ? "even" : "odd");

    // Fetch fun fact
    const funFact = await fetchFunFact(num);

    return {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties,
        digit_sum: digitSum(num),
        fun_fact: funFact
    };
};

/**
 * Fetch fun fact from Numbers API
 */
const fetchFunFact = async (num) => {
    try {
        const response = await axios.get(`${NUMBERS_API_URL}/${num}/math?json`);
        return response.data.text || "No fact found";
    } catch (error) {
        return "Could not retrieve fun fact";
    }
};
