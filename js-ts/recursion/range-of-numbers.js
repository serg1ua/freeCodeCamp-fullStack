function rangeOfNumbers(startNum, endNum) {
  let rangeArr = [];

  if (startNum === endNum) {
    return [startNum];
  } else {
    rangeArr = rangeOfNumbers(startNum, endNum - 1);
    rangeArr.push(endNum);
  }
  return rangeArr;
}

console.log(rangeOfNumbers(3, 9));