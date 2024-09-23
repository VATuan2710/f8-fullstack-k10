const datas = [
  { name: "Alice", age: 20 },
  { name: "Bob", age: 0 },
  { name: "Carol", age: -1 },
  { name: "David", age: null },
  { name: "Eve", age: NaN },
  { name: "Frank", age: undefined },
  { name: "", age: 20 },
];

function filterUsers(datas) {
  const validData = [];
  const invalidData = [];
  datas.forEach((user) => {
    if (user.name && !isNaN(user.age) && user.age > 0) {
      validData.push(user);
    } else {
      invalidData.push(user);
    }
  });

  return { validData, invalidData };
}

const result = filterUsers(datas);
const validData = result.validData;
const invalidData = result.invalidData;
console.log("Valid Data:", validData);
console.log("Invalid Data:", invalidData);
