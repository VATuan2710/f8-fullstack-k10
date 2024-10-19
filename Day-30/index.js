/**
 * - Xây dựng giao diện hiển thị việc cần làm dạng bảng.
 * - Viết các hàm chức năng cho form và các nút bấm: Thêm, cập nhật trạng thái, sửa, xoá việc cần làm.
 * - Khi nhấn vào tên của việc cần làm sẽ cập nhật trạng thái và màu sắc của title, ví dụ: "task 1 - completed" hoặc "task 2 - pending".
 */

const todoList = document.getElementById("todoList");
const titleEle = document.getElementById("title");
const descriptionEle = document.getElementById("description");
const todoForm = document.getElementById("todoForm");
const btnSubmit = document.getElementById("btnSubmit");

const titleError = document.getElementById("titleError");
const descriptionError = document.getElementById("descriptionError");

let idEditing = null;
let todoEditing = {};

function generateRandomID(n) {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "todo-";
  for (let i = 0; i < n; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}

let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function handleLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodo(datas) {
  todoList.innerHTML = "";
  datas.length
    ? datas.forEach((item) => {
        let trEle = document.createElement("tr");
        trEle.innerHTML = `
      <td>${item.id}</td>
      <td>
        <button class="${
          item.status ? "completed" : "pending"
        }" onclick="toggleStatus('${item.id}')">${item.title} - ${
          item.status ? "Completed" : "Pending"
        }</button>
      </td>
      <td>${item.description}</td>
        <td>
        <button onclick="removeTodo('${
          item.id
        }')" class="btn btn-danger">Remove</button>
        <button onclick="updateTodo('${
          item.id
        }')" class="btn btn-warning">Update</button>
      </td>
    `;
        todoList.appendChild(trEle);
      })
    : (todoList.innerHTML = "<tr><td colspan='4'>No data</td></tr>");
}

function validTodo() {
  let isValid = true;

  if (titleEle.value.trim() === "") {
    titleError.textContent = "Cần điền Title";
    isValid = false;
  } else {
    titleError.textContent = "";
  }

  if (descriptionEle.value.trim() === "") {
    descriptionError.textContent = "Cần điền  Description";
    isValid = false;
  } else {
    descriptionError.textContent = "";
  }

  return isValid;
}

function addTodo(event) {
  event.preventDefault();
  if (!validTodo()) {
    return;
  }

  if (idEditing) {
    todos = todos.map((todo) => {
      if (todo.id === idEditing) {
        return {
          ...todo,
          title: titleEle.value,
          description: descriptionEle.value,
        };
      } else {
        return todo;
      }
    });
    idEditing = null;
    btnSubmit.textContent = "Add";
  } else {
    todos.push({
      id: generateRandomID(4),
      title: titleEle.value,
      description: descriptionEle.value,
      status: false,
    });
  }
  titleEle.value = "";
  descriptionEle.value = "";
  handleLocalStorage(todos);
  renderTodo(todos);
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  handleLocalStorage(todos);
  renderTodo(todos);
}

function updateTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  titleEle.value = todo.title;
  descriptionEle.value = todo.description;
  idEditing = id;
  btnSubmit.textContent = "Update";
}

function resetForm() {
  titleEle.value = "";
  descriptionEle.value = "";
  idEditing = null;
  btnSubmit.textContent = "Add";
}

function toggleStatus(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, status: !todo.status };
    }
    return todo;
  });
  handleLocalStorage(todos);
  renderTodo(todos);
}

renderTodo(todos);
todoForm.addEventListener("submit", addTodo);
btnReset.addEventListener("click", resetForm);
