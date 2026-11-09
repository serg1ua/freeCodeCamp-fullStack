function diffArray(arr1, arr2) {
  const combinedArr = arr1.concat(arr2);
  return Object.entries(combinedArr.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] = acc[curr] + 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {})).filter(([, num]) => num === 1).map(([val,]) => val);
}

console.log(diffArray([
  "diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"
]));