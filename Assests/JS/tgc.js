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