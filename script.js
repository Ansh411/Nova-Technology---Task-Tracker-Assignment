const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const prioritySelect = document.getElementById("priority-select");
const list = document.getElementById("task-list");
const empty = document.getElementById("empty");
const counts = document.getElementById("counts");
const filters = document.querySelectorAll(".filter");
const clearBtn = document.getElementById("clear-completed");

const modal = document.getElementById("modal");
const editForm = document.getElementById("edit-form");
const editText = document.getElementById("edit-text");
const editDate = document.getElementById("edit-date");
const editPriority = document.getElementById("edit-priority");
const modalCancel = document.getElementById("modal-cancel");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";
let editingId = null;

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  let filtered = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  empty.style.display = filtered.length ? "none" : "block";

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div class="task-left">
        <span class="priority ${task.priority}">${task.priority}</span>
        <strong>${task.text}</strong>
        <small>${task.due || "No due date"}</small>
      </div>
      <div class="task-actions">
        <button onclick="toggle('${task.id}')">✔</button>
        <button onclick="edit('${task.id}')">✎</button>
        <button onclick="removeTask('${task.id}')">✖</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateCounts();
}

function updateCounts() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  counts.textContent = `${total} total • ${total - done} active • ${done} done`;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  tasks.push({
    id: Date.now().toString(),
    text: input.value,
    due: dateInput.value,
    priority: prioritySelect.value,
    completed: false
  });
  input.value = "";
  dateInput.value = "";
  prioritySelect.value = "normal";
  save();
  render();
});

function toggle(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  save();
  render();
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function edit(id) {
  const task = tasks.find(t => t.id === id);
  editingId = id;
  editText.value = task.text;
  editDate.value = task.due;
  editPriority.value = task.priority;
  modal.classList.add("open");
}

editForm.addEventListener("submit", e => {
  e.preventDefault();
  const task = tasks.find(t => t.id === editingId);
  task.text = editText.value;
  task.due = editDate.value;
  task.priority = editPriority.value;
  save();
  render();
  modal.classList.remove("open");
});

modalCancel.addEventListener("click", () => modal.classList.remove("open"));

filters.forEach(btn =>
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  })
);

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
});

render();
