/**
 * Check if a number is prime
 */
exports.isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
  }
  return true;
};

/**
* Check if a number is perfect (sum of divisors equals number)
*/
exports.isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
          sum += i;
          if (i !== num / i) sum += num / i;
      }
  }
  return sum === num && num !== 1;
};

/**
* Check if a number is an Armstrong number
*/
exports.isArmstrong = (num) => {
  const digits = num.toString().split('').map(Number);
  const power = digits.length;
  return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
};

/**
* Calculate the sum of digits of a number
*/
exports.digitSum = (num) => {
  return num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
};
