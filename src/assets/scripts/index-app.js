import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper, { EffectFade, Navigation, Pagination } from 'swiper';
import Headroom from "headroom.js";
import { lenis } from './modules/scroll/leniscroll';
import buttonHover from './modules/buttonHover';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { gsap, ScrollTrigger } from 'gsap/all';
import "current-device";
import menu from './modules/menu';
import './modules/form';
import { useState } from './modules/helpers/helpers';


const scroller = lenis;


Swiper.use([EffectFade, Navigation, Pagination]);
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
  },
  pagination: {
    el: '.home-gallery .thumbs',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="thumbs__item ' + className + '"></span>';
    }, 
  },
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



function gridBlockSlider() {
  if (!document.documentElement.classList.contains('mobile')) return;

  const slider = new Swiper('[data-mobile-grid-sldier]',
  {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '[data-mobile-grid-sldier] .thumbs',
			clickable: true,
      renderBullet: function (index, className) {
        return '<span class="thumbs__item ' + className + '"></span>';
      },
    },
  });
}

gridBlockSlider();

const [ genplanFilter, setGenplanFilter, useGenplanFilterEffect ] = useState([]);

useGenplanFilterEffect(values => {
  document.querySelectorAll('path[data-polygon], g[data-polygon]').forEach(el => {
    if (values.includes(el.dataset.polygon)) {
      el.style.opacity = '';
      return;
    }
    el.style.opacity = 0;
  })
})

setGenplanFilter([]);

function genplanMobileLegendSlider() {
  const html = document.documentElement;
  if (!html.classList.value.match(/tablet|mobile/)) return;
  new Swiper('[data-mobile-genplan-slider]', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop:true,
    navigation: {
      prevEl: '[data-mobile-genplan-slider-prev]',
      nextEl: '[data-mobile-genplan-slider-next]'
    },
    on: {
      activeIndexChange: ({ activeIndex, slides, ...e}) => {
        const slide = slides[activeIndex];
        setGenplanFilter([ slide.dataset.polygon ]);
      }
    }
  })
}



genplanMobileLegendSlider();

function genplanDesktopHandler() {
  if (!document.documentElement.classList.contains('desktop')) return;
  document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('.genplan__legend-point');
    if (!target) return;
    if (target.classList.contains('active')) {
      setGenplanFilter([
        ...genplanFilter().filter(el => el !== target.dataset.polygon)
      ]);
      target.classList.remove('active');
    } else {
      setGenplanFilter([
        ...genplanFilter(), target.dataset.polygon
      ]);
      target.classList.add('active');
    }
  })
}

genplanDesktopHandler();