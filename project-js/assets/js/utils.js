export function getParams(key) {
  console.log(window.location.search);
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function render(target, datas) {
  datas.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = /*html*/ `
        <div class="product-card">
          <a href='/product-detail.html?id=${item.id}'><img src="${item.thumbnail}" alt="${item.title}" /></a>
          <div class="product-infor">
            <h2>${item.title}</h2>
            <div class="price">Giá: ${item.price}</div>
            <p>Mô tả: ${item.description}</p>
            <button  class="btn btn-danger"> <a href='/product-detail.html?id=${item.id}'>Xem chi tiết</a></button>
          </div>
        </div>
    `;
    target && target.appendChild(productElement);
  });
}
