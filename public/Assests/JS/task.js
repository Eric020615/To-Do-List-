// function hideForm() {
//     var overlay = document.querySelector('.overlay');
//     var formContainer = document.querySelector('.form-container');
//     overlay.style.display = 'none';
//     formContainer.style.display = 'none';
//   }

// function hideForm(event) {
//     event.preventDefault(); // Prevent form submission
//     var overlay = document.querySelector('.overlay');

//     overlay.className = "overlay d-none";
//     addtaskBtn.style.display = 'block';
// }

// function showForm(event) {
//     event.preventDefault(); // Prevent form submission
//     var overlay = document.querySelector('.overlay');
//     var addtaskBtn = document.querySelector('#addtaskBtn');

//     overlay.className = "overlay";
//     addtaskBtn.style.display = 'none';
// }
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
  priority_level = document.querySelector("#progress-dropdown").value;
}

const task_to_do_form = document.querySelector('#task-to-do-form');
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
      var overlay = document.querySelector(".overlay");
      var formContainer = document.querySelector(".form-container");
      overlay.style.display = "none";
      formContainer.style.display = "none";
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

function showEditForm(event) {
  event.preventDefault(); // Prevent form submission
  var overlay = document.querySelector(".Edit-overlay");
  var formContainer = document.querySelector(".Edit-form-container");

  overlay.style.display = "block";
  formContainer.style.display = "block";
}

