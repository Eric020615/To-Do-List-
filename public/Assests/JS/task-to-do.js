var timer = document.querySelector('#current_date');
var toggle_side_btn = document.querySelector('.toggle-nav-btn');
var sidebar = document.querySelector('.sidebar');
var bg_semidark = document.querySelector('.bg-semidark');

setInterval(()=>{
  let date = new Date();
  timer.innerHTML = date;
},1000);

toggle_side_btn.onclick = function(){
    sidebar.className = "sidebar d-block min-vh-100 col-auto position-fixed sidebar-show";
    bg_semidark.style.display = 'block'
    bg_semidark.onclick = function(){
        this.style.display = "none";
        sidebar.className = "sidebar d-none d-md-block min-vh-100 col-auto position-fixed";
    }

    const auto_close_sideNav = window.matchMedia('(min-width: 767px)');
    function close(e){
        if(e.matches){
            sidebar.className = "sidebar d-none d-md-block min-vh-100 col-auto position-fixed";
            bg_semidark.style.display = 'none';
        }
    };
    auto_close_sideNav.addListener(close);
    close(auto_close_sideNav);
};

let priority_level;
function selectPriority(){
  priority_level = document.querySelector("#progress-dropdown.priority").value;
}
const task_to_do_form = document.querySelector('#task-to-do-form');
const task_to_do_form_container = document.querySelector('.Add-form-container');
const title_error = document.querySelector('#title_error');
const description_error = document.querySelector('#description_error');
const date_error = document.querySelector('#date_error');
const priority_error = document.querySelector('#priority_error');
task_to_do_form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  // check json web token exists and verified
  let user_id = "";
  const title = task_to_do_form.title.value;
  const description = task_to_do_form.description.value;
  const date = task_to_do_form.date.value;
  const progress_level = 0;
  title_error.textContent = '';
  description_error.textContent = '';
  date_error.textContent = '';
  priority_error.textContent = '';

  try{
    const resolve = await fetch('/task-to-do',{
      method: 'POST',
      body: JSON.stringify({user_id,title,description,date,priority_level,progress_level}),
      headers: {'Content-Type':'application/json'}
    });
    const data = await resolve.json();
    if(data.errors){
      title_error.textContent = data.errors.title;
      description_error.textContent = data.errors.description;
      date_error.textContent = data.errors.date;
      priority_error.textContent = data.errors.priority_level;
    }
    if(data.task){
      location.assign('/task');
    }
  }
  catch(err){
    console.log(err);
  }
});

function hideAddForm(event) {
  event.preventDefault(); // Prevent form submission
  var overlay = document.querySelector(".Add-overlay");
  var formContainer = document.querySelector(".Add-form-container");
  overlay.style.display = "none";
  formContainer.style.display = "none";
}

function showAddForm(event) {
  event.preventDefault(); // Prevent form submission
  var overlay = document.querySelector(".Add-overlay");
  var formContainer = document.querySelector(".Add-form-container");
  overlay.style.display = "block";
  formContainer.style.display = "block";
}

function hideEditForm(event) {
  event.preventDefault(); // Prevent form submission
  var overlay = document.querySelector(".Edit-overlay");
  var formContainer = document.querySelector(".Edit-form-container");
  overlay.style.display = "none";
  formContainer.style.display = "none";
}

let task_id,progress_level;
function selectProgress(){
  progress_level = document.querySelector(".progress-level").value;
}

function showEditForm(event,id,title,description,date,progress_level) {
  event.preventDefault(); // Prevent form submission
  var overlay = document.querySelector(".Edit-overlay");
  var formContainer = document.querySelector(".Edit-form-container");
  var edit_form = document.querySelector("#Edit-form");
  var progress = progress_level;
  edit_form.title.value = title;
  edit_form.description.value = description;
  edit_form.date.value = date;
  document.querySelector(".progress-level").value = progress;
  task_id = id;
  overlay.style.display = "block";
  formContainer.style.display = "block";
}

const edit_form = document.querySelector("#Edit-form");
const edit_btn = document.querySelector('#edit-btn');
const edit_form_container = document.querySelector('.Edit-form-container');
edit_btn.addEventListener('click', async (event)=>{
  event.preventDefault();
  let title = edit_form.title.value;
  let description = edit_form.description.value;
  let date = edit_form.date.value;
  const title_error = document.querySelector('.Edit-form .title_error');
  const description_error = document.querySelector('.Edit-form .description_error');
  const date_error = document.querySelector('.Edit-form .date_error');
  const progress_error = document.querySelector('.Edit-form .progress_error');
  title_error.textContent = '';
  description_error.textContent = '';
  date_error.textContent = '';
  progress_error.textContent = '';
  if(edit_form.title.value&&edit_form.description.value&&edit_form.description.value.length<500&&edit_form.date.value&&progress_level){
    try{
      const resolve = await fetch("/edit-task",{
        method: 'POST',
        body: JSON.stringify({task_id,title,description,date,progress_level}),
        headers: {'Content-Type':'application/json'}
      })
      const data = await resolve.json();
      if(data.task_edited){
        this.hideEditForm(event);
        location.assign('/task');
      }
      if(data.errors){
        description_error.textContent = data.errors.description;
      }
    }
    catch(err){
      console.log(err)
    }
  }
  else{
    if(!title){
      title_error.textContent = "Please do not leave title empty."
    }
    if(!description){
      description_error.textContent = "Please do not leave description empty."
    }
    if(description.length>500){
      description_error.textContent = "Please type 500 maximum characters"
    }
    if(!date){
      date_error.textContent = "Please do not leave date empty."
    }
    if(!progress_level){
      progress_error.textContent = "Please do not leave progress level empty."
    }
  }
})

document.querySelector("#delete-btn").addEventListener('click', async (event)=>{
  try{
    // create delete request (await)
    const resolve = await fetch("/task-to-do",{
      method: 'DELETE',
      body: JSON.stringify({task_id}),
      headers: {'Content-Type':'application/json'},
    })
    const data = await resolve.json();
    if(data.task){
      this.hideEditForm(event);
      var overlay = document.querySelector(".delete-success-overlay");
      var formContainer = document.querySelector(".delete-success-container");
      overlay.style.display = "block";
      formContainer.style.display = "block";
    }
    if(data.errors){
      this.hideEditForm(event);
    }
  }
  catch(err){
    console.log(err);
  }
});

function hideDeleteSuccess(event){
  event.preventDefault();
  var overlay = document.querySelector(".delete-success-overlay");
  var formContainer = document.querySelector(".delete-success-container");
  overlay.style.display = "none";
  formContainer.style.display = "none";
  location.assign('/task');
}

document.querySelector('.markasdone').addEventListener('click', async (event)=>{
  event.preventDefault();
  let progress_level = 100;
  try{
    const resolve = await fetch("/done",{
      method: 'POST',
      body: JSON.stringify({task_id,progress_level}),
      headers: {'Content-Type':'application/json'}
    })
    const data = await resolve.json();
    if(data.task_done){
      this.hideEditForm(event);
      location.assign('/task');
    }
  }
  catch(err){
    console.log(err)
  }
})

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