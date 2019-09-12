const burger = document.querySelector('.burger');
const burgerWrapper = document.querySelector('.burger-wrapper');
const nav = document.querySelector('nav');
// NAVIGATION VARIABLES ^
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const slidesWrapper = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
var active = 0;
// SLIDER VARIABLES ^



const animateBurger = () => {
    var active = burger.classList.value == "burger burger-active";
    if (active) {
      burger.classList.remove('burger-active');
      nav.classList.remove('nav-active');
    }
    else {
      burger.classList.add('burger-active');
      nav.classList.add('nav-active');
    }
}
// BURGER ANIMATION ^

const changeSlide = (n) => {
  const number= Number(n);
  const slide = slides[active+number];
  slides[active].classList.remove('active');
  slide.classList.add('active');
  active = active+number;
  const move = (350*active) + 175;
  slidesWrapper.style.marginLeft = `-${move}px`;
}
// SLIDER FUNCTIONALITY ^

window.addEventListener('load', () => {
  burgerWrapper.addEventListener('click', animateBurger);
  changeSlide(2);
  prev.addEventListener('click', ()=> {
    if(active !== 0) changeSlide(-1);
  });
  next.addEventListener('click', ()=> {
    if(slides[active+1]) changeSlide(1);
  });
})
