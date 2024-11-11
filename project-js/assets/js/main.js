import { getAll, getById, removeById, updateById } from "./services.js";
import { getParams, render } from "./utils.js";
import "./search.js";

const { products } = await getAll("products");
console.log(products);

const hotSaleProducts = products.filter(
  (product) => product.minimumOrderQuantity > 40
);
const flashSaleProducts = products.filter(
  (product) => product.discountPercentage > 10
);

const hotSaleSection = document.getElementById("hot-sale");
const flashSaleSection = document.getElementById("flash-sale");

render(hotSaleSection, hotSaleProducts);
render(flashSaleSection, flashSaleProducts);

const productId = getParams("id");
const product = await getById("products", productId);

console.log(product);

function countdownTimer(duration) {
  let seconds = duration;
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const interval = setInterval(() => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    hoursElement.innerHTML = String(hrs).padStart(2, "0");
    minutesElement.innerHTML = String(mins).padStart(2, "0");
    secondsElement.innerHTML = String(secs).padStart(2, "0");
    if (seconds <= 0) {
      clearInterval(interval);
    }
    seconds--;
  }, 1000);
}

countdownTimer(3600);
