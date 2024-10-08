const cart = [
  { id: 1, name: "T-Shirt", price: 100000, quantity: 2, hotSale: false },
  { id: 2, name: "Jean", price: 200000, quantity: 1, hotSale: false },
  { id: 3, name: "Skirt", price: 150000, quantity: 3, hotSale: true },
  { id: 4, name: "Shirt", price: 120000, quantity: 2, hotSale: false },
  { id: 5, name: "Jacket", price: 250000, quantity: 1, hotSale: true },
];

function renderOrder(cart) {
  let tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
  `;

  let totalAmount = 0;

  cart.map((item) => {
    const total = item.price * item.quantity;
    totalAmount += total;

    tableHtml += `
      <tr>
        <td style="color: ${item.hotSale ? "red" : "black"}">${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${total}</td>
      </tr>
    `;
  });

  tableHtml += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Tổng tiền</td>
          <td>${totalAmount}</td>
        </tr>
      </tfoot>
    </table>
  `;

  document.getElementById("cart-container").innerHTML = tableHtml;
}
renderOrder(cart);
