// function hideForm() {
//     var overlay = document.querySelector('.overlay');
//     var formContainer = document.querySelector('.form-container');
//     overlay.style.display = 'none';
//     formContainer.style.display = 'none';
//   }

function hideForm(event) {
    event.preventDefault(); // Prevent form submission
    var overlay = document.querySelector('.overlay');
    var formContainer = document.querySelector('.form-container');

    overlay.style.display = 'none';
    formContainer.style.display = 'none';
}

function showForm(event) {
    event.preventDefault(); // Prevent form submission
    var overlay = document.querySelector('.overlay');
    var formContainer = document.querySelector('.form-container');

    overlay.style.display = 'block';
    formContainer.style.display = 'block';
}