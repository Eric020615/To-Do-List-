//Navbar-toggler Button Function
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggler.addEventListener("click", function() {
    if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
    } else {
        navbarCollapse.classList.add("show");
    }
});

//Delete-acc button function
const openModalBtn = document.getElementById('delete-btn');
const closeModalBtn = document.getElementById('cancel-btn');
const modalOverlay = document.getElementById('modal-overlay');

function openModal() {
  modalOverlay.style.display = 'block';
  modal.style.display = 'block';
}

function closeModal() {
  modalOverlay.style.display = 'none';
  modal.style.display = 'none';
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

