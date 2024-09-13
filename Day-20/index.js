let text =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit magnam, praesentium excepturi voluptas fugit quasi porro itaque similique! Expedita pariatur eaque tempore impedit.";
let wrappedText = text
  .split(" ")
  .map((word) => `<span>${word} </span>`)
  .join("");
document.write(wrappedText);
let spans = document.querySelectorAll("span");
let i = 0;

function highlightNextLetter() {
  if (i > 0) {
    spans[i - 1].classList.remove("highlight");
  }
  if (i < spans.length) {
    spans[i].classList.add("highlight");
    i++;
    setTimeout(highlightNextLetter, 200);
  } else {
    i = 0;
    setTimeout(highlightNextLetter, 200);
  }
}

highlightNextLetter();
