// register
function SignUpSuccess(){
    var allInput = document.getElementsByTagName('input');
    var detect = false;
    for(var i = 0; i < allInput.length ;i++){
        if(allInput[i].value == ''){
            detect = true;
            break;
        }
    }
    if(detect){
        alert('Please make sure you have filled all the blanks.');
    }
    else{
        if(pwd1.value == pwd2.value){
            open("intro.html","_self");
        }
        
        else{
            alert("Please make sure you type the same password for the both password spaces.");
        }
    }
}

// login

function gotoSignUp(){
    open("register.html","_self");
}

function SignInSuccess(){
    var allInput = document.getElementsByTagName('input');
    var detect = false;
    for(var i = 0; i < allInput.length ;i++){
        if(allInput[i].value == ''){
            detect = true;
            break;
        }
    }
    if(detect){
        alert('Please make sure you have filled all the blanks.');
    }
    else{
        open("task_review.html","_self");
    }
}

// feedback
function FeedBackSuccess(){
    close("_self");
}

// About us
function gotoFeedBack(){
    open("feedback.html","_blank");
}

// Nav
// collapse-side-nav-btn
var toggle_side_btn = document.querySelector('.toggle-nav-btn');
var sidebar = document.querySelector('.sidebar');
var bg_semidark = document.querySelector('.bg-semidark');

toggle_side_btn.onclick = function(){
    sidebar.className = "sidebar d-block min-vh-100 col-auto position-fixed sidebar-show";
    bg_semidark.style.display = 'block'
    bg_semidark.onclick = function(){
        this.style.display = "none";
        sidebar.className = "sidebar d-none d-md-block min-vh-100 col-auto position-fixed";
    };

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