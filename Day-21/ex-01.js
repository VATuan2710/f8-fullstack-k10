function createCustomers(customers) {
  // tạo shortName
  for (let i = 0; i < customers.length; i++) {
    let nameParts = customers[i].name.split(" ");
    customers[i].shortName =
      nameParts[0] + " " + nameParts[nameParts.length - 1];
  }
  // bubble sort
  for (let i = 0; i < customers.length - 1; i++) {
    for (let j = 0; j < customers.length - i - 1; j++) {
      if (customers[j].age > customers[j + 1].age) {
        let temp = customers[j];
        customers[j] = customers[j + 1];
        customers[j + 1] = temp;
      }
    }
  }
  return customers;
}

const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers);

console.log(result);
