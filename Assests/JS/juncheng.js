// select the element with class wrapper and it return a node (div)
const circular_slider = document.querySelector('.wrapper'),
    // select the element with class name slides and it return a nodelist
    slides = document.querySelectorAll('.slides'),
    member_name = document.querySelector('.member-name'),
    descriptions_item = document.querySelectorAll('.descriptions_item'),
    images = document.querySelectorAll('.slides img');

// loopping the nodelist
slides.forEach((slide,i)=>{
    
    slide.onclick = ()=>{
        circular_slider.style.transform= `rotateZ(-${360 / 5 * (i + 4)}deg)`;
        member_name.classList.remove('active');
        setTimeout(()=>{
            member_name.textContent = descriptions_item[i].querySelector('h1').textContent
            member_name.classList.add('active');
        }, 800);
        images.forEach((img,i)=>{
            img.style.setProperty('--img-no', 2);
            img.classList.remove('active');
            descriptions_item[i].classList.remove('active');
        })
        descriptions_item[i].classList.add('active');
        slide.querySelector('img').classList.add('active');
    }
})

let swiper_testimonial = new Swiper('.testimonial_container',{
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
     },
 
     pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
     },

    //  breakpoints:{
    //     568:{
    //         slidesPerView: 2,
    //     }
    //  }
});

function login(){
    open("login.html","_self");
}

function register(){
    open("register.html","_self");
}


