//collapse-side-nav-btn
var toggle_side_btn = document.querySelector(".toggle-nav-btn");
var sidebar = document.querySelector(".sidebar");
var bg_semidark = document.querySelector(".bg-semidark");

toggle_side_btn.onclick = function () {
  sidebar.className =
    "sidebar d-block min-vh-100 col-auto position-fixed sidebar-show";
  bg_semidark.style.display = "block";
  bg_semidark.onclick = function () {
    this.style.display = "none";
    sidebar.className =
      "sidebar d-none d-md-block min-vh-100 col-auto position-fixed";
  };

  const auto_close_sideNav = window.matchMedia("(min-width: 767px)");
  function close(e) {
    if (e.matches) {
      sidebar.className =
        "sidebar d-none d-md-block min-vh-100 col-auto position-fixed";
      bg_semidark.style.display = "none";
    }
  }
  auto_close_sideNav.addListener(close);
  close(auto_close_sideNav);
};

// Get data from res.render()
var tasksDataElement = document.querySelector(".data").innerHTML;
var tasks = JSON.parse(tasksDataElement);

// Set date and time
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();
let date =
  day[d.getDay()] +
  ", " +
  d.getDate() +
  " " +
  months[d.getMonth()] +
  " " +
  d.getFullYear();
let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
time = d.getHours() + ":" + min + ":" + sec;
$(".head .text-muted").html(date + ", " + time + " (Malaysia Time)");

setInterval(function (params) {
  const d = new Date();
  let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  time = d.getHours() + ":" + min + ":" + sec;
  $(".head .text-muted").html(date + ", " + time + " (Malaysia Time)");
}, 1000);

// show total task
$(".all-task")
  .children("p")
  .html("Total Task: " + tasks.length);

// Initialise the variables that will use later
let numberOfToDo = 0;
let numberOfInPro = 0;
let numberOfComp = 0;

let numberOfHighPrio = 0;
let numberOfMiddlePrio = 0;
let numberOfLowPrio = 0;

let compNumberOfHighPrio = 0;
let compNumberOfMiddlePrio = 0;
let compNumberOfLowPrio = 0;

// create new task function
function createNewTask(title, status, priority, deadline) {
  duedate = deadline.split("T");
  let timing = new Date(deadline).getHours() < 12 ? "am" : "pm";
  let prio = { bg: "", n: "" };
  if (priority == "10") {
    numberOfLowPrio += 1;
    // prio = "1/3";
    prio.n = "Low";
    prio.bg = "bg-primary";
  } else if (priority == "20") {
    numberOfMiddlePrio += 1;
    // prio = "2/3";
    prio.n = "Middle";
    prio.bg = "bg-warning";
  } else {
    numberOfHighPrio += 1;
    // prio = "3/3";
    prio.n = "High";
    prio.bg = "bg-danger";
  }

  let newTask = $("<div>").addClass("col-xl-3 col-lg-4 col-md-6");
  let piece;
  let statusLi;
  // console.log(status);
  if (status == 100) {
    if (priority == "10") {
      compNumberOfLowPrio += 1;
    } else if (priority == "20") {
      compNumberOfMiddlePrio += 1;
    } else {
      compNumberOfHighPrio += 1;
    }
    numberOfComp += 1;
    piece = $("<div>").addClass("piece d-flex flex-nowrap b-green m-auto");
    statusLi = $("<li>")
      .addClass("pb-2")
      .append($("<span>").addClass("badge bg-success").text("Completed"));
  } else if (status > 0) {
    numberOfInPro += 1;
    piece = $("<div>").addClass("piece d-flex flex-nowrap b-blue m-auto");
    statusLi = $("<li>")
      .addClass("pb-2")
      .append(
        $("<span>")
          .addClass("badge bg-primary")
          .text("In-Progress - " + status + " %")
      );
  } else {
    numberOfToDo += 1;
    piece = $("<div>").addClass("piece d-flex b-red m-auto");
    statusLi = $("<li>")
      .addClass("pb-2")
      .append($("<span>").addClass("badge bg-danger").text("To-Do"));
  }
  // piece = $("<div>").addClass("piece d-flex flex-nowrap b-red m-auto");

  let ul = $("<ul>").addClass(
    "d-flex flex-nowrap flex-column justify-content-around max-w-200"
  );
  let titleLi = $("<li>")
    .addClass("pt-2")
    .append($("<h4>").addClass("text-truncate p-1 fw-bold").text(title));
  let priorityLi = $("<li>")
    .addClass("w-50 badge " + prio.bg)
    .text(prio.n);
  let dueDate = $("<li>")
    .addClass("badge bg-light text-black")
    .text("Due Date: " + duedate[0]);
  let dueTime = $("<li>")
    .addClass("badge bg-light text-black")
    .text("Due Time: " + duedate[1] + " " + timing);

  ul.append(titleLi, statusLi, priorityLi, dueDate, dueTime);
  piece.append(ul);
  newTask.append(piece);
  return newTask;
}

// show and initialize all the task
$.each(tasks, function (i, value) {
  console.log(tasks[i]);
  let task_card = createNewTask(
    tasks[i].title,
    tasks[i].progress_level,
    tasks[i].priority_level,
    tasks[i].date
  );
  if (i < 7) {
    $(".all-task").children(".task").append(task_card);
  }
  if (i == 7) {
    let showmore = `<div class="col-xl-3 col-lg-4 col-md-6 showmore">
                        <div class="piece-show-more d-flex flex-nowrap m-auto">
                            <ul class="d-flex flex-column justify-content-around ">
                                <h4 class="pt-3 text-secondary">Show More >></h4>
                            </ul>
                        </div>
                    </div>`;
    $(".all-task").children(".task").append(showmore);
  }
});

$(".task-progress").find(".all").text(tasks.length);
$(".task-progress").find(".to-do").text(numberOfToDo);
$(".task-progress").find(".in-pro").text(numberOfInPro);
$(".task-progress").find(".comp").text(numberOfComp);
console.log(numberOfComp);

function drawTaskReviewChart(all, todo, inpro, comp) {
  if (all == 0) {
    $(".chart").css({
      "background-image": "none",
      "background-color": "#f1f3f2",
    });
  } else {
    let todo_portion = Math.floor((todo / all) * 360);
    let inpro_portion = todo_portion + Math.floor((inpro / all) * 360);
    let comp_portion = 360 - inpro_portion;

    console.log(todo_portion);
    console.log(inpro_portion);
    console.log(comp_portion);

    $(".chart").css(
      "background-image",
      "conic-gradient(red 0deg, red " +
        todo_portion +
        "deg, blue " +
        todo_portion +
        "deg, blue " +
        inpro_portion +
        "deg, green " +
        comp_portion +
        "deg)"
    );
  }
}

drawTaskReviewChart(tasks.length, numberOfToDo, numberOfInPro, numberOfComp);

function drawCompletionRateChart(
  allHigh,
  compHigh,
  allMiddle,
  compMiddle,
  allLow,
  compLow
) {
  let HighPrior_portion = Math.floor((compHigh / allHigh) * 360);
  let MiddlePrior_portion = Math.floor((compMiddle / allMiddle) * 360);
  let LowPrior_portion = Math.floor((compLow / allLow) * 360);

  if (allHigh == 0) {
    $(".prio-high")
      .css({
        "background-image": "none",
        "background-color": "#f1f3f2",
      })
      .children("h1")
      .addClass("fs-4 mt-2")
      .text("No Task Found");

    $(".prio-high")
      .siblings("div")
      .children()
      .eq(0)
      .text("Total " + 0);
    $(".prio-high")
      .siblings("div")
      .children()
      .eq(1)
      .text("Completed " + 0);
    $(".prio-high")
      .siblings("div")
      .children()
      .eq(2)
      .text("Incompleted " + 0);
  } else {
    // $(".prio-high")
    //   .css(
    //     "background-image",
    //     "conic-gradient(rgb(107, 221, 107) 0deg,rgb(107, 221, 107) " +
    //       HighPrior_portion +
    //       "deg,#dc3545 " +
    //       HighPrior_portion +
    //       "deg,#dc3545 360deg)"
    //   )
    //   .children("h1")
    //   .removeClass("fs-4 mt-2")
    //   .text(Math.floor((compHigh / allHigh) * 100) + "%");
    let start = 0;
    let percentage_num = 0;
    let completionvalue = Math.floor((compHigh / allHigh) * 100);
    let progress = setInterval(() => {
      if (percentage_num < completionvalue) {
        percentage_num =
          percentage_num +
          ((HighPrior_portion / 360) * 100) / HighPrior_portion;
      }
      $(".prio-high")
        .css(
          "background-image",
          "conic-gradient(rgb(107, 221, 107) 0deg,rgb(107, 221, 107) " +
            start +
            "deg,#dc3545 " +
            HighPrior_portion +
            "deg,#dc3545 360deg)"
        )
        .children("h1")
        .removeClass("fs-4 mt-2")
        .text(Math.floor(percentage_num) + "%");
      if (start == HighPrior_portion) {
        clearInterval(progress);
      }
      start++;
    }, 15);

    $(".prio-high")
      .siblings("div")
      .children()
      .eq(0)
      .text("Total " + allHigh);
    $(".prio-high")
      .siblings("div")
      .children()
      .eq(1)
      .text("Completed " + compHigh);
    $(".prio-high")
      .siblings("div")
      .children()
      .eq(2)
      .text("Incompleted " + (allHigh - compHigh));
  }

  if (allMiddle == 0) {
    $(".prio-middle")
      .css({
        "background-image": "none",
        "background-color": "#f1f3f2",
      })
      .children("h1")
      .addClass("fs-4 mt-2")
      .text("No Task Found");
    $(".prio-middle")
      .siblings("div")
      .children()
      .eq(0)
      .text("Total " + 0);
    $(".prio-middle")
      .siblings("div")
      .children()
      .eq(1)
      .text("Completed " + 0);
    $(".prio-middle")
      .siblings("div")
      .children()
      .eq(2)
      .text("Incompleted " + 0);
  } else {
    // $(".prio-middle")
    //   .css(
    //     "background-image",
    //     "conic-gradient(rgb(107, 221, 107) 0deg,rgb(107, 221, 107) " +
    //       MiddlePrior_portion +
    //       "deg,#ffc107 " +
    //       MiddlePrior_portion +
    //       "deg,#ffc107 360deg)"
    //   )
    //   .children("h1")
    //   .removeClass("fs-4 mt-2")
    //   .text(Math.floor((compMiddle / allMiddle) * 100) + "%");

    let start = 0;
    let percentage_num = 0;
    let completionvalue = Math.floor((compMiddle / allMiddle) * 100);
    let progress = setInterval(() => {
      if (percentage_num < completionvalue) {
        percentage_num =
          percentage_num +
          ((MiddlePrior_portion / 360) * 100) / MiddlePrior_portion;
      }
      $(".prio-middle")
        .css(
          "background-image",
          "conic-gradient(rgb(107, 221, 107) 0deg,rgb(107, 221, 107) " +
            start +
            "deg,#ffc107 " +
            MiddlePrior_portion +
            "deg,#ffc107 360deg)"
        )
        .children("h1")
        .removeClass("fs-4 mt-2")
        .text(Math.floor(percentage_num) + "%");
      if (start == MiddlePrior_portion) {
        clearInterval(progress);
      }
      start++;
    }, 15);

    $(".prio-middle")
      .siblings("div")
      .children()
      .eq(0)
      .text("Total " + allMiddle);
    $(".prio-middle")
      .siblings("div")
      .children()
      .eq(1)
      .text("Completed " + compMiddle);
    $(".prio-middle")
      .siblings("div")
      .children()
      .eq(2)
      .text("Incompleted " + (allMiddle - compMiddle));
  }

  if (allLow == 0) {
    $(".prio-low")
      .css({
        "background-image": "none",
        "background-color": "#f1f3f2",
      })
      .children("h1")
      .addClass("fs-4 mt-2")
      .text("No Task Found");
    $(".prio-low")
      .siblings("div")
      .children()
      .eq(0)
      .text("Total " + 0);
    $(".prio-low")
      .siblings("div")
      .children()
      .eq(1)
      .text("Completed " + 0);
    $(".prio-low")
      .siblings("div")
      .children()
      .eq(2)
      .text("Incompleted " + 0);
  } else {
    // $(".prio-low")
    //   .css(
    //     "background-image",
    //     "conic-gradient(rgb(107, 221, 107) 0deg,rgb(107, 221, 107) " +
    //       LowPrior_portion +
    //       "deg,blue " +
    //       LowPrior_portion +
    //       "deg,blue 360deg)"
    //   )
    //   .children("h1")
    //   .removeClass("fs-4 mt-2")
    //   .text(Math.floor((compLow / allLow) * 100) + "%");

    let start = 0;
    let percentage_num = 0;
    let completionvalue = Math.floor((compLow / allLow) * 100);
    let progress = setInterval(() => {
      if (percentage_num < completionvalue) {
        percentage_num =
          percentage_num + ((LowPrior_portion / 360) * 100) / LowPrior_portion;
      }
      $(".prio-low")
        .css(
          "background-image",
          "conic-gradient(rgb(107, 221, 107) 0deg,rgb(107, 221, 107) " +
            start +
            "deg,blue " +
            LowPrior_portion +
            "deg,blue 360deg)"
        )
        .children("h1")
        .removeClass("fs-4 mt-2")
        .text(Math.floor(percentage_num) + "%");
      if (start == LowPrior_portion) {
        clearInterval(progress);
      }
      start++;
    }, 15);
    $(".prio-low")
      .siblings("div")
      .children()
      .eq(0)
      .text("Total " + allLow);
    $(".prio-low")
      .siblings("div")
      .children()
      .eq(1)
      .text("Completed " + compLow);
    $(".prio-low")
      .siblings("div")
      .children()
      .eq(2)
      .text("Incompleted " + (allLow - compLow));
  }
}

drawCompletionRateChart(
  numberOfHighPrio,
  compNumberOfHighPrio,
  numberOfMiddlePrio,
  compNumberOfMiddlePrio,
  numberOfLowPrio,
  compNumberOfLowPrio
);

$(".analysis").on("click", function () {
  let fromDate = new Date($(".from-date").val());
  let endDate = new Date($(".end-date").val());
  let task_in_timeframe = tasks;

  filteredArray = task_in_timeframe.filter(function (obj) {
    var date = new Date(obj.date);
    console.log(date);
    return date >= new Date(fromDate) && date <= new Date(endDate);
  });

  console.log(filteredArray);

  let numH = 0;
  let numM = 0;
  let numL = 0;

  let compH = 0;
  let compM = 0;
  let compL = 0;

  $.each(filteredArray, function (i) {
    if (filteredArray[i].priority_level == "10") {
      numL += 1;
    } else if (filteredArray[i].priority_level == "20") {
      numM += 1;
    } else {
      numH += 1;
    }
    if (
      filteredArray[i].priority_level == "10" &&
      filteredArray[i].progress_level == 100
    ) {
      compL += 1;
    } else if (
      filteredArray[i].priority_level == "20" &&
      filteredArray[i].progress_level == 100
    ) {
      compM += 1;
    } else if (
      filteredArray[i].priority_level == "30" &&
      filteredArray[i].progress_level == 100
    ) {
      compH += 1;
    }
  });

  drawCompletionRateChart(numH, compH, numM, compM, numL, compL);

  console.log(numH, compH, numM, compM, numL, compL);
});

function createNewRowTask(no, title, status, priority, deadline, description) {
  duedate1 = deadline.split("T");
  let timing1 = new Date(deadline).getHours() < 12 ? "am" : "pm";
  let prio1 = { name: "", bg: "" };
  if (priority == "10") {
    prio1.name = "Low";
    prio1.bg = "bg-primary";
  } else if (priority == "20") {
    prio1.name = "Middle";
    prio1.bg = "bg-warning";
  } else {
    prio1.name = "High";
    prio1.bg = "bg-danger";
  }
  let status1 = { level: 0, name: "", bg: "" };
  if (status == 100) {
    status1.level = 100;
    status1.name = "Completed";
    status1.bg = "bg-success";
  } else if (status > 0) {
    status1.level = status;
    status1.name = "In-Progress";
    status1.bg = "bg-primary";
  } else {
    status1.level = 0;
    status1.name = "To-Do";
    status1.bg = "bg-danger";
  }

  let no1 = { bg: "" };
  if (no == 1) {
    no1.bg = "bg-danger";
  } else if (no == 2) {
    no1.bg = "bg-warning";
  } else if (no == 3) {
    no1.bg = "bg-primary";
  } else {
    no1.bg = "bg-light text-black";
  }
  var newTask = $(
    '<div class="task-row-form row p-3 b-task shadow-sm slide-down">' +
      '<div class="d-flex m-0 p-0 row">' +
      '<i class="p-0 ' +
      status1.bg +
      '"></i>' +
      '<div class="col-xl-6 col-md-3 col-sm-12 col-12 p-0">' +
      '<h5 class="m-0 d-flex align-items-center"><span class="badge ' +
      no1.bg +
      ' no">' +
      no +
      "</span>" +
      title +
      "</h5>" +
      "</div>" +
      '<div class="col-xl-1 col-md-2 col-sm-3 col-3 d-flex align-items-center p-0">' +
      '<li><span class="badge bg-light text-black">' +
      duedate1[0] +
      "</span></li>" +
      "</div>" +
      '<div class="col-xl-1 col-md-2 col-sm-3 col-3 d-flex align-items-center p-0">' +
      '<li><span class="badge bg-light text-black">' +
      duedate1[1] +
      " " +
      timing1 +
      "</span></li>" +
      "</div>" +
      '<div class="col-xl-1 col-md-2 col-sm-3 col-3 d-flex align-items-center p-0 justify-content-center">' +
      '<li><span class="badge ' +
      status1.bg +
      '">' +
      status1.name +
      "</span></li>" +
      "</div>" +
      '<div class="col-xl-1 col-md-1 col-sm-3 col-3 d-flex align-items-center p-0 justify-content-center">' +
      '<li><span class="badge ' +
      prio1.bg +
      '">' +
      prio1.name +
      "</span></li>" +
      "</div>" +
      '<div class="col-xl-2 col-md-2 col-sm-12 col-12 p-0 d-flex align-items-center p-0">' +
      '<div class="progress w-100 p-0 m-0">' +
      '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success m-0" role="progressbar" style="width: ' +
      status1.level +
      '%" aria-valuenow="' +
      status1.level +
      '" aria-valuemin="0" aria-valuemax="100">' +
      status1.level +
      "%</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="task-description m-0 b-task">' +
      "Description: <br>" +
      description +
      "</div>"
  );

  return newTask;
}

// window.onload = async function (e) {
//   e.preventDefault();
//   try {
//     const res = await fetch("/task-review");
//     console.log(res.query);
//     var examples = JSON.stringify(res.query);
//     // var d = JSON.stringify(query);
//     console.log(examples);
//     // console.log("kkkk"+res.data);
//   fetch("/task-review")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message); // Output: Hello from backend!
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

//   fetch("/task-review")
//     .then((response) => response.json())
//     .then((json) => console.log(JSON.stringify(json)));
// };

// window.onload = async function (e) {
//     e.preventDefault();
//     try {
//       const resolve = await fetch("/task-review", {
//         method: "POST",
//         body: JSON.stringify({
//           user_id,
//           title,
//           description,
//           date,
//           priority_level,
//           progress_level,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await resolve.json();
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
// }
// window.onload = async function (e) {
//     e.preventDefault();
//     try {
//       const resolve = await fetch("/all-task", {
//         method: "POST",
//         body: JSON.stringify({
//           user_id,
//           title,
//           description,
//           date,
//           priority_level,
//           progress_level,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await resolve.json();
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
// }

// $("h4").css("color","red");
// var li = $("<li>1111</li>");
// $("h4").append(li);
function showTaskRowHeader() {
  const header = `<div class="task-row-form row p-3 d-none d-lg-flex">
                        <div class="col-xl-6 col-md-3 col-sm-12 col-12 p-0">
                            <li class="m-0 d-flex align-items-center fw-bolder"><span>No.</span>&nbsp &nbsp &nbsp Title</>
                        </div>
                        <div class="col-xl-1 col-md-2 col-sm-3 col-3 d-flex align-items-center p-0">
                            <li><span class="fw-bolder">Due Date</span> </li>
        
                        </div>
                        <div class="col-xl-1 col-md-2 col-sm-3 col-3 d-flex align-items-center p-0">
                            <li><span class="fw-bolder">Due Time</span> </li>
        
                        </div>
                        <div class="col-xl-1 col-md-2 col-sm-3 col-3 d-flex align-items-center p-0 justify-content-center">
                        <li><span class="fw-bolder">Status</span> </li>
                        </div>
                        <div class="col-xl-1 col-md-1 col-sm-3 col-3 d-flex align-items-center p-0 justify-content-center">
                            <li><span class="fw-bolder">Priority</span> </li>
                        </div>
                        <div class="col-xl-2 col-md-2 col-sm-12 col-12 p-0 d-flex align-items-center p-0 justify-content-center">
                            <li><span class="fw-bolder">Progress</span> </li>
                        </div>

                    
                    </div>`;
  $(".all-task").children(".task").addClass("task-row").append(header);
}

function showTaskRow(task) {
  $(".task-row").off("click");
  $(".all-task").children(".task").slideUp(200);
  $(".all-task").children(".task").slideDown(50);
  $(".all-task").children(".task").empty();
  showTaskRowHeader();
  $.each(task, function (i, value) {
    let task_card = createNewRowTask(
      i + 1,
      task[i].title,
      task[i].progress_level,
      task[i].priority_level,
      task[i].date,
      task[i].description
    );
    $(".all-task").children(".task").addClass("task-row").append(task_card);
  });
  $(".task-row").on("click", ".task-row-form", function (e) {
    $(this).next().slideToggle();

    e.cancelBubble = true;
  });

  $(".task-row-form").each(function (index) {
    $(this)
      .delay(200 * index)
      .slideDown(300, "linear");
  });
}

$(".showmore").on("click", function (e) {
  showTaskRow(tasks);
  e.cancelBubble = true;
});

function sortByDateAsc(array) {
  return array.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByDateDes(array) {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortByPriorityAsc(array) {
  return array.sort((a, b) => a.priority_level - b.priority_level);
}

function sortByPriorityDes(array) {
  return array.sort((a, b) => b.priority_level - a.priority_level);
}

function showTaskPrioAsc(e) {
  let d_t = tasks;
  const sort_priority_tasks = sortByPriorityAsc(d_t);
  showTaskRow(sort_priority_tasks);
  // const sorting = `<div class="sorting-option m-0">
  //                       <span class="fw-bolder">Deadline Sorting : &nbsp &nbsp</span>
  //                       <button class="deadline-sort-asc btn btn-sorting-selected btn-sm">Ascending</but>
  //                       <button class="deadline-sort-des btn btn-light btn-sm">Descending</button>
  //                   </div>`;
  // $(".all-task").children("div").addClass("task-row").prepend(sorting);

  // $(".task-row").on("click", ".deadline-sort-des", function () {
  //   console.log("eeeee");
  // });
  // e.cancelBubble = true;
}

function showTaskPrioDes(e) {
  let d_t = tasks;
  const sort_priority_tasks = sortByPriorityDes(d_t);
  showTaskRow(sort_priority_tasks);
  // e.cancelBubble = true;
}

function showTaskDateAsc(e) {
  let d_t = tasks;
  const sort_dead_tasks = sortByDateAsc(d_t);
  showTaskRow(sort_dead_tasks);
  // e.cancelBubble = true;
}

function showTaskDateDes(e) {
  let d_t = tasks;
  const sort_dead_tasks = sortByDateDes(d_t);
  showTaskRow(sort_dead_tasks);
  // e.cancelBubble = true;
}

function showSortingOption(type) {
  $(".sorting-option").off("click");
  $(".all-task").children(".sorting-option").empty();
  let n;
  if (type == "priority") {
    n = "Priority";
  } else {
    n = "Deadline";
  }

  const sorting =
    '<span class="fw-bolder">' +
    n +
    " Sorting : &nbsp &nbsp</span>" +
    '<button class="deadline-sort-asc btn btn-light btn-sorting-selected btn-sm">Ascending</button>' +
    '<button class="deadline-sort-des btn btn-light btn-sm">Descending</button>';
  $(".all-task").children(".sorting-option").append(sorting);

  $(".sorting-option").on("click", "button", function (e) {
    // $(this)
    //   .children("button")
    //   .eq(0)
    //   .addClass("btn-sorting-selected")
    //   .next()
    //   .removeClass("btn-sorting-selected");

    //   $(this)
    //     .children("button")
    //     .eq(1)
    //     .addClass("btn-sorting-selected")
    //     .prev()
    //     .removeClass("btn-sorting-selected");

    // console.log($(this).children("button").eq(1).html());
    $(this)
      .addClass("btn-sorting-selected")
      .siblings("button")
      .removeClass("btn-sorting-selected");

    if ($(this).html() == "Ascending" && n == "Priority") {
      showTaskPrioAsc();
      // e.cancelBubble = true;
    } else if ($(this).html() == "Descending" && n == "Priority") {
      showTaskPrioDes();
      // e.cancelBubble = true;
    } else if ($(this).html() == "Ascending" && n == "Deadline") {
      showTaskDateAsc();
      // e.cancelBubble = true;
    } else if ($(this).html() == "Descending" && n == "Deadline") {
      showTaskDateDes();
      // e.cancelBubble = true;
    }

    console.log($(this).html() + n);
    //  e.cancelBubble = true;
  });
}
// function showTaskPrioDes(e) {
//   let d_t = tasks;
//   const sort_deadline_tasks = sortByDateDes(d_t);
//   showTaskRow(sort_deadline_tasks);
//   const sorting = `<div class="sorting-option m-0">
//                         <span class="fw-bolder">Deadline Sorting : &nbsp &nbsp</span>
//                         <button class="deadline-sort-asc btn btn-light btn-sm">Ascending</but>
//                         <button class="deadline-sort-des btn btn-sorting-selectedt btn-sm">Descending</button>
//                     </div>`;
//   $(".all-task").children("div").addClass("task-row").prepend(sorting);
//   e.cancelBubble = true;
// }

// $(".sort-deadline").on("click", function (e) {
//   let d_t = tasks;
//   const sort_deadline_tasks = sortByDateAsc(d_t);
//   showTaskRow(sort_deadline_tasks);
//   const sorting = `<div class="sorting-option m-0">
//                         <span class="fw-bolder">Deadline Sorting : &nbsp &nbsp</span>
//                         <button class="deadline-sort-asc btn btn-sorting-selected btn-sm">Ascending</but>
//                         <button class="deadline-sort-des btn btn-light btn-sm">Descending</button>
//                     </div>`;
//   $(".all-task").children("div").addClass("task-row").prepend(sorting);
//   e.cancelBubble = true;
// });

$(".sort-priority").on("click", function (e) {
  showSortingOption("priority");
  showTaskPrioAsc();
  e.cancelBubble = true;
});

$(".sort-deadline").on("click", function (e) {
  showSortingOption("deadline");
  showTaskDateAsc();
  e.cancelBubble = true;
});

$(".sort-default").on("click", function (e) {
  $(".all-task").children(".sorting-option").empty();
  showTaskRow(tasks);
  e.cancelBubble = true;
});

// $(".deadline-sort-des").on("click", function (e) {
//   let d_t = tasks;
//   const sort_deadline_tasks = sortByDateDes(d_t);
//   showTaskRow(sort_deadline_tasks);
//   const sorting = `<div class="sorting-option m-0">
//                       <span class="fw-bolder">Deadline Sorting : &nbsp &nbsp</span>
//                       <button class="deadline-sort-asc btn btn-light btn-sm">Ascending</but>
//                       <button class="deadline-sort-des btn btn-sorting-selected btn-sm">Descending</button>
//                   </div>`;
//   $(".all-task").children("div").addClass("task-row").prepend(sorting);
//   e.cancelBubble = true;
// });

// $(".sort-priority").on("click", function (e) {
//   $(".all-task").children("div").empty();
//   let p_t = tasks;
//   const sort_priority_tasks = sortByPriorityAsc(p_t);
//  showTaskRow(sort_priority_tasks);
//  const sorting = `<div class="sorting-option m-0">
//                         <span class="fw-bolder">Priority Sorting : &nbsp &nbsp</span>
//                         <button class="prio-sort-asc btn btn-sorting-selected btn-sm">Ascending</but>
//                         <button class="prio-sort-des btn btn-light btn-sm">Descending</button>
//                     </div>`;
//  $(".all-task").children("div").addClass("task-row").prepend(sorting);
//   e.cancelBubble = true;
// });
