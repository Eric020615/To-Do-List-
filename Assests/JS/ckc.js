//Navbar-toggler Button Function
// const navbarToggler = document.querySelector(".navbar-toggler");
// const navbarCollapse = document.querySelector(".navbar-collapse");

// navbarToggler.addEventListener("click", function() {
//     if (navbarCollapse.classList.contains("show")) {
//         navbarCollapse.classList.remove("show");
//     } else {
//         navbarCollapse.classList.add("show");
//     }
// });

//collapse-side-nav-btn
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
            }
            auto_close_sideNav.addListener(close);
            close(auto_close_sideNav);
        }

//collapse-side-nav-btn

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

