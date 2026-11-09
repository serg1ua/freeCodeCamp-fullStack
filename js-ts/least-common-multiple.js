// Greatest Common Divisor
// 1. (48 % 18 = 12) gcd(48, 18) = gcd(18, 12)
// 2. (18 % 12 = 6)  gcd(18, 12) = gcd(12, 6)
// 3. (12 % 6 = 0) gcd(12, 6) = gcd(6, 0) = 6)
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// Lowest Common Multiple
// formula (a * b) / gcd(a, b)
const lcm = (a, b) => (a * b) / gcd(a, b);

function smallestCommons(arr) {
  if (arr.at(0) < arr.at(-1)) {
    arr.sort((a, b) => b - a);
  }
  const range = Array.from({ length: arr.at(0) - arr.at(-1) + 1 }, (_, i) => arr.at(0) - i);

  return range.reduce((acc, curr) => lcm(acc, curr));
}

console.log(smallestCommons([5, 1]));