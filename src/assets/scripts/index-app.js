import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper, { EffectFade, Navigation } from 'swiper';
import Headroom from "headroom.js";
import { lenis } from './modules/scroll/leniscroll';
import buttonHover from './modules/buttonHover';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { gsap, ScrollTrigger } from 'gsap/all';
import "current-device";
import menu from './modules/menu';
import './modules/form';


const scroller = lenis;


Swiper.use([EffectFade, Navigation]);
/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
global.axios = axios;

gsap.registerPlugin(ScrollTrigger);


var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
headroom.init();


document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-call-form]');
  if (!target) return;
  document.querySelector('[data-form-wrapper]').classList.add('active');
  gsap.timeline()
    .fromTo('[data-form-wrapper] .form', {
      x: '100%',
    },{
      x: '0',
      duration: '1.25',
      ease: 'expo.out'
    })
});
document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-close-form]');
  if (!target) return;
  gsap.timeline()
  .to('[data-form-wrapper] .form', {
    x: '100%',
    duration: '0.75',
    ease: 'expo.out'
  })
  .add(() => {
    document.querySelector('[data-form-wrapper]').classList.remove('active');
  })
});






document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-up-arrow]');
  if (!target) return;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
});
document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-arrow-down]');
  if (!target) return;
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  })
});



// document.querySelector('[data-up-arrow]').style.visibility = 'hidden';

// window.addEventListener('scroll', (evt) => {
//   document.querySelector('[data-up-arrow]').style.visibility  = window.scrollY > (document.body.scrollHeight * 0.5) ? '' : 'hidden';
// })




menu();




splitToLinesAndFadeUp('section:not(.section-1) .text-style-h-1, section  .text-style-h-3');




function addIntersectionOnceWithCallback (el, cb = () => {}) {
  const image = el;
  const target = image;
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              const lazyImage = entry.target;
              cb();
              observer.unobserve(target);
          }
        });
      }, {
          rootMargin: '0px',
          threshold: 0.1,
        });
      observer.observe(target);
}

document.querySelectorAll('[data-srcset]').forEach(el => {
  addIntersectionOnceWithCallback(el, () => {
    el.setAttribute('srcset', el.dataset.srcset);
  })
})
document.querySelectorAll('img[data-src]').forEach(el => {
  addIntersectionOnceWithCallback(el, () => {
    el.setAttribute('src', el.dataset.src);
  })
})
document.querySelectorAll('[data-lazy]').forEach(el => {


  addIntersectionOnceWithCallback(el, () => {
    const lazyElemt = el.querySelector('[data-href]');
    lazyElemt.setAttribute('href', lazyElemt.dataset.href);
  })
})



new Swiper('.home-gallery__container', {
  navigation: {
    nextEl: '.home-gallery__arrow-next',
    prevEl: '.home-gallery__arrow-prev'
  }
})

const aboutSlider = new Swiper('[data-home-about-slider]', {
  navigation: {
    nextEl: '[data-home-about-slider-next]',
    prevEl: '[data-home-about-slider-prev]'
  },
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  on: {
      init: (e) => {
        document.querySelector('.js-about-slider-counter .total').textContent = e.slides.length;
        console.log(e);
      }
  }
})

gsap.timeline()
  .fromTo('.circle-screen__circle', {
    scale: 2.5
  }, {
    scale: 1,
    scrollTrigger: {
      scrub: true,
      trigger: '.home-screen1',
      start: '75% bottom',
    }
  })


aboutSlider.on('activeIndexChange',  ({ activeIndex, realIndex, ...data }) => {
  const img = data.slides[activeIndex].dataset.image;
  document.querySelector('.circle-screen__img').setAttribute('src' ,img);
  document.querySelector('.js-about-slider-counter .current')
      .textContent = realIndex + 1;
})

aboutSlider.on('beforeSlideChangeStart', ({ activeIndex, realIndex, slides, ...data }) => {
  console.log('beforeSlideChangeStart', slides[activeIndex]);
  gsap.to(slides[activeIndex].children, {
    y: -100,
    clearProps: 'all'
  })
})
aboutSlider.on('slideChangeTransitionStart', ({ activeIndex, realIndex, slides, ...data }) => {
  console.log('slideChangeTransitionEnd', slides[activeIndex]);
  gsap.from(slides[activeIndex].children, {
    y: 100,
    clearProps: 'all'
  })
})

splitToLinesAndFadeUp('.text-style-h-1');