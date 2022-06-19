const nonImpIcon = "far fa-star";
const impIcon = "fas fa-star";
let isImportant = false;

function toggleImportant() {
  if (isImportant) {
    $("#iconImportant").removeClass(impIcon).addClass(nonImpIcon);
    $("#textImportant").text("Not Important!");
    isImportant = false;
  } else {
    $("#iconImportant").removeClass(nonImpIcon).addClass(impIcon);
    $("#textImportant").text("Important!");
    isImportant = true;
  }
}

function toggleVisible() {
  if ($("#taskForm").is(":visible")) {
    $("#taskForm").fadeOut("fast");
    $("#hideButton").text("Show Panel");
  } else {
    $("#taskForm").fadeIn("slow");
    $("#hideButton").text("Hide Panel");
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let duration = $("#txtDuration").val();
  let deadline = $("#txtDeadline").val();
  let location = $("#txtLocation").val();
  let status = $("#selStatus").val();

  let task = new Task(
    0,
    title,
    isImportant,
    duration,
    deadline,
    location,
    status
  );

  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    type: "POST",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (response) {
      let savedTask = JSON.parse(response);
      displayTask(savedTask);
      $("input").val("");
      $("select").val("");
    },
    error: function (error) {
      console.log("Error: ", error);
    },
  });
}

function fetchTasks() {
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    type: "GET",
    success: function (response) {
      let tasks = JSON.parse(response);
      for (i = 0; i < tasks.length; i++) {
        let item = tasks[i];
        if (item.name == "Edgar") {
          displayTask(item);
        }
      }
    },
    error: function (error) {
      console.log("Errror: ", error);
    },
  });
}

function deleteTasks() {
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Edgar",
    type: "DELETE",
    success: function () {
      $("#taskList").html("");
    },
    error: function (error) {
      console.log("Error: ", error);
    },
  });
}

function displayTask(task) {
  let syntax = `
    <div class="card task status-${task.status}">
      <div class="card-header task-header">
        <p>${getTitle(task)}</p>
      </div>
      <div class="class-body task-body">
        <p>✦ <b>Duration:</b> ${task.duration} ${getDuration(task.duration)}</p>
        <p>✦ <b>Deadline:</b> ${task.deadline}</p>
        <p>✦ <b>Location:</b> ${task.location}</p>
        <p>✦ <b>Status:</b> ${getStatus(task.status)}</p>
      </div>
    </div>
  `;

  $("#taskList").append(syntax);
}

function getTitle(task) {
  if (task.isImportant == false) {
    return `${task.title} <i class="far fa-star"></i>`;
  } else if (task.isImportant == true) {
    return `${task.title} <i class="fas fa-star"></i>`;
  }
}

function getDuration(days) {
  if (days == "") {
    return "";
  } else if (days == 1) {
    return "day";
  } else {
    return "days";
  }
}

function getStatus(status) {
  switch (status) {
    case "0":
      return "New";
    case "1":
      return "In Progress";
    case "2":
      return "Blocked";
    case "3":
      return "Completed";
    case "4":
      return "Removed";
    default:
      return "";
  }
}

function testRequest() {
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/",
    type: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log("Error on request: ", error);
    },
  });
}

function init() {
  /* runTests(); */
  fetchTasks();

  $("#iconImportant").click(toggleImportant);
  $("#hideButton").click(toggleVisible);
  $("#saveButton").click(saveTask);
  $("#deleteButton").click(deleteTasks);
}
window.onload = init;
