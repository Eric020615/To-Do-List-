// register
// function SignUpSuccess(){
//     var allInput = document.getElementsByTagName('input');
//     var detect = false;
//     for(var i = 0; i < allInput.length ;i++){
//         if(allInput[i].value == ''){
//             detect = true;
//             break;
//         }
//     }
//     if(detect){
//         alert('Please make sure you have filled all the blanks.');
//     }
//     else{
//         if(pwd1.value == pwd2.value){
//             open(".html","_self");
//         }
        
//         else{
//             alert("Please make sure you type the same password for the both password spaces.");
//         }
//     }
// }
const sign_up_form = document.querySelector('#sign-up-form');
const email_error = document.querySelector('.email-error');
const phone_num_error = document.querySelector('.phone-num-error');
const passoword_error = document.querySelector('.password-error');
sign_up_form.addEventListener('submit', async (e)=>{
    // prevent default action (refresh page)
    e.preventDefault();
    // reset errors
    email_error.textContent = '';
    phone_num_error.textContent = '';
    passoword_error.textContent = '';
    // get value (form.email(input)=>value)
    const email = sign_up_form.email.value;
    const phone_num = sign_up_form.phone_num.value;
    const password = sign_up_form.password.value;
    try{
        // fetch() make asynchrounous requests to server
        // load information that is returned by server onto web pages
        // it return a promise
        const resolve = await fetch('/signup',{
            method: 'POST',
            body: JSON.stringify({email, phone_num, password}),
            headers: {'Content-Type':'application/json'}
        });
        const data = await resolve.json();
        if(data.errors){
            email_error.textContent = data.errors.email;
            phone_num_error.textContent = data.errors.phone_num;
            passoword_error.textContent = data.errors.password;
        }
        if(data.user){
            location.assign('/home');
        }
    }
    catch(err){
        console.log(err);
    }
});


// function SignInSuccess(){
//     var allInput = document.getElementsByTagName('input');
//     var detect = false;
//     for(var i = 0; i < allInput.length ;i++){
//         if(allInput[i].value == ''){
//             detect = true;
//             break;
//         }
//     }
//     if(detect){
//         alert('Please make sure you have filled all the blanks.');
//     }
//     else{
//         open("home.html","_self");
//     }
// }

// // feedback
// function FeedBackSuccess(){
//     close("_self");
// }

// // About us
// function gotoFeedBack(){
//     open("feedback.html","_blank");
// }

// // Nav
// // collapse-side-nav-btn
// var toggle_side_btn = document.querySelector('.toggle-nav-btn');
// var sidebar = document.querySelector('.sidebar');
// var bg_semidark = document.querySelector('.bg-semidark');

// toggle_side_btn.onclick = function(){
//     sidebar.className = "sidebar d-block min-vh-100 col-auto position-fixed sidebar-show";
//     bg_semidark.style.display = 'block'
//     bg_semidark.onclick = function(){
//         this.style.display = "none";
//         sidebar.className = "sidebar d-none d-md-block min-vh-100 col-auto position-fixed";
//     };

//     const auto_close_sideNav = window.matchMedia('(min-width: 767px)');
//     function close(e){
//         if(e.matches){
//             sidebar.className = "sidebar d-none d-md-block min-vh-100 col-auto position-fixed";
//             bg_semidark.style.display = 'none';
//         }
//     };
//     auto_close_sideNav.addListener(close);
//     close(auto_close_sideNav);
// };