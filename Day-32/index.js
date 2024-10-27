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
    data.map((todo) => {
      todos.push(todo);
    });
    console.log(todos);
    filterTodos();
  })
  .catch((error) => console.log(error));

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
    todoList.innerHTML = "<tr><td colspan='5'>No data</td></tr>";
  }
}

function handleTodo(event) {
  event.preventDefault();
  if (!validTodo()) return;

  if (todoEditing.id) {
    const updatedTodo = {
      title: titleEle.value,
      description: descriptionEle.value,
      status: todoEditing.status,
      priority: priorityEle.value,
    };
    fetch(`${url}/${todoEditing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    }).then(() => {
      todos = todos.map((item) =>
        item.id === todoEditing.id ? { ...item, ...updatedTodo } : item
      );
      filterTodos();
      resetForm();
    });
  } else {
    const newTodo = {
      id: generateNewId().toString(),
      title: titleEle.value,
      description: descriptionEle.value,
      status: false,
      priority: priorityEle.value,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
}

function generateNewId() {
  return todos.length === 0 ? 1 : Math.max(...todos.map((todo) => todo.id)) + 1;
}

function toggleStatus(id) {
  const todo = todos.find((item) => parseInt(item.id) === id);
  console.log(typeof id);
  if (todo) {
    const updatedStatus = !todo.status;
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        todos = todos.map((item) =>
          item.id === id ? { ...item, status: updatedStatus } : item
        );
        renderTodo(todos);
      })
      .catch((error) => console.error(error.message));
  } else {
    console.error(id, todos);
  }
}

function removeTodo(id) {
  if (confirm("Sure?")) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        todos = todos.filter((todo) => todo.id !== id);
        filterTodos();
      })
      .catch((error) => console.error(error));
  }
}

function updateTodo(id) {
  todoEditing = todos.find((todo) => todo.id === id);
  if (!todoEditing) {
    return;
  }
  titleEle.value = todoEditing.title;
  descriptionEle.value = todoEditing.description;
  priorityEle.value = todoEditing.priority;
  btnSubmit.textContent = "Update";
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
