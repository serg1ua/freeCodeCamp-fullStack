function destroyer(arr, ...remove) {
  arr.filter(item => {
    if (remove.includes(item)) {
      arr.splice(arr.indexOf(item), 1, null);
    }
  });
  return arr.filter(Boolean);
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));