const feedbackcontent = document.querySelector('#feedbackcontent');

feedbackcontent.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = feedbackcontent.username.value;
    const email = feedbackcontent.email.value;
    const comments = feedbackcontent.comments.value;
    
    try {
        const response = await fetch('/feedback', {
            method: 'POST',
            body: JSON.stringify({username,email,comments}),
            headers: {'Content-Type':'application/json'}
        });
        const data = await response.json();   
        if (data.feedback) {
            history.go(-1); // 返回上一个页面
        }
        if (data.errors){
            console.log(errors);
        }
    } catch (err) {
        console.log(err);
    }
});
