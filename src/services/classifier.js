const axios = require("axios");
const { isPrime, isPerfect, isArmstrong, digitSum } = require("../utils/helpers");

const NUMBERS_API_URL = "http://numbersapi.com";

/**
 * Classify a number based on mathematical properties
 */
exports.classify = async (num) => {
    const properties = [];

    // Determine mathematical properties
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    try {
        const funFact = await fetchFunFact(num);
        return {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: funFact,
        };
    } catch (error) {
        return {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: "Fun fact unavailable.",
        };
    }
};

/**
 * Fetch fun fact from Numbers API
 */
const fetchFunFact = async (num) => {
    try {
        const response = await axios.get(`${NUMBERS_API_URL}/${num}/math?json`);
        return response.data.text || "No fact available.";
    } catch (error) {
        console.error(`Error fetching fun fact for ${num}:`, error.message);
        throw new Error("Fun fact retrieval failed");
    }
};
