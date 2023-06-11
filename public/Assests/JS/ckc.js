//collapse-side-nav-btn
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
    };
    auto_close_sideNav.addListener(close);
    close(auto_close_sideNav);
};

//collapse-side-nav-btn

//Delete-acc button function
const openModalBtn = document.getElementById('delete_btn');
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


// var userInfoData = document.querySelector(".data").innerHTML;
// var user_info = JSON.parse(userInfoData);
// console.log(user_info);

$("#btn-edit").on("click", function(){
     $(".profile-details label input")
       .removeClass("d-none");
     $("h5").addClass("d-none");
     $("h5").eq(3).removeClass("d-none");
     $("#btn-save").removeClass("d-none");
     $(this).addClass("d-none");
});

$("#btn-save").on("click", async function (event) {
   $(".profile-details label input").addClass("d-none");
   $("h5").removeClass("d-none");
  $("#btn-edit").removeClass("d-none");

  event.preventDefault();
  let email = $("#email").text();
  let username = $("#name").val();
  let contact_num = $("#phone-num").val();
  let date_of_birth = new Date($("#dob").val());
  if (username && contact_num && date_of_birth) {
         try {
           const resolve = await fetch("/edit-profile", {
             method: "POST",
             body: JSON.stringify({
               email,
               username,
               contact_num,
               date_of_birth,
             }),
             headers: { "Content-Type": "application/json" },
           });
           const data = await resolve.json();
           if (data.profile_edited) {
             // this.hideEditForm(event);
             location.assign("/profile");
           }
           if (data.errors) {
             description_error.textContent = data.errors.description;
           }
         } catch (err) {
           console.log(err);
         }
        }
  $(this).addClass("d-none");
});

// update = 0;
// $(".btn-update-container").on("click",async function(event){
//   if(update == 0 ){
//      $(".profile-details label input")
//        .removeClass("d-none").val($(this).siblings('h5').text());
//      $("h5").addClass("d-none");
//      $("h5").eq(3).removeClass("d-none");
//      $(".btn-update-container button").text("Save Profile Details");
//      update = 1;
//   }else if(update == 1){
//       $(".profile-details label input").addClass("d-none");
//       $("h5").removeClass("d-none");
      //  event.preventDefault();
      //  let email = $("#email").text();
      //  let username = $("#name").val();
      //  let contact_num = $("#phone-num").val();
      //  let date_of_birth = $("#dob").val();
//        // const title_error = document.querySelector(".Edit-form .title_error");
//        // const description_error = document.querySelector(
//        //   ".Edit-form .description_error"
//        // );
//        // const date_error = document.querySelector(".Edit-form .date_error");
//        // const progress_error = document.querySelector(".Edit-form .progress_error");
//        // title_error.textContent = "";
//        // description_error.textContent = "";
//        // date_error.textContent = "";
//        // progress_error.textContent = "";
      //  if (username && contact_num && date_of_birth) {
      //    try {
      //      const resolve = await fetch("/edit-profile", {
      //        method: "POST",
      //        body: JSON.stringify({
      //          email,
      //          username,
      //          contact_num,
      //          date_of_birth,
      //        }),
      //        headers: { "Content-Type": "application/json" },
      //      });
      //      const data = await resolve.json();
      //      if (data.profile_edited) {
      //        // this.hideEditForm(event);
      //        location.assign("/profile");
      //      }
      //      if (data.errors) {
      //        description_error.textContent = data.errors.description;
      //      }
      //    } catch (err) {
      //      console.log(err);
      //    }
//          // } else {
//          //   if (!title) {
//          //     title_error.textContent = "Please do not leave title empty.";
//          //   }
//          //   if (!description) {
//          //     description_error.textContent = "Please do not leave description empty.";
//          //   }
//          //   if (description.length > 500) {
//          //     description_error.textContent = "Please type 500 maximum characters";
//          //   }
//          //   if (!date) {
//          //     date_error.textContent = "Please do not leave date empty.";
//          //   }
//          //   if (!progress_level) {
//          //     progress_error.textContent = "Please do not leave progress level empty.";
//          //   }
//        }
//       $(".btn-update-container button").text("Edit Profile Details");
//       update = 0;
//   }
 
// });

// const edit_profile_btn = document.querySelector("#btn-update");

// edit_profile_btn.addEventListener("click", async (event) => {
//   event.preventDefault();
//   let email = $("#email").text();
//   let username = $("#name").val();
//   let contact_num = $("#phone-num").val();
//   let date_of_birth = $("#dob").val();
//   // const title_error = document.querySelector(".Edit-form .title_error");
//   // const description_error = document.querySelector(
//   //   ".Edit-form .description_error"
//   // );
//   // const date_error = document.querySelector(".Edit-form .date_error");
//   // const progress_error = document.querySelector(".Edit-form .progress_error");
//   // title_error.textContent = "";
//   // description_error.textContent = "";
//   // date_error.textContent = "";
//   // progress_error.textContent = "";
//   if (
//     username &&
//     contact_num &&
//     date_of_birth
//   ) {
//     try {
//       const resolve = await fetch("/edit-profile", {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//           username,
//           contact_num,
//           date_of_birth,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await resolve.json();
//       if (data.task_edited) {
//         // this.hideEditForm(event);
//         location.assign("/profile");
//       }
//       if (data.errors) {
//         description_error.textContent = data.errors.description;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   // } else {
//   //   if (!title) {
//   //     title_error.textContent = "Please do not leave title empty.";
//   //   }
//   //   if (!description) {
//   //     description_error.textContent = "Please do not leave description empty.";
//   //   }
//   //   if (description.length > 500) {
//   //     description_error.textContent = "Please type 500 maximum characters";
//   //   }
//   //   if (!date) {
//   //     date_error.textContent = "Please do not leave date empty.";
//   //   }
//   //   if (!progress_level) {
//   //     progress_error.textContent = "Please do not leave progress level empty.";
//   //   }
//   }
// });