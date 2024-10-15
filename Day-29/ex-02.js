const userInfo = {};

const formElement = document.getElementById("register");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  formData.forEach((value, key) => {
    userInfo[key] = value;
  });
  console.log("info:", userInfo);
});
