import { getAll } from "./services.js";
import { getParams } from "./utils.js";

const categoryElement = document.getElementById("category");
const title = document.getElementById("title");
const sortSelect = document.getElementById("sort-select");
const param = getParams("category");
title.innerText = `Top ${param}:`.toUpperCase();

let products = [];

async function loadProducts() {
  try {
    const data = await getAll(`products/category/${param}`);
    products = data.products || [];
    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
}
loadProducts();

function renderProducts(products) {
  let htmlContent = '<div class="row">';
  products.forEach((item) => {
    htmlContent += `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="product-container">
        <a href='../project-js/product-detail.html?id=${item.id}'>
          <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" class="img-fluid"/>
        </a>
        <div class="product-info">
          <h2>${item.title}</h2>
          <div class="price">Giá: $${item.price}</div>
          <p>Mô tả: ${item.description}</p>
          <button class="btn btn-danger">
            <a href='../project-js/product-detail.html?id=${item.id}' class="text-white text-decoration-none">Xem chi tiết</a>
          </button>
        </div></div>
      </div>
    `;
  });
  htmlContent += "</div>";
  categoryElement.innerHTML = htmlContent;
}

function sortProductsAtoZ(products) {
  return products.sort((a, b) => a.title.localeCompare(b.title));
}

function sortProductsZtoA(products) {
  return products.sort((a, b) => b.title.localeCompare(a.title));
}

function sortProductsPriceUp(products) {
  return products.sort((a, b) => a.price - b.price);
}

function sortProductsPriceDown(products) {
  return products.sort((a, b) => b.price - a.price);
}

function handleSort() {
  const sortOption = sortSelect.value;
  let sortedProducts = [];

  if (sortOption === "name-az") {
    sortedProducts = sortProductsAtoZ(products.slice());
  } else if (sortOption === "name-za") {
    sortedProducts = sortProductsZtoA(products.slice());
  } else if (sortOption === "price-up") {
    sortedProducts = sortProductsPriceUp(products.slice());
  } else if (sortOption === "price-down") {
    sortedProducts = sortProductsPriceDown(products.slice());
  } else {
    sortedProducts = products.slice();
  }

  renderProducts(sortedProducts);
}

sortSelect.addEventListener("change", handleSort);
