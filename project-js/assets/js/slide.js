const dataSlide = [
  {
    id: 1,
    title: "Product 1",
    content: "Description of Product 1",
    image: "../project-js/assets/images/slide-1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    content: "Description of Product 2",
    image: "../project-js/assets/images/slide-2.jpg",
  },
  {
    id: 3,
    title: "Product 3",
    content: "Description of Product 3",
    image: "../project-js/assets/images/slide-3.jpg",
  },
];

let count = 0;
let slideLength = dataSlide.length;
let slides;
let dots;
let slideInterval;

const leftBtn = document.getElementsByClassName("left-arrow")[0];
const rightBtn = document.getElementsByClassName("right-arrow")[0];

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
      <a href=""><img src="${slide.image}" alt="${slide.title}" /></a>
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

if (leftBtn && rightBtn) {
  leftBtn.addEventListener("click", goLeft);
  rightBtn.addEventListener("click", goRight);
}

renderSlides();
renderSlide();
autoNext();
