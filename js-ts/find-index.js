function getIndexToIns(arr, number) {

  const sortedArr = arr.sort((a, b) => a - b);

  function find(element, index, array) {
    if (number > element && number <= array[index + 1]) {
      return true;
    }
    if (number > array.at(-1) && index === array.length - 1) {
      return true;
    }
    return false;
  }

  const index = sortedArr.findIndex(find);
  return index + 1;
}

console.log(getIndexToIns([3, 10, 5], 11));
