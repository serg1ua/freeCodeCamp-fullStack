function truthCheck(collection, pre) {
  return collection.every((item) => item[pre]);
}

console.log(
  truthCheck([{ name: "Pikachu", number: 25, caught: 3 }, { name: "Togepi", number: 175, caught: 1 }], "number")
);