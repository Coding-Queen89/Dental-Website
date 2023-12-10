window.onload = function(){
    window.addEventListener('scroll',function(e){
        if(window.pageYOffset >100){
            document.querySelector("header").classList.add('is-scrolling');
        } else{
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.navlist')

    menu_btn.addEventListener('click',function(){
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=> observer.observe(el));


const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add('show2');
        }
    });
});

const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el)=> observer2.observe(el));


const parallax = document.getElementById("para");
window.addEventListener("scroll",function(){
    let offset = window.pageYOffset;//This is the value that the user
    //scrolled from the top.
    // console.log("Offset: "+ offset);
    //The offset *0.7 is the value the picture will move which will be less
    //than our offset
    parallax.style.backgroundPositionY = offset*0.4 + "px";
})
const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add('show3');
        }else{
            entry.target.classList.remove('show3');
        }
    });
});

const hiddenElements3 = document.querySelectorAll('.hidden3');
hiddenElements3.forEach((el)=> observer3.observe(el));



// var $vid = $("#myVid");
// function videoHandler(){
//     $vid[0][ $(window).width()<960 ? "pause" : "play" ]();
// }
// $(window).on("resize load", videoHandler);


// $(document).ready(function(){
//     var screenWidth = $(window).width();
//     // if window width is smaller than 800 remove the autoplay attribute
//     // from the video
//     if (screenWidth < 800){
//           $('video').removeAttr('autoplay');
//     } else {
//       $('video').attr('autoplay');
//     }
//   });
