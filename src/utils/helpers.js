

/**
 * Check if a number is prime
 * @param {number} num
 * @returns {boolean}
 */
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
  }
  return true;
};

/**
* Check if a number is perfect
* @param {number} num
* @returns {boolean}
*/
const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i <= num / 2; i++) {
      if (num % i === 0) sum += i;
  }
  return sum === num && num !== 1;
};

/**
* Check if a number is an Armstrong number
* @param {number} num
* @returns {boolean}
*/
const isArmstrong = (num) => {
  const digits = String(num).split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
};

/**
* Get properties of a number
* @param {number} num
* @returns {object}
*/
const helpers = (num) => {
  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  return {
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: String(num).split("").reduce((sum, digit) => sum + Number(digit), 0),
  };
};

module.exports = helpers;
