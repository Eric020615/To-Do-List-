const forgot_password_form = document.querySelector('#forgot-password-form');
const email_error = document.querySelector('.email-error');
const email_input = document.querySelector('.user-input');
const email_submit = document.querySelector('.sign-in-button');
forgot_password_form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    // reset errors
    email_error.textContent = '';
    // get value (form.email(input(name))=>value)
    const email = forgot_password_form.email.value;
    try{
        // fetch() make asynchrounous requests to server
        // load information that is returned by server onto web pages
        // it return a promise
        const resolve = await fetch('/forgot-password',{
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {'Content-Type':'application/json'}
        });
        const data = await resolve.json();
        if(data.payload){
            email_input.style.display = "none";
            email_submit.style.display = "none";
            email_error.innerHTML = "Password reset link has been sent to your email."
        }
        if(!data.payload){
            email_error.innerHTML = 'Wrong email address';
        }
    }
    catch(err){
        console.log(err);
    }
})