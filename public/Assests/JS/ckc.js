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
// const openModalBtn = document.getElementById('delete_btn');
// const closeModalBtn = document.getElementById('cancel-btn');
// const modalOverlay = document.getElementById('modal-overlay');

// function openModal() {
//   modalOverlay.style.display = 'block';
//   modal.style.display = 'block';
// }

// function closeModal() {
//   modalOverlay.style.display = 'none';
//   modal.style.display = 'none';
// }

// openModalBtn.addEventListener('click', openModal);
// closeModalBtn.addEventListener('click', closeModal);


$("#btn-edit").on("click", function(){
     $(".profile-details label input")
       .removeClass("d-none");
     $(".profile-details h4").addClass("d-none");
     $(".profile-details h4").eq(4).removeClass("d-none");
     $("#btn-save").removeClass("d-none");
     $(this).addClass("d-none");
     console.log("ggggg");
});

$("#btn-save").on("click", async function (event) {

  event.preventDefault();
  let email = $("#email").text();
  let username = $("#name").val().trim();
  let contact_num = $("#phone-num").val().trim();
  let date_of_birth = $("#dob").val();

  if(username == ""){
     $(".name-empty-warning").removeClass("d-none");
  }else{
    $(".name-empty-warning").addClass("d-none");
  }

  if (contact_num == "") {
      $(".phone-empty-warning").removeClass("d-none");
  } else {
      $(".phone-empty-warning").addClass("d-none");
  }

  if (date_of_birth == "") {
    date_of_birth = "";
    $(".date-empty-warning").removeClass("d-none");
  } else {
    date_of_birth = new Date(date_of_birth);
    $(".date-empty-warning").addClass("d-none");
      date_of_birth = new Date($("#dob").val());
  }

  if (username != "" && contact_num != "" && date_of_birth != "") {
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
      location.assign("/profile");
      // if (data.profile_edited) {
      //   // location.assign("/profile");
      // }
      if (data.errors) {
        description_error.textContent = data.errors.description;
      }
    } catch (err) {
      console.log(err);
    }
    $(".profile-details label input").addClass("d-none");
    $(".profile-details h4").removeClass("d-none");
    $("#btn-edit").removeClass("d-none");
    $(this).addClass("d-none");
  } 

});

// $("#btn-upload-image").on("click", async function (event){
//   event.preventDefault();
//     try {
//       const resolve = await fetch("/upload-image", {
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
//       if (data.profile_edited) {
//         location.assign("/profile");
//       }
//       if (data.errors) {
//         description_error.textContent = data.errors.description;
//       }
//     } catch (err) {
//       console.log(err);
//     }
// });


document.querySelector(".profile-pic-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();
  if (document.querySelector('input[type="file"]').files[0] == undefined){
    $(".file-empty-warning").removeClass("d-none");
    return;
  }else{
    $(".file-empty-warning").addClass("d-none");
  }
  if (
    document.querySelector('input[type="file"]').files[0].type !=
      "image/jpeg" &&
    document.querySelector('input[type="file"]').files[0].type != "image/png"
  ) {
    $(".file-empty-warning").removeClass("d-none").text("Only png & jpg file supported");
  }
  formData.append(
    "image",
    document.querySelector('input[type="file"]').files[0]
  );

  await fetch("/upload-image", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Image uploaded successfully");
        location.assign("/profile");
        // Perform any necessary UI updates or redirect to another page
      } else {
        console.error("Error uploading image");
        // Handle the error and display an appropriate message
      }
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      // Handle the error and display an appropriate message
    });
});

