const todoList = document.getElementById("todoList");
const titleEle = document.getElementById("title");
const descriptionEle = document.getElementById("description");
const todoForm = document.getElementById("todoForm");
const btnReset = document.getElementById("btnReset");

const titleError = document.getElementById("titleError");
const descriptionError = document.getElementById("descriptionError");

let todos = [];
let todoEditing = {
  id: null,
};
function generateNewId() {
  if (todos.length === 0) {
    return 1;
  }
  const maxId = Math.max(...todos.map((todo) => todo.id));
  return maxId + 1;
}

// có thể thay url cho http

const url = "http://localhost:3000/todos";

function getTodos() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      filterTodos();
    })
    .catch((err) => {
      console.log(err);
    });
}
// getTodos();
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
        <button onclick="updateTodo('${
          item.id
        }')" class="btn btn-warning">Update</button>
      </td>
      `;
      todoList.appendChild(trEle);
    });
  } else {
    todoList.innerHTML = "<tr><td colspan='4'>No data</td></tr>";
  }
}

function handleTodo(event) {
  event.preventDefault();
  if (!validTodo()) return;
  if (todoEditing.id) {
    const todo = {
      title: titleEle.value,
      description: descriptionEle.value,
      status: todoEditing.status,
    };
    fetch(`${url}/${todoEditing.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      todos = todos.map((item) => {
        if (item.id === todoEditing.id) {
          return todoEditing;
        }
      });
      renderTodos(todos);
    });
  } else {
    // const newId = generateNewId();
    const newTodo = {
      // id: newId,
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
        // todos.push(data);
        // filterTodos();
        // resetForm();
        console.log(`thành công`, data);
      })
      .catch((error) => console.error(error));
  }
}

function removeTodo(id) {
  confirm("Sure ?") &&
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(id);
        todos = todos.filter((todo) => todo.id !== id);
        filterTodos();
      })
      .catch((error) => console.error("Error:", error));
}

function updateTodo(id) {
  todoEditing = todos.find((todo) => todo.id === id);
  titleEle.value = todoEditing.title;
  descriptionEle.value = todoEditing.description;
  // idEditing = id;
  btnSubmit.textContent = "Update";
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

todoForm.addEventListener("submit", handleTodo);
btnReset.addEventListener("click", resetForm);
