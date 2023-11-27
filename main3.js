window.onload = function(){
    window.addEventListener('scroll',function(e){
        if(window.pageYOffset >75){
            document.querySelector("header").classList.add('is-scrolling');
        } else{
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav')

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
