let text =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit magnam, praesentium excepturi voluptas fugit quasi porro itaque similique! Expedita pariatur eaque tempore impedit.";
let words = text.split(" ");
// let wrappedText = "";

// for (let i = 0; i < words.length; i++) {
//   wrappedText += `<span> ${words[i]}</span>`;
// }

words = `<span>${text}</span>`;
words = words.replaceAll(" ", "</span> <span>");

document.write(words);

let spans = document.querySelectorAll("span");

let i = 0;
function highlightWord() {
  if (i > 0) {
    spans[i - 1].classList.remove("highlight");
  }
  if (i < spans.length) {
    spans[i].classList.add("highlight");
    i++;
  } else {
    i = 0;
  }
}
setInterval(highlightWord, 500);
