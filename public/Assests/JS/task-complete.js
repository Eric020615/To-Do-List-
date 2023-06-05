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



