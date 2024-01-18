// var lastScrollTop = 0;
window.onload = function(){
    var navbar = document.querySelector("header");
    window.addEventListener('scroll',function(e){
        if(window.pageYOffset > 10){
            navbar.classList.add('is-scrolling');
        } else{
            navbar.classList.remove('is-scrolling');
        }
    });

    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.navlist')

    menu_btn.addEventListener('click',function(){
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}
