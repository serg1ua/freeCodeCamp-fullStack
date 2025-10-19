function pyramid(pattern, n, vertexDown) {
  let str = "\n";

  if (vertexDown) {
    for (let i = n; i >= 1; i--) {
      str += " ".repeat(n - i) + pattern.repeat(2 * i - 1) + "\n";
    }
  } else {
    for (let i = 1; i <= n; i++) {
      str += " ".repeat(n - i) + pattern.repeat(2 * i - 1) + "\n";
    }
  }
  return str;
}

console.log(pyramid("o", 4, true));
