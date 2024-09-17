const users = [];

function register(name, password, email) {
  if (!name || !password || !email) {
    console.error("Thiếu thông tin. Vui lòng nhập đầy đủ");
    return;
  }
  const newUser = { name, password, email, role: "user" };
  users.push(newUser);
  return users;
}

function login(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return users[i];
    }
  }
  return "Tai khoan khong ton tai!";
}

console.log(register("hoang", "12345", "hoangnm@gmail.com"));
console.log(register("an", "00000", "hoangan@gmail.com"));

const dataLogin = login("hoangan@gmail.com", "00000");
console.log(dataLogin);
