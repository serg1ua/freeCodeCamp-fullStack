function countUp(n) {
  let countArray = [];
  if (n < 1) {
    return [];
  } else {
    countArray = countUp(n - 1);
    countArray.push(n);
  }
  return countArray;
}

console.log(countUp(5));