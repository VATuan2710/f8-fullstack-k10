import { getById } from "./services.js";
import { getParams } from "./utils.js";

const detailEle = document.getElementById("detail");

const id = getParams("id");
const product = await getById("products", id);

function Rating(rating) {
  const maxStars = 5;
  let starsHtml = "";
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      starsHtml += `<i class="fa-solid fa-star filled"></i>`;
    } else if (i - rating < 1 && i > rating) {
      starsHtml += `<i class="fa-solid fa-star-half-stroke filled"></i>`;
    } else {
      starsHtml += `<i class="fa-regular fa-star"></i>`;
    }
  }
  return starsHtml;
}

function renderDetail(target, data) {
  const discountedPrice = (
    data.price -
    (data.discountPercentage * data.price) / 100
  ).toFixed(2);

  const productItem = document.createElement("div");
  productItem.classList.add("row");

  productItem.innerHTML = /*html*/ `
    <div class="col col-md-5">
        <div class="image">
          <img id="main-image" src="${
            data.images[0]
          }" style="width: 300px; height: auto alt="${
    data.title
  }" loading="lazy" class="img-fluid"/>
        </div>
         <div class="thumbnail-gallery  d-flex">
          ${data.images
            .map(
              (img, index) => `
            <img src="${img}" alt="${data.title} thumbnail ${index}" class="thumbnail img-thumbnail" style="width: 80px; height: 80px; cursor: pointer;" />
          `
            )
            .join("")}
        </div>
      </div>  
      <div class="col col-md-7">
        <div class="detail-content">
          <h2>${data.title}</h2>
          <div class="detail-rating">
            <p>${data.rating}</p>
            <span>${Rating(data.rating)}</span> 
          </div>
          <div class="detail-price">   
            <p>Giá khuyến mãi: <strong>$${discountedPrice}</strong></p>
            <span class="text-muted text-decoration-line-through">$${
              data.price
            }</span> 
          </div>
          <p>Còn ${data.stock} sản phẩm</p>
          
          <div class="quantity-selector d-flex align-items-center">
            <span>Chọn số lượng: </span>
            <button class="btn btn-outline-secondary quantity-decrease">-</button>
            <input min="1" max="${
              data.stock
            }" value="1" class="form-control text-center quantity-input">
            <button class="btn btn-outline-secondary quantity-increase">+</button>
          </div>
          
          <p>Danh mục: ${data.category}</p>
          <p>Chi tiết: ${data.description}</p>
          <button class="btn btn-order">Đặt hàng</button>
          <button class="btn btn-danger">Mua ngay</button>
        </div>
      </div>
  `;

  target.appendChild(productItem);
  setupQuantityButtons(productItem, data.stock);
  setupImageGallery(productItem, data.images);
}

function setupQuantityButtons(container, maxStock) {
  const decreaseBtn = container.querySelector(".quantity-decrease");
  const increaseBtn = container.querySelector(".quantity-increase");
  const quantityInput = container.querySelector(".quantity-input");

  decreaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < maxStock) {
      quantityInput.value = currentValue + 1;
    }
  });
}

function setupImageGallery(container, images) {
  const mainImage = container.querySelector("#main-image");
  const thumbnails = container.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      mainImage.src = images[index];
    });
  });
}

renderDetail(detailEle, product);
