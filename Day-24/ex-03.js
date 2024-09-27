const order = {
  id: 1,
  products: [
    { id: 1, name: "Tivi", price: 10000, quantity: 1 },
    { id: 2, name: "Tủ lạnh", price: 15000, quantity: 2 },
    { id: 3, name: "Máy giặt", price: 8000, quantity: 4 },
    { id: 4, name: "Điều hòa", price: 12000, quantity: 1 },
  ],
};

order.totalPrice = order.products.reduce((total, product) => {
  return total + product.price * product.quantity;
}, 0);

console.log(order);
