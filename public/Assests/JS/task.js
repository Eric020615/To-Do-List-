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
var toggle_side_btn = document.querySelector('.toggle-nav-btn');
var sidebar = document.querySelector('.sidebar');
var bg_semidark = document.querySelector('.bg-semidark');

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
task_to_do_form.addEventListener('submit', async (e)=>{
  // check json web token exists and verified
  let user_id = "";
  const title = task_to_do_form.title.value;
  const description = task_to_do_form.description.value;
  const date = task_to_do_form.date.value;
  const progress_level = 0;

  try{
    const resolve = await fetch('/task-to-do',{
      method: 'POST',
      body: JSON.stringify({user_id,title,description,date,priority_level,progress_level}),
      headers: {'Content-Type':'application/json'}
    });
    const data = await resolve.json();
    if(data.errors){
      console.log(data.errors);
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

function hideForm(event) {
  event.preventDefault(); // Prevent form submission
  var overlay = document.querySelector(".overlay");
  var formContainer = document.querySelector(".form-container");

  overlay.style.display = "none";
  formContainer.style.display = "none";
}

function showForm(event) {
  event.preventDefault(); // Prevent form submission
  var overlay = document.querySelector(".overlay");
  var formContainer = document.querySelector(".form-container");

  overlay.style.display = "block";
  formContainer.style.display = "block";
}

