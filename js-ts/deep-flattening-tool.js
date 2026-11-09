// recursive
function steamrollArrayRecursive(arr) {
  return arr.reduce((acc, curr) => {
    const value = Array.isArray(curr) ? steamrollArray(curr) : curr;
    return acc.concat(value);
  }, []);
}

// iterative
function steamrollArray(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const curr = stack.pop();
    if (Array.isArray(curr)) {
      stack.push(...curr);
    } else {
      result.push(curr);
    }
  }
  return result.reverse();
}

// console.log(steamrollArray([[["a"]], [["b"]]]));
console.log(steamrollArray([1, [], [3, [[4]]]]));