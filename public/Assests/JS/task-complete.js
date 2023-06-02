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

async function clear_task(){
    try{
        const resolve = await fetch('/task-to-complete',{
            method: 'DELETE',
        });
        if(resolve.status==200){
            location.assign('/task-to-complete');
        }
    }
    catch(err){
        console.log(err);
    }
}

// setInterval(()=>{
//   let date = new Date();
//   timer.innerHTML = date;
// },1000);

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
$(".text-muted").html(date + ", " + time + " (Malaysia Time)");

setInterval(function (params) {
  const d = new Date();
  let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  time = d.getHours() + ":" + min + ":" + sec;
  $(".text-muted").html(date + ", " + time + " (Malaysia Time)");
}, 1000);



