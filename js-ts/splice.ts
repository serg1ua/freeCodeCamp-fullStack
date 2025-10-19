function frankenSplice<T = unknown>(arr1: T[], arr2: T[], index: number): T[] {
  const newArr = [...arr2];

  newArr.splice(index, 0, ...arr1);
  return newArr;
}

console.log(frankenSplice([1, 2, 3], [4, 5], 1));
