const todoList = document.getElementById("todoList");
const titleEle = document.getElementById("title");
const descriptionEle = document.getElementById("description");
const todoForm = document.getElementById("todoForm");
const btnReset = document.getElementById("btnReset");

const titleError = document.getElementById("titleError");
const descriptionError = document.getElementById("descriptionError");

let todos = [];

function generateNewId() {
  if (todos.length === 0) {
    return 1;
  }
  const maxId = Math.max(...todos.map((todo) => todo.id));
  return maxId + 1;
}

function getTodos() {
  fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      filterTodos();
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderTodo(datas) {
  todoList.innerHTML = "";
  if (datas.length) {
    datas.forEach((item) => {
      let trEle = document.createElement("tr");
      trEle.innerHTML = `
      <td>${item.id}</td>
      <td>
        <button class="${
          item.status ? "completed" : "pending"
        }" onclick="toggleStatus(${item.id})">${item.title} - ${
        item.status ? "Completed" : "Pending"
      }</button>
      </td>
      <td>${item.description}</td>
      <td>
        <button onclick="removeTodo(${
          item.id
        })" class="btn btn-danger">Remove</button>
      </td>
      `;
      todoList.appendChild(trEle);
    });
  } else {
    todoList.innerHTML = "<tr><td colspan='4'>No data</td></tr>";
  }
}

function addTodo(event) {
  event.preventDefault();
  if (!validTodo()) return;

  const newId = generateNewId();
  const newTodo = {
    id: newId,
    title: titleEle.value,
    description: descriptionEle.value,
    status: false,
  };

  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((data) => {
      todos.push(data);
      filterTodos();
      resetForm();
    })
    .catch((error) => console.error(error));
}

function removeTodo(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      todos = todos.filter((todo) => todo.id !== id);
      filterTodos();
    })
    .catch((error) => console.error("Error:", error));
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
    descriptionError.textContent = "Cần điền Description";
    isValid = false;
  } else {
    descriptionError.textContent = "";
  }

  return isValid;
}
function resetForm() {
  titleEle.value = "";
  descriptionEle.value = "";
  titleError.textContent = "";
  descriptionError.textContent = "";
}

function filterTodos() {
  const statusFilter = document.getElementById("filterStatus").value;
  const searchTerm = document.getElementById("searchTitle").value.toLowerCase();

  let filteredTodos = todos;
  if (statusFilter === "completed") {
    filteredTodos = filteredTodos.filter((todo) => todo.status);
  } else if (statusFilter === "pending") {
    filteredTodos = filteredTodos.filter((todo) => !todo.status);
  }
  filteredTodos = filteredTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm)
  );
  renderTodo(filteredTodos);
}

getTodos();
todoForm.addEventListener("submit", addTodo);
btnReset.addEventListener("click", resetForm);
