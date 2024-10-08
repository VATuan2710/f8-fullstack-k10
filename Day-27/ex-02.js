const cart = [
  { id: 1, name: "T-Shirt", price: 100000, quantity: 2, hotSale: false },
  { id: 2, name: "Jean", price: 200000, quantity: 1, hotSale: false },
  { id: 3, name: "Skirt", price: 150000, quantity: 3, hotSale: true },
  { id: 4, name: "Shirt", price: 120000, quantity: 2, hotSale: false },
  { id: 5, name: "Jacket", price: 250000, quantity: 1, hotSale: true },
];

function renderOrder(cart) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Tên sản phẩm", "Đơn giá", "Số lượng", "Thành tiền"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  let totalAmount = 0;

  cart.forEach((item) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    if (item.hotSale) {
      nameCell.style.color = "red";
    }

    const priceCell = document.createElement("td");
    priceCell.textContent = item.price;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;

    const totalCell = document.createElement("td");
    const total = item.price * item.quantity;
    totalCell.textContent = total;
    totalAmount += total;

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(totalCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  const tfoot = document.createElement("tfoot");
  const footerRow = document.createElement("tr");
  const footerCell = document.createElement("td");
  footerCell.colSpan = 3;
  footerCell.textContent = "Tổng tiền";
  footerRow.appendChild(footerCell);

  const totalCell = document.createElement("td");
  totalCell.textContent = totalAmount;
  footerRow.appendChild(totalCell);

  tfoot.appendChild(footerRow);
  table.appendChild(tfoot);

  document.body.appendChild(table);
}

renderOrder(cart);
