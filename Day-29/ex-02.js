const userInfo = {};

const formElement = document.getElementById("register");
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;
  // fullname
  if (fullnameInput.value.trim() === "") {
    fullnameError.textContent = "Họ tên không được để trống.";
    isValid = false;
  } else {
    fullnameError.textContent = "";
  }

  // email
  const email = emailInput.value.trim();
  if (email === "") {
    emailError.textContent = "Email không được để trống.";
    isValid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Email không đúng định dạng.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // password
  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password không được để trống.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // confirmPassword
  if (confirmPasswordInput.value.trim() === "") {
    confirmPasswordError.textContent = "Xác nhận mật khẩu không được để trống.";
    isValid = false;
  } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
    confirmPasswordError.textContent = "Mật khẩu xác nhận không khớp.";
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
  }

  if (isValid) {
    const formData = new FormData(formElement);
    formData.forEach((value, key) => {
      userInfo[key] = value;
    });
    console.log("info:", userInfo);
  }
});

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (email !== "" && !isValidEmail(email)) {
    emailError.textContent = "Email không đúng định dạng.";
  } else {
    emailError.textContent = "";
  }
});

confirmPasswordInput.addEventListener("input", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "Mật khẩu xác nhận không khớp.";
  } else {
    confirmPasswordError.textContent = "";
  }
});
