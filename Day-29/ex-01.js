const dataSlide = [
  {
    id: 1,
    title: "Slide 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
    image: "https://placehold.co/800x300?text=Slide+1",
  },
  {
    id: 2,
    title: "Slide 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ratione?",
    image: "https://placehold.co/800x300?text=Slide+2",
  },
  {
    id: 3,
    title: "Slide 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image: "https://placehold.co/800x300?text=Slide+3",
  },
  {
    id: 4,
    title: "Slide 4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum?",
    image: "https://placehold.co/800x300?text=Slide+4",
  },
  {
    id: 5,
    title: "Slide 5",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image: "https://placehold.co/800x300?text=Slide+5",
  },
  {
    id: 5,
    title: "Slide 5",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image: "https://placehold.co/800x300?text=Slide+5",
  },
];

let count = 0;
let slideLength = dataSlide.length;
const leftBtn = document.getElementsByClassName("left-arrow")[0];
const rightBtn = document.getElementsByClassName("right-arrow")[0];

function renderSlides() {
  const carouselInner = document.getElementById("carousel-inner");
  const dotContainer = document.getElementById("dot-container");

  dataSlide.forEach((slide, index) => {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("slide");
    slideDiv.innerHTML = `
          <img src="${slide.image}" alt="${slide.title}" />
          <h3>${slide.title}</h3>
          <p>${slide.content}</p>
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
renderSlides();

function renderSlide() {
  slides.forEach((item) => {
    item.style.display = "none";
  });
  slides[count].style.display = "block";
  dots.forEach((item) => {
    item.style.background = "green";
  });
  dots[count].style.background = "orange";
}
renderSlide();

function setSlideByDot(index) {
  count = index;
  dots[index].style.background = "orange";
  return renderSlide();
}

function goLeft() {
  if (count === 0) {
    count = slideLength - 1;
  } else {
    count--;
  }
  return renderSlide();
}

function goRight() {
  if (count === slideLength - 1) {
    count = 0;
  } else {
    count++;
  }
  return renderSlide();
}

leftBtn.addEventListener("click", goLeft);
rightBtn.addEventListener("click", goRight);

function autoNext() {
  slideInterval = setInterval(() => {
    goRight();
  }, 3000);
}
autoNext();
