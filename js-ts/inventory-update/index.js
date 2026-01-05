const curInv = [
  [21, 'Bowling Ball'],
  [2, 'Dirty Sock'],
  [1, 'Hair Pin'],
  [5, 'Microphone']
];

const newInv = [
  [2, 'Hair Pin'],
  [3, 'Half-Eaten Apple'],
  [67, 'Bowling Ball'],
  [7, 'Toothpaste']
];

function updateInventory(arr1, arr2) {
  const inventory1 = arr1.reduce((acc, curr) => {
    acc[curr[1]] = curr[0];
    return acc;
  }, {});

  arr2.forEach(([value, key]) => {
    if (inventory1[key]) {
      inventory1[key] = inventory1[key] + value;
    } else {
      inventory1[key] = value;
    }
  });

  const sorted = Object.keys(inventory1).sort();
  return sorted.map((key, index) => (sorted[index] = [inventory1[key], key]));
}

console.log(updateInventory(curInv, newInv));
