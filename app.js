const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText != "") {
    const taskItem = document.createElement("li");
    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;
    taskItem.appendChild(taskLabel);
    taskList.appendChild(taskItem);
    taskInput.value = ""; // Clear the input field

    //* show date
    const date = new Date();
    const dateLabel = document.createElement("span");
    dateLabel.classList.add("date-label");
    dateLabel.textContent = `Date: ${date.toLocaleDateString()}`;
    taskItem.appendChild(dateLabel);

    //* Create and append the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        taskItem.style.textDecoration = "line-through";
        taskItem.style.color = "grey";
        checkbox.setAttribute("disabled", "true");
      }
    });
    taskItem.appendChild(checkbox);

    //* Create and append the edit button
    const taskEditButton = document.createElement("button");
    taskEditButton.textContent = "Edit";
    taskEditButton.classList.add("edit-btn");
    taskEditButton.addEventListener("click", function () {
      const newTaskText = prompt("Edit your task:", taskLabel.textContent);
      if (newTaskText != null && newTaskText.trim() != "") {
        taskLabel.textContent = newTaskText;
      }
    });
    taskItem.appendChild(taskEditButton);

    //* Create and append the save button
    const taskSaveButton = document.createElement("button");
    taskSaveButton.textContent = "Save";
    taskSaveButton.classList.add("save-btn");

    //* When save button is clicked, save the tasks to localstorage
    taskSaveButton.addEventListener("click", function () {
      let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push({
        label: taskLabel.textContent,
        date: dateLabel.textContent,
        completed: checkbox.checked,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      alert("Task saved: " + taskLabel.textContent);
      taskSaveButton.style.display = "none"; // Hide the save button after saving
    });
    taskItem.appendChild(taskSaveButton);

    //* Create and append the delete button
    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.textContent = "Delete";
    taskDeleteButton.classList.add("delete-btn");
    taskDeleteButton.addEventListener("click", function () {
      taskItem.remove();
    });
    taskItem.appendChild(taskDeleteButton);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  //* load tasks from local storage
  let savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  savedTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    const taskLabel = document.createElement("label");
    taskLabel.textContent = task.label;
    taskItem.appendChild(taskLabel);

    const dateLabel = document.createElement("span");
    dateLabel.classList.add("date-label");
    dateLabel.textContent = task.date;
    taskItem.appendChild(dateLabel);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    if (task.completed) {
      taskItem.style.textDecoration = "line-through";
      taskItem.style.color = "grey";
      checkbox.setAttribute("disabled", "true");

        //* update checkbox in localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks = tasks.map((t) => {
            if(t.label === taskLabel.textContent){
                return{
                    ...t,
                    completed: true,
                };
            }
            return t;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));

    } else {
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskItem.style.textDecoration = "line-through";
          taskItem.style.color = "grey";
          checkbox.setAttribute("disabled", "true");

          //* update checkbox in localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks = tasks.map((t) => {
            if(t.label === taskLabel.textContent){
                return{
                    ...t,
                    completed: true,
                };
            }
            return t;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        }
      });
    }

    taskItem.appendChild(checkbox);

    const taskEditButton = document.createElement("button");
    taskEditButton.textContent = "Edit";
    taskEditButton.classList.add("edit-btn");
    taskEditButton.addEventListener("click", function () {
      const newTaskText = prompt("Edit your task: ", taskLabel.textContent);
      if (newTaskText != null && newTaskText.trim() != "") {
        taskLabel.textContent = newTaskText;
      }
    });
    taskItem.appendChild(taskEditButton);

    //! Save
    const taskSaveButton = document.createElement("button");
    taskSaveButton.textContent = "Save";
    taskSaveButton.classList.add("save-btn");
    taskSaveButton.addEventListener("click", function () {
      let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

      //* Check if tasks already exits
      const existingTasks = tasks.findIndex(
        (t) => t.label === taskLabel.textContent
      );

      if (existingTasks !== -1) {
        //* Tasks exist - just update it
        tasks[existingTasks] = {
          label: taskLabel.textContent,
          date: dateLabel.textContent,
          completed: checkbox.checked,
        };
      } else {
        tasks.push({
          label: taskLabel.textContent,
          date: dateLabel.textContent,
          completed: checkbox.checked,
        });
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
      alert("Task saved: " + taskLabel.textContent);
      taskSaveButton.style.display = "none";
    });
    taskItem.appendChild(taskSaveButton);

    //! Delete
    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.textContent = "Delete";
    taskDeleteButton.classList.add("delete-btn");
    taskDeleteButton.addEventListener("click", function () {
      //* remove from DOM
      taskItem.remove();

      //*remove from localStorage
      let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks = tasks.filter((t) => t.label !== taskLabel.textContent);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    taskItem.appendChild(taskDeleteButton);

    taskList.appendChild(taskItem);
  });
});
