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

const times = document.querySelectorAll('#remaining-time');
for(let time of times){
    let currentTime = new Date().toTimeString();
    let due_hh = parseInt(time.textContent.split((/[:T]/))[1]);
    let due_mm = parseInt(time.textContent.split((/[:T]/))[2]);
    let curr_hh = parseInt(currentTime.split(/[:]/)[0]);
    let curr_mm = parseInt(currentTime.split(/[:]/)[1]);
    let difference =0;
    difference = (due_hh*60+due_mm)-(curr_hh*60+curr_mm);
    let hh = Math.floor(difference/60);
    let mm = difference%60;
    if(hh>0||mm>0){
        time.innerHTML = hh.toString()+"h"+mm.toString()+"min"
    }
    else{
        time.innerHTML = "Times Up"
        time.style.color = "red"
    }
}

async function done_task(task_id){
    let progress_level = 100;
    try{
        const resolve = await fetch("/done",{
            method: 'POST',
            body: JSON.stringify({task_id,progress_level}),
            headers: {'Content-Type':'application/json'}
        })
        const data = await resolve.json();
        if(data.task_done){
            location.assign('/home');
        }
    }
    catch(err){
        console.log(err)
    }
}

async function delete_task(task_id){
    try{
        // create delete request (await)
        const resolve = await fetch("/task-to-do",{
          method: 'DELETE',
          body: JSON.stringify({task_id}),
          headers: {'Content-Type':'application/json'},
        })
        const data = await resolve.json();
        if(data.task){
            showDeleteSuccess();
            setTimeout(dlt,4000);
        }
        if(data.errors){
        }
      }
      catch(err){
        console.log(err);
      }
}


function showDeleteSuccess(){
    var overlay = document.querySelector(".delete-success-overlay");
    var formContainer = document.querySelector(".delete-success-container");
    overlay.style.display = "block";
    formContainer.style.display = "block";
  }

function dlt(){
    location.assign('/home');
}
  
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
  $("#date").html(date + ", " + time + " (Malaysia Time)");
  
  setInterval(function (params) {
    const d = new Date();
    let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    time = d.getHours() + ":" + min + ":" + sec;
    $("#date").html(date + ", " + time + " (Malaysia Time)");
  }, 1000);