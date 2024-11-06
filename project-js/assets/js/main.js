import { getAll, getById, removeById, updateById } from "./services.js";
import { getParams, render } from "./utils.js";
import "./search.js";

const { products } = await getAll("products");
console.log(products);

const hotSaleProducts = products.filter(
  (product) => product.minimumOrderQuantity > 40
);
const onSaleProducts = products.filter(
  (product) => product.discountPercentage > 10
);
const newArrivalsProducts = products.slice(0, 5);

const hotSaleSection = document.getElementById("hot-sale");
const onSaleSection = document.getElementById("on-sale");
const newArrivalsSection = document.getElementById("new-arrivals");

render(hotSaleSection, hotSaleProducts);
render(onSaleSection, onSaleProducts);
render(newArrivalsSection, newArrivalsProducts);

const productId = getParams("id");

const product = await getById("products", productId);

// Cách 2: Lấy toàn bộ sản phẩm về -> products. Khi cần sản phẩm chi tiết thì sử dụng products.find()
console.log(product);
