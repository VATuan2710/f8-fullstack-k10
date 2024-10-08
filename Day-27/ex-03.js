function countElements(tagName) {
  const elements = document.getElementsByTagName(tagName);
  return elements.length;
}

console.log(countElements("div"));
console.log(countElements("p"));
