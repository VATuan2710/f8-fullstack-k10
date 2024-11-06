import { getAll } from "./services.js";

document.addEventListener("DOMContentLoaded", async () => {
  const { products } = await getAll("products");
  console.log(products);

  const dataSlide = products.slice(0, 4).map((product, index) => ({
    id: index + 1,
    title: product.title,
    content: product.description,
    image: product.thumbnail,
  }));

  let count = 0;
  let slideLength = dataSlide.length;
  const leftBtn = document.getElementsByClassName("left-arrow")[0];
  const rightBtn = document.getElementsByClassName("right-arrow")[0];
  let slides;
  let dots;
  let slideInterval;

  renderSlides();
  renderSlide();
  autoNext();

  if (leftBtn && rightBtn) {
    leftBtn.addEventListener("click", goLeft);
    rightBtn.addEventListener("click", goRight);
  }

  function renderSlides() {
    const carouselInner = document.getElementById("carousel-inner");
    const dotContainer = document.getElementById("dot-container");

    if (!carouselInner || !dotContainer) {
      console.error("Elements not found");
      return;
    }

    dataSlide.forEach((slide, index) => {
      const slideDiv = document.createElement("div");
      slideDiv.classList.add("slide");
      slideDiv.innerHTML = `
        <img src="${slide.image}" alt="${slide.title}" />
      `;
      carouselInner.appendChild(slideDiv);

      const dotDiv = document.createElement("div");
      dotDiv.classList.add("dot");
      dotContainer.appendChild(dotDiv);
      dotDiv.addEventListener("click", () => {
        setSlideByDot(index);
      });
    });

    slides = document.querySelectorAll(".slide");
    dots = document.querySelectorAll(".dot");
  }

  function renderSlide() {
    if (!slides || !dots) {
      console.error("Slides or dots not initialized");
      return;
    }

    slides.forEach((item) => {
      item.style.display = "none";
    });
    slides[count].style.display = "block";

    dots.forEach((item) => {
      item.style.background = "green";
    });
    dots[count].style.background = "orange";
  }

  function setSlideByDot(index) {
    count = index;
    clearInterval(slideInterval);
    renderSlide();
    autoNext();
  }

  function goLeft() {
    clearInterval(slideInterval);
    count = count === 0 ? slideLength - 1 : count - 1;
    renderSlide();
    autoNext();
  }

  function goRight() {
    clearInterval(slideInterval);
    count = count === slideLength - 1 ? 0 : count + 1;
    renderSlide();
    autoNext();
  }

  function autoNext() {
    slideInterval = setInterval(() => {
      goRight();
    }, 3000);
  }
});
