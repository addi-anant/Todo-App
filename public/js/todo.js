const input = document.getElementById("addTaskInput");
const button = document.getElementById("addTaskButton");
const taskContainer = document.getElementById("taskContainer");

// fetch all the todo from the server and display them to the user:
const fetchAllTodo = async () => {
  const response = await fetch("/fetchAllTodo", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const todoList = await response.json();

  todoList.forEach((todo) => {
    addToDOM(todo._id, todo.task, todo.file, todo.completed);
  });
};
fetchAllTodo();

// adding a new todo to the DOM.
const addToDOM = function (id, task, file, completed) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");

  const note = document.createElement("p");
  note.innerHTML = task;
  note.classList.add("note");
  note.setAttribute("noteId", id);
  if (completed) note.classList.add("strike");

  const taskImg = document.createElement("img");
  taskImg.classList.add("taskImg");
  taskImg.src = file;

  const strikeThrough = document.createElement("input");
  strikeThrough.setAttribute("type", "checkbox");
  if (completed) strikeThrough.checked = true;
  strikeThrough.addEventListener("change", function () {
    this.checked ? markDone(note, taskDiv) : markPending(note, taskDiv);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";

  deleteButton.addEventListener("click", function () {
    const id = taskDiv.firstElementChild.getAttribute("noteId");
    console.log(id);

    fetch("deleteTask", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) taskContainer.removeChild(taskDiv);
    });
  });

  taskDiv.appendChild(note);
  taskDiv.appendChild(taskImg);
  taskDiv.appendChild(strikeThrough);
  taskDiv.appendChild(deleteButton);
  taskContainer.appendChild(taskDiv);
};

// delete todo:
const buttonList = document.getElementsByClassName("delete");
for (let i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener("click", async function () {
    const id = taskDiv.firstElementChild.getAttribute("noteId");

    const response = await fetch("/deleteTask", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) window.location.reload();
  });
}

// mark a todo as completed.
const markDone = async (note, taskDiv) => {
  const id = taskDiv.firstElementChild.getAttribute("noteId");

  const response = await fetch("/markCompleted", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 200) note.classList.add("strike");
  else console.log("Error occured while marking todo as completed.");
};

// mark a todo as pending.
const markPending = async (note, taskDiv) => {
  const id = taskDiv.firstElementChild.getAttribute("noteId");

  const response = await fetch("/markPending", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 200) note.classList.remove("strike");
  else console.log("Error occured while marking todo as pending.");
};

// logout:
document.getElementById("logout").addEventListener("click", async () => {
  await fetch("/logout");
  window.location.replace("/login");
});
