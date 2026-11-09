function whatIsInAName(arr, search) {
  return arr.reduce((acc, curr) => {
    let isMatch = true;
    for (const prop in search) {
      if (curr[prop] !== search[prop]) {
        isMatch = false;
      }
    }
    for (const prop in curr) {
      if (curr[prop] !== search[prop]) {
        isMatch = false;
      }
    }
    if (isMatch) {
      acc.push(curr);
    }
    return acc;
  }, []);
}

console.log(whatIsInAName(
  [
    { "apple": 1, "bat": 2 },
    { "bat": 2 },
    { "apple": 1, "bat": 2, "cookie": 2 }
  ],
  { "apple": 1, "bat": 2 }
));
