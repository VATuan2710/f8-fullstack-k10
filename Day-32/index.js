const todoList = document.getElementById("todoList");
const titleEle = document.getElementById("title");
const descriptionEle = document.getElementById("description");
const todoForm = document.getElementById("todoForm");
const btnReset = document.getElementById("btnReset");
const btnSubmit = document.getElementById("btnSubmit");
const priorityEle = document.getElementById("priority");

const titleError = document.getElementById("titleError");
const descriptionError = document.getElementById("descriptionError");

let todos = [];
let todoEditing = { id: null };

const url = "http://localhost:3000/todos";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    todos = data;
    filterTodos();
  })
  .catch((error) => console.error(error));

function renderTodo(datas) {
  todoList.innerHTML = "";
  if (datas.length) {
    datas.forEach((item) => {
      let trEle = document.createElement("tr");
      trEle.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>
          <button class="${
            item.status ? "completed" : "pending"
          }" onclick="toggleStatus(${item.id})">
            ${item.status ? "Completed" : "Pending"}
          </button>
        </td>
        <td>${item.description}</td>
        <td>${item.priority}</td>
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
    todoList.innerHTML = "<tr><td colspan='6'>No data</td></tr>";
  }
}

function handleTodo(event) {
  event.preventDefault();
  if (!validTodo()) return;

  const todoData = {
    title: titleEle.value,
    description: descriptionEle.value,
    priority: priorityEle.value,
    status: todoEditing.id ? todoEditing.status : false,
  };

  if (todoEditing.id) {
    // cập nhật
    fetch(`${url}/${todoEditing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    })
      .then((response) => response.json())
      .then(() => {
        todos = todos.map((todo) =>
          todo.id === todoEditing.id ? { ...todo, ...todoData } : todo
        );
        filterTodos();
        resetForm();
      })
      .catch((error) => console.error(error));
  } else {
    const existingTodo = todos.find(
      (todo) => todo.title.toLowerCase() === todoData.title.toLowerCase()
    );
    if (existingTodo) {
      // cập nhật nếu trùng title
      fetch(`${url}/${existingTodo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      })
        .then((response) => response.json())
        .then(() => {
          todos = todos.map((todo) =>
            todo.id === existingTodo.id ? { ...todo, ...todoData } : todo
          );
          filterTodos();
          resetForm();
        })
        .catch((error) => console.error(error));
    } else {
      //  thêm mới
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todoData, id: generateNewId().toString() }),
      })
        .then((response) => response.json())
        .then((data) => {
          todos.push(data);
          filterTodos();
          resetForm();
        })
        .catch((error) => console.error(error));
    }
  }
}

function generateNewId() {
  if (todos.length === 0) {
    return 1;
  } else {
    return Math.max(...todos.map((todo) => parseInt(todo.id))) + 1;
  }
}

function toggleStatus(id) {
  const todo = todos.find((item) => parseInt(item.id) === id);
  if (todo) {
    const updatedStatus = !todo.status;
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updatedStatus }),
    })
      .then(() => {
        todo.status = updatedStatus;
        filterTodos();
      })
      .catch((error) => console.error(error));
  }
}

function removeTodo(id) {
  if (confirm("Sure?")) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
        return fetch(url);
      })
      .then((response) => response.json())
      .then((data) => {
        todos = data;
        renderTodo(todos);
      })
      .catch((error) => console.error(error));
  }
}

function updateTodo(id) {
  todoEditing = todos.find((todo) => todo.id === id);
  if (todoEditing) {
    titleEle.value = todoEditing.title;
    descriptionEle.value = todoEditing.description;
    priorityEle.value = todoEditing.priority;
    btnSubmit.textContent = "Update";
  }
}

function validTodo() {
  let isValid = true;

  if (titleEle.value.trim() === "") {
    titleError.textContent = "Cần điền title.";
    isValid = false;
  } else {
    titleError.textContent = "";
  }

  if (descriptionEle.value.trim() === "") {
    descriptionError.textContent = "Cần điền description.";
    isValid = false;
  } else {
    descriptionError.textContent = "";
  }

  return isValid;
}

function resetForm() {
  titleEle.value = "";
  descriptionEle.value = "";
  priorityEle.value = "low";
  titleError.textContent = "";
  descriptionError.textContent = "";
  todoEditing = { id: null };
  btnSubmit.textContent = "Add";
}

function filterTodos() {
  const statusFilter = document.getElementById("filterStatus").value;
  const searchTerm = document.getElementById("searchTitle").value.toLowerCase();
  const priorityFilter = document.getElementById("priorityFilter").value;

  let filteredTodos = todos;

  if (statusFilter === "completed") {
    filteredTodos = filteredTodos.filter((todo) => todo.status);
  } else if (statusFilter === "pending") {
    filteredTodos = filteredTodos.filter((todo) => !todo.status);
  }

  if (priorityFilter !== "all") {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.priority === priorityFilter
    );
  }

  filteredTodos = filteredTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm)
  );
  renderTodo(filteredTodos);
}

todoForm.addEventListener("submit", handleTodo);
btnReset.addEventListener("click", resetForm);
