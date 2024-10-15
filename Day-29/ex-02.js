const userInfo = {};

const formElement = document.getElementById("register");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  let emailValid = true;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email = emailInput.value.trim();
  if (!emailPattern.test(email)) {
    emailError.textContent = "Hay nhap dia chi email hop le";
    emailValid = false;
  } else {
    emailError.textContent = "";
  }

  if (emailValid) {
    formData.forEach((value, key) => {
      userInfo[key] = value;
    });
    console.log("info:", userInfo);
  }
});
