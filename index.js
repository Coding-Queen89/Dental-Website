const circular_slider = document.querySelector('.wrapper'),
     character_name = document.querySelector('.character-name'),
        slides = document.querySelectorAll('.slides'),
        descriptions__item = document.querySelectorAll('.descriptions__item'),
        images = document.querySelectorAll('.slides img');

slides.forEach((slide, i) => {
    slide.onclick = () => {
        circular_slider.style.transform = `rotateZ(-${360 / 15 * (i+10)}deg)`;
        character_name.classList.remove('active');
        setTimeout(() => {
            character_name.textContent = descriptions__item[i].querySelector('h1').textContent;
            character_name.classList.add('active');
        }, 800);

        images.forEach((img,i)=>{
            img.style.setProperty('--img-no', 6);
            img.classList.remove('active');
            descriptions__item[i].classList.remove('active');
        })
        descriptions__item[i].classList.add('active');
        slide.querySelector('img').classList.add('active');
    }
})
