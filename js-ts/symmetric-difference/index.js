/**
 * The mathematical term symmetric difference (△ or ⊕)
 * of two sets is the set of elements which are in either of the two sets but not in both. For example,
 * for sets A = {1, 2, 3} and B = {2, 3, 4}, A △ B = {1, 4}.
 * Symmetric difference is a binary operation, which means it operates on only two elements.
 * So to evaluate an expression involving symmetric differences among three elements (A △ B △ C),
 * you must complete one operation at a time. Thus, A △ B △ C = (A △ B) △ C.
 * Create a function that takes two or more arrays and returns an array of their symmetric difference.
 * The returned array must contain only unique values (no duplicates).
 */

function sym(...args) {
  const symArr = [];
  args.forEach((arg, index) => {
    const arrPrev = index === 0 ? [...new Set(arg)] : [...symArr];
    const arrNext = [...new Set(args[index + 1])];

    arrPrev.forEach(el => {
      if (!arrNext.includes(el) && !symArr.includes(el)) {
        symArr.push(el);
      }
      if (arrNext.includes(el) && symArr.indexOf(el) > -1) {
        symArr.splice(symArr.indexOf(el), 1);
      }
    });
    arrNext.forEach(el => {
      if (!symArr.includes(el) && !arrPrev.includes(el)) {
        symArr.push(el);
      }
    });
  });
  return symArr.sort((a, b) => a - b);
}

console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])); // [2, 3, 4, 6, 7]
