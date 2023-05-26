const log_in_form = document.querySelector('#sign-in-form');
const email_error = document.querySelector('.email-error');
const passoword_error = document.querySelector('.password-error');
log_in_form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    // reset errors
    email_error.textContent = '';
    passoword_error.textContent = '';
    // get value (form.email(input(name))=>value)
    const email = log_in_form.email.value;
    const password = log_in_form.password.value;
    try{
        // fetch() make asynchrounous requests to server
        // load information that is returned by server onto web pages
        // it return a promise
        const resolve = await fetch('/login',{
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json'}
        });
        const data = await resolve.json();
        if(data.errors){
            email_error.textContent = data.errors.email;
            passoword_error.textContent = data.errors.password;
        }
        if(data.user){
            location.assign('/home');
        }
    }
    catch(err){
        console.log(err);
    }
})