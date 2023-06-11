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

const change_password_form = document.querySelector('#change-password')
change_password_form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const previous_password = change_password_form.previous_password.value;
    const new_password = change_password_form.new_password.value;
    try{
        const resolve = await fetch('/change_password',{
            method: "POST",
            body: JSON.stringify({previous_password,new_password}),
            headers: {'Content-Type':'application/json'}
        });
        const success = await resolve.json();
        if(success.status){
            password_text_show.classList.remove("show");
            password_part_show.classList.remove("show");
        }
        if(success.errors){
            document.querySelector('.change-password-error').textContent = success.errors.password;
        }
    }
    catch(err){
        console.log(err);
    }
})

let glob_email;
const delete_account_form = document.querySelector('#delete-account-form');
delete_account_form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const email = delete_account_form.confirmation_email.value;
    glob_email = email;
    try{
        const resolve = await fetch('/verify_email',{
            method: "POST",
            body: JSON.stringify({email}),
            headers: {'Content-Type':'application/json'}
        })
        const status = await resolve.json();
        if(status.status!=""){
            document.querySelector(".email-error").innerHTML = ""
            var overlay = document.querySelector(".delete-success-overlay");
            var formContainer = document.querySelector(".delete-success-container");
            overlay.style.display = "block";
            formContainer.style.display = "block";
        }
        else{
            document.querySelector(".email-error").innerHTML = "Wrong Email Address"
        }
    }
    catch(err){
    }
});

const confirmation_delete_account_form = document.querySelector('#confirm-delete-form');
confirmation_delete_account_form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const confirm = confirmation_delete_account_form.delete_text.value;
    try{
        if(confirm=="DELETE"){
            const resolve = await fetch('/delete_account',{
                method: "DELETE",
                body: JSON.stringify({glob_email}),
                headers: {'Content-Type':'application/json'}
            })
            const status = await resolve.json();
            if(status.delete_status){
                location.assign('/logout');
            }
        }
        else{
            document.querySelector('.error').innerHTML = "Please Type DELETE"
        }
    }
    catch(err){
        console.log(err);
    }
});

let password_text_show = document.querySelector("#text-show-password");
let password_part_show = document.querySelector("#part-show-password");
password_text_show.addEventListener('click',()=>{
    password_text_show.classList.add("show");
    password_part_show.classList.add("show");
})
let email_text_show = document.querySelector("#text-show-email");
let email_part_show = document.querySelector("#part-show-email");
email_text_show.addEventListener('click',()=>{
    email_text_show.classList.add("show");
    email_part_show.classList.add("show");
})


function hideDeleteSuccess(event){
    event.preventDefault();
    var overlay = document.querySelector(".delete-success-overlay");
    var formContainer = document.querySelector(".delete-success-container");
    overlay.style.display = "none";
    formContainer.style.display = "none";
}