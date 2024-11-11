import { getAll } from "./services.js";

let products = [];
let searchResults = [];

async function getAllProducts() {
  const data = await getAll("products");
  products = data.products;
}

function renderSearchResults() {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = "";
  searchResults.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("search-result-item");
    productElement.innerHTML = `
      <a href="../project-js/product-detail.html?id=${product.id}">
        <img src="${product.thumbnail}" alt="${product.title}" style="width: 50px; height: auto; margin-right: 10px;">
        ${product.title}
      </a>
    `;
    searchResultsContainer.appendChild(productElement);
  });
}

function SearchProducts(query) {
  if (query.trim() === "") {
    searchResults = [];
  } else {
    searchResults = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  renderSearchResults();
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (event) => {
  SearchProducts(event.target.value);
});

getAllProducts();
