exports.getNumberProperties = (num) => {
  const isPrime = (n) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
      }
      return true;
  };

  const isPerfect = (n) => {
      let sum = 1;
      for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) {
              sum += i + (i !== n / i ? n / i : 0);
          }
      }
      return sum === n && n !== 1;
  };

  const isArmstrong = (n) => {
      const digits = n.toString().split("").map(Number);
      const power = digits.length;
      return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === n;
  };

  const isOdd = num % 2 !== 0;
  const digitSum = num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  
  let properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(isOdd ? "odd" : "even");

  return {
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: digitSum
  };
};
