const todos = [
  {
    id: 1,
    content: "Task A",
    completed: false,
    priority: 2,
  },
  {
    id: 2,
    content: "Task B",
    completed: true,
    priority: 1,
  },
  {
    id: 3,
    content: "Task C",
    completed: false,
    priority: 3,
  },
  {
    id: 4,
    content: "Task D",
    completed: false,
    priority: 3,
  },
];

let currentTodos = [...todos];
const tbody = document.getElementById("todos");

function renderTodos(list) {
  tbody.innerHTML = "";
  list.forEach((todo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.content}</td>
      <td>${todo.priority}</td>
      <td>
        <button class="${
          todo.completed ? "completed" : "doing"
        }" onclick="toggleCompleted(${todo.id})">
          ${todo.completed ? "Completed" : "Doing"}
        </button>
      </td>
      <td>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function toggleCompleted(id) {
  currentTodos = currentTodos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  renderTodos(currentTodos);
}

function deleteTodo(id) {
  const confirmDelete = confirm("bạn có muốn xóa");
  if (confirmDelete) {
    currentTodos = currentTodos.filter((todo) => todo.id !== id);
    renderTodos(currentTodos);
  }
}

document.getElementById("prioritySort").addEventListener("click", () => {
  currentTodos.sort((a, b) => b.priority - a.priority);
  renderTodos(currentTodos);
});

document.getElementById("completed").addEventListener("click", () => {
  const completedTodos = currentTodos.filter((todo) => todo.completed);
  renderTodos(completedTodos);
});

document.getElementById("doing").addEventListener("click", () => {
  const doingTodos = currentTodos.filter((todo) => !todo.completed);
  renderTodos(doingTodos);
});

document.getElementById("reset").addEventListener("click", () => {
  currentTodos = [...todos];
  renderTodos(currentTodos);
});

renderTodos(currentTodos);
