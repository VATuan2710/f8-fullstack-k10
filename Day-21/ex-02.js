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

register("tuan", "12345", "tuanva@gmail.com");
register("vu", "00000", "tuanvu@gmail.com");

const dataLogin = login("tuanva@gmail.com", "12345");
console.log(dataLogin);
