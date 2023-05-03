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
        open("intro.html","_self");
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