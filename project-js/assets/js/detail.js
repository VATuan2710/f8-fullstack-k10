import { getById } from "./services.js";
import { getParams } from "./utils.js";

const detailEle = document.getElementById("detail");

const id = getParams("id");
console.log(id);
const product = await getById("products", id);
console.log(product);
function renderDetail(target, data) {
  const productItem = document.createElement("div");
  productItem.classList.add("row");
  productItem.innerHTML = /*html*/ `
    <div class="col col-md-6">
        <img src="${data.thumbnail}" alt="${data.title}" />
      </div>
      <div class="col col-md-6">
        <h2>${data.title}</h2>
        <p>Giá: ${data.price}</p>
        <p>Còn ${data.stock} sản phẩm</p>
        <div>
          <span>Chọn số lượng: </span> <input type="number" min=1 max=${data.stock} value="1"/>
        </div>
        <p>Danh mục: ${data.category}</p>
        <p>Chi tiết: ${data.description}</p>
        <button class="btn btn-danger">Mua ngay</button>
    </div>
    `;
  target.appendChild(productItem);
}

renderDetail(detailEle, product);
