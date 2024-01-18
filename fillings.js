var lastScrollTop = 0;
window.onload = function(){
    var navbar = document.querySelector("header");
    window.addEventListener('scroll',function(e){
        if(window.pageYOffset > 10){
            navbar.classList.add('is-scrolling');
        } else{
            navbar.classList.remove('is-scrolling');
        }
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if(scrollTop > lastScrollTop){
            navbar.style.top = "-100px";
        }else{
            navbar.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });

    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.navlist')

    menu_btn.addEventListener('click',function(){
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}

// let target = document.querySelectorAll('.seek');
// const anch = document.querySelectorAll('.anchor');
// const observer = new IntersectionObserver(entries=>{
//     entries.forEach(entry => {
//         entry.anch.classList.toggle("show", entry.isIntersecting);
//     })
// })





// // const anch = document.querySelectorAll('.anchor');
// // const title = document.querySelectorAll('.seek');
// target.forEach(an => {
//     observer.observe(an);
// })
