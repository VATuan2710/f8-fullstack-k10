const orders = [
  { id: "1", name: "A", quantity: 2, price: 100 },
  { id: "2", name: "B", quantity: 1, price: 200 },
  { id: "3", name: "C", quantity: 3, price: 300 },
];

function calculateOrderTotal(orders) {
  let total = 0;
  orders.forEach((order) => {
    total += order.quantity * order.price;
  });
  return total;
}
console.log(calculateOrderTotal(orders));
