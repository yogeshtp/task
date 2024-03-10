let obj = {
  name: "yogesh",
  age: 22,
  add: "dahisar",
};

// key
console.log(Object.keys(obj));
// value
console.log(Object.values(obj));

// entries
for (let [x, y] of Object.entries(obj)) {
  console.log(x, y);
}

for (let key in obj) {
  let value = obj[key];
  console.log(key, value);
}
