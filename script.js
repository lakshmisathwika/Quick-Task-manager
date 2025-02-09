document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = { text: taskText, completed: false };
    saveTask(task);
    renderTask(task);

    taskInput.value = "";
}

function renderTask(task) {
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");
    span.onclick = function () {
        task.completed = !task.completed;
        updateTasks();
        renderAllTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function () {
        let newText = prompt("Edit Task:", task.text);
        if (newText) {
            task.text = newText;
            updateTasks();
            renderAllTasks();
        }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        deleteTask(task);
        renderAllTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
    let taskItems = document.querySelectorAll("#taskList li");
    let tasks = [];
    taskItems.forEach((li) => {
        let taskText = li.querySelector("span").textContent;
        let isCompleted = li.querySelector("span").classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));
}

function renderAllTasks() {
    document.getElementById("taskList").innerHTML = "";
    loadTasks();
}

function filterTasks(filter) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => renderTask(task));
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    let darkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkMode);
}

(function () {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
})();
