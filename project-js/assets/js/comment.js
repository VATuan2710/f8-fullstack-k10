import { getById } from "./services.js";
import { getParams } from "./utils.js";

const commentEle = document.querySelector(".comment");
const id = getParams("id");

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

async function loadComments() {
  try {
    const product = await getById("products", id);
    const reviews = product.reviews || [];
    let reviewsContent = `
      <section class="reviews-section">
        <h3>Đánh Giá Sản Phẩm</h3>
        <div class="reviews-list">
          ${reviews
            .map(
              (review) => `
              <div class="review-item">
                <div class="review-header">
                  <strong>${review.reviewerName}</strong>
                  <span class="text-muted">${new Date(
                    review.date
                  ).toLocaleDateString()}</span>
                </div>
                <div class="review-rating">${Rating(review.rating)}</div>
                <p class="review-comment">${review.comment}</p>
                <span class="text-muted">${review.reviewerEmail}</span>
              </div>
            `
            )
            .join("")}
        </div>
      </section>
    `;

    commentEle.innerHTML = reviewsContent;
  } catch (error) {
    console.error(error);
  }
}

loadComments();
