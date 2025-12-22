// app.js
// This file controls what the app does.
// Students will fill in the logic for adding, updating, and deleting tasks.

// The array where all tasks will be stored
let tasks = [];

// ID counter for new tasks
let nextTaskId = 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-task-form");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");

  const titleInput  = document.getElementById("task-title");
  const categoryInput = document.getElementById("task-category");
  const dueDateInput = document.getElementById("task-due-date");
  // When starting the app:
  // - Load tasks from localStorage
  // - Update nextTaskId so it doesn't conflict
  // - Show tasks on the page
  // TODO: Load tasks and render them
  tasks = loadTasks();

  let highestID = 0;

  for (let i = 0; i < tasks.length; i++){
    if (tasks[i].id > highestID) {
      highestID = tasks[i].id;
    }
  }
  nextTaskId =highestID + 1;

  renderTasks(tasks, taskList, emptyState);

  // When the user submits the form to add a task:
  form.addEventListener("submit", (event) => {
    event.preventDefault();


    // What should happen here:
    // - Read values from the form (title, category, due date)
    // - Validate that the title is not empty
    // - Create a new task object
    // - Add it to the tasks array
    // - Save updated tasks to localStorage
    // - Update the page to show the new task
    // - Clear the form
    // TODO: Add a new task

    const title = titleInput.value;
    const category = categoryInput.value;
    const dueDate = dueDateInput.value;

    if (title ==="") {
      return;
    }

    const newTask = {
      id: nextTaskId,
      title: title,
      category: category,
      dueDate: dueDate,
      completed: false
    };

    tasks.push(newTask);

    nextTaskId++;

    saveTasks(tasks);
    renderTasks(tasks, taskList, emptyState);
  });



  // When clicking inside the task list (“event delegation”):
  taskList.addEventListener("click", (event) => {
    const target = event.target;
    const listItem = target.closest(".task-item");
    if (!listItem) return;

    const taskId = Number(listItem.dataset.id);

    // If the checkbox was clicked:
    if (target.classList.contains("task-checkbox")) {
      // What should happen here:
      // - Find the matching task in the array
      // - Toggle its completed state
      // - Save updated tasks
      // - Update the page
      // TODO: Toggle completed state
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
          tasks[i].completed = !tasks[i].completed;
          break;
        }
      }
    saveTasks(tasks);
    renderTasks(tasks, taskList, emptyState);
      return;
    }

    // If the delete button was clicked:
    if (target.classList.contains("task-delete-btn")) {
      // What should happen here:
      // - Remove the task from the tasks array
      // - Save updated tasks
      // - Update the page
      // TODO: Delete the task
      const updatedTasks = [];

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== taskId) {
          updatedTasks.push(tasks[i]);
        }
      }

      tasks = updatedTasks;
      saveTasks(tasks);
      renderTasks(tasks,taskList, emptyState);
      return;
    }
  });
});

