function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function permAlone(str) {
  const strArr = str.split("");
  const strArrLen = strArr.length;
  let perMutationsCount = 0;

  function generate(n) {
    if (n === 1) {
      if (!/(.)\1/.test(strArr.join(""))) {
        perMutationsCount++;
      }
      return;
    }

    for (let i = 0; i < n; i++) {
      generate(n - 1);
      if (n % 2 === 0) {
        swap(strArr, i, n - 1);
      } else {
        swap(strArr, 0, n - 1);
      }
    }
  }

  generate(strArrLen);
  return perMutationsCount;
}

