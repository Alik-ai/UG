
var faq = document.getElementsByClassName("faq-page");
var i;

for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var body = this.nextElementSibling;
        if (body.style.display === "block") {
            body.style.display = "none";
        } else {
            body.style.display = "block";
        }
    });
}

(function() {
    "use strict";
  
    var carousel = document.getElementsByClassName('carousel')[0],
        slider = carousel.getElementsByClassName('carousel__slider')[0],
        items = carousel.getElementsByClassName('carousel__slider__item'),
        prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
        nextBtn = carousel.getElementsByClassName('carousel__next')[0];
    
    var width, height, totalWidth, margin = 20,
        currIndex = 0,
        interval, intervalTime = 4000;
    
    function init() {
        resize();
        move(Math.floor(items.length / 2));
        bindEvents();
      
        timer();
    }
    
    function resize() {
        width = Math.max(window.innerWidth * .25, 275),
        height = window.innerHeight * .5,
        totalWidth = width * items.length;
      
        slider.style.width = totalWidth + "px";
      
        for(var i = 0; i < items.length; i++) {
            let item = items[i];
            item.style.width = (width - (margin * 2)) + "px";
            item.style.height = height + "px";
        }
    }
    
    function move(index) {
      
        if(index < 1) index = items.length;
        if(index > items.length) index = 1;
        currIndex = index;
      
        for(var i = 0; i < items.length; i++) {
            let item = items[i],
                box = item.getElementsByClassName('item__3d-frame')[0];
            if(i == (index - 1)) {
                item.classList.add('carousel__slider__item--active');
                box.style.transform = "perspective(1200px)"; 
            } else {
              item.classList.remove('carousel__slider__item--active');
                box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
            }
        }
      
        slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
    }
    
    function timer() {
        clearInterval(interval);    
        interval = setInterval(() => {
          move(++currIndex);
        }, intervalTime);    
    }
    
    function prev() {
      move(--currIndex);
      timer();
    }
    
    function next() {
      move(++currIndex);    
      timer();
    }
    
    
    function bindEvents() {
        window.onresize = resize;
        prevBtn.addEventListener('click', () => { prev(); });
        nextBtn.addEventListener('click', () => { next(); });    
    }
  
  
  
  
    
    init();
    
  })();
  // afficher conditions en keyframes au dépend des navigateurs 


const card = document.querySelector('.card');
const imageZoom = document.querySelector('.image-zoom');
const blocFocusTop = document.querySelector('.bloc-focus-top');
const blocFocusBottom = document.querySelector('.bloc-focus-bottom');
const blocContent = document.querySelector('.bloc-content-show')

const TLANIM = gsap.timeline({paused: true});

TLANIM
.fromTo(imageZoom, {scale: 1}, {scale: 2, y: -50, x:200, duration: 0.4,
ease:ExpoScaleEase.config(1,2, 'power2.inOut')})
//pour que le carré d'en haut, monte
.to(blocFocusTop, {top: -30, left: -30, duration: 0.1}, 0.5)
//pour que le 2eme carré en bas descende
.to(blocFocusBottom, {bottom: -30, right: -30, duration: 0.1}, "-=0.1")
//pour que le texte s'affiche en montant
.to(blocContent, {bottom: 200, duration: 0.2}, '-=0.1')

card.addEventListener('mouseenter', () => {
    TLANIM.play();
});

card.addEventListener('mouseleave' , () => {
    TLANIM.reverse();
});