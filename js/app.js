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
    $("#taskForm").hide();
    $("#hideButton").text("Show Panel");
  } else {
    $("#taskForm").show();
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

  displayTask(task);

  $("input").val("");
  $("select").val("");
}

function displayTask(task) {
  let syntax = `
    <div class="card task">
      <div class="card-header task-header">
        <p>${task.title}</p>
      </div>
      <div class="class-body task-body">
        <p>✦ ${task.isImportant}</p>
        <p>✦ ${task.duration}</p>
        <p>✦ ${task.deadline}</p>
        <p>✦ ${task.location}</p>
        <p>✦ ${task.status}</p>
      </div>
    </div>
  `;

  $("#taskList").append(syntax);
}

function init() {
  /* runTests(); */

  $("#iconImportant").click(toggleImportant);
  $("#hideButton").click(toggleVisible);
  $("#saveButton").click(saveTask);
}
window.onload = init;
