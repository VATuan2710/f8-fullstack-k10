const products = [
  { id: "1OT22W006", name: "Girls Windbreaker Jacket" },
  { id: "1OT22W009", name: "Boys T-shirt" },
  { id: "1OT22W032", name: "Boys Shirt" },
  { id: "1OT22W011", name: "Men's Super Warm Jacket" },
  { id: "1OT22W000", name: "Women's Party Dress" },
];

function searchProducts(searchTerm) {
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (result.length > 0) {
    result.forEach((product) => console.log(product));
  } else {
    console.log("Không có sản phẩm nào");
  }
  return result;
}

const searchTerm = prompt("Nhập chuỗi tìm kiếm:");
searchProducts(searchTerm);
