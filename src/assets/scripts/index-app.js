import i18next from 'i18next';
import axios from 'axios';
import * as yup from 'yup';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper, { EffectFade, Navigation } from 'swiper';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import Accordion from 'accordion-js';
import Headroom from "headroom.js";
import { lenis } from './modules/scroll/leniscroll';
import buttonHover from './modules/buttonHover';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { gsap, ScrollTrigger } from 'gsap/all';
import "current-device";
import googleMap from './modules/map/map';


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


// var myElement = document.querySelector("header");
// // construct an instance of Headroom, passing the element
// var headroom  = new Headroom(myElement);
// initialise
// headroom.init();


/*
 * form handlers start
 */
const forms = [
  '[data-bottom-form]',
  '[data-form]',
];

forms.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        successAction: () => { window.location.href = 'thankyou'; },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          email: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-email]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('email'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          agreement: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-agreement]') }),
            rule: yup.string().required(i18next.t('required')).nullable(),
            defaultMessage: i18next.t('agreement'),
            valid: false,
            error: [],
          },
        },

      },
    });

    // $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
    //   $form.querySelector('[name="phone"]').focus();
    // }, false);
  }
});

/*
 * form handlers end
 */

// eslint-disable-next-line no-new
const sec1Slider = new Swiper('[data-section-1-slider]', {
  effect: 'fade',
  loop: true,
  speed: 500,
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: document.querySelector('[data-section-1-slider-next]'),
    prevEl: document.querySelector('[data-section-1-slider-prev]'),
  },
  on: {
    init: (e) => {
      document.querySelector('.section-1__nav-digits span:nth-child(3)').textContent = e.slides.length;
      console.log(e);
    }
  }
});

sec1Slider.on('activeIndexChange',  ({ activeIndex, realIndex }) => {
  document.querySelector('.section-1__nav-digits span:nth-child(1)')
    .textContent = realIndex + 1;
})

// eslint-disable-next-line no-new
new Swiper('[data-sec-5-slider]', {
  slidesPerView: 1.05,
  speed: 1750,
  // spaceBetween: 20,
  navigation: {
    nextEl: document.querySelector('[data-sec-5-slider-next]'),
    prevEl: document.querySelector('[data-sec-5-slider-prev]'),
  },
});




// document.body.addEventListener('change', (evt) => {
//   const target = evt.target.closest('[name="genplan"]');
//   if (!target) return;
//   const { value } = target;
//   document.querySelectorAll('[data-build]').forEach((el) => {
//     const regExp = new RegExp(el.dataset.build);
//     el.setAttribute('stroke-opacity', regExp.test(value) ? 1 : 0);
//   });

//   document.querySelectorAll('[name="genplan"]').forEach((el) => {
//     if (el === target) {
//       el.closest('label').classList.add('active');
//       return;
//     }
//     el.closest('label').classList.remove('active');
//   });
// });

document.querySelectorAll('.bordered-block__item').forEach(el => {
  el.addEventListener('mouseenter',function(evt){
    const target = el.querySelector('input');
    if (!target) return;
    const { value } = target;
    document.querySelectorAll('[data-build]').forEach((el) => {
      const regExp = new RegExp(el.dataset.build);
      el.setAttribute('stroke-opacity', regExp.test(value) ? 1 : 0);
    });

    document.querySelectorAll('[name="genplan"]').forEach((el) => {
      if (el === target) {
        el.closest('label').classList.add('active');
        return;
      }
      el.closest('label').classList.remove('active');
    });

  });
  el.addEventListener('mouseleave',function(evt){
    document.querySelectorAll('[data-build]').forEach((el) => {
      const regExp = new RegExp(el.dataset.build);
      el.setAttribute('stroke-opacity', 0);
    });
    document.querySelectorAll('[name="genplan"]').forEach((el) => {
      el.closest('label').classList.remove('active');
    });
  });
})


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


function screen3Effects() {
  const swiper = new Swiper('.zoom-slider-wrapper', {
      // Optional parameters
    modules: [ Navigation],
    slidesPerView: 4.5,
    loop: false,
    spaceBetween: 40,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20
      },
      // when window width is >= 480px
      993: {
        slidesPerView: 3.5,
        spaceBetween: 30
      },
      1440: {
        slidesPerView: 4.5,
        spaceBetween: 40
      }
      // when window width is >= 640px
    },
    navigation: {
      nextEl: document.querySelector('[data-screen3-next]'),
      prevEl: document.querySelector('[data-screen3-prev]'),
    },
  });
  gsap.to('.zoom-slider .swiper-slide__arrow', {
    autoAlpha: 0
  });

  gsap.to(`.zoom-slider .swiper-slide:nth-child(5) .swiper-slide__arrow, .zoom-slider .swiper-slide-active .swiper-slide__arrow`, {
    autoAlpha: 1
  });


  swiper.on('slideChangeTransitionStart', () => {
    // document.querySelectorAll('.zoom-slider .swiper-slide__arrow').forEach(el => {
    //   el.style.display = 'none';
    // });
    gsap.to('.zoom-slider .swiper-slide__arrow', {
      autoAlpha: 0
    })
  });
  swiper.on('slideChangeTransitionEnd', ({ realIndex }) => {

    gsap.to(`.zoom-slider .swiper-slide:nth-child(${realIndex + 5}) .swiper-slide__arrow, .zoom-slider .swiper-slide-active .swiper-slide__arrow`, {
      autoAlpha: 1
    });
  })

  document.body.addEventListener('click',function zoomSliderClicker(evt){
    const target = evt.target.closest('.swiper-slide__arrow');
    if (!target) return;

    if (target.closest('.swiper-slide-active')) {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  });
  // swiper.on('touchStart', () => {
  //   document.querySelector('.zoom-slider-wrapper').classList.add('drag')

  // });
  // swiper.on('touchEnd', () => {
  //   document.querySelector('.zoom-slider-wrapper').classList.remove('drag')
  // });
}

screen3Effects();




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



document.querySelector('[data-up-arrow]').style.visibility = 'hidden';

window.addEventListener('scroll', (evt) => {
  document.querySelector('[data-up-arrow]').style.visibility  = window.scrollY > (document.body.scrollHeight * 0.5) ? '' : 'hidden';
})

function worldMapHandler() {
  document.querySelectorAll('button[data-world-map-marker]').forEach(el => {
    const targetValue = el.dataset.worldMapMarker;

    el.addEventListener('mouseenter',function(evt){
      hideMarkers();
      document.querySelectorAll(`g[data-world-map-marker="${targetValue}"]`).forEach(marker => {
        marker.style.opacity = 1;
      })
    });
    el.addEventListener('mouseleave',function(evt){
      showMarkers();
    });
  });

  function showMarkers() {
    document.querySelectorAll('g[data-world-map-marker]').forEach(marker => {
      marker.style.opacity = 1;
    })
  }
  function hideMarkers() {
    document.querySelectorAll('g[data-world-map-marker]').forEach(marker => {
      marker.style.opacity = 0;
    })
  }

}

worldMapHandler();





const closeMenuTl = gsap.timeline({
    paused: true,
  })
    .fromTo('.menu__item--1', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
    }, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      ease: 'Expo.easeOut',
      duration: 1.25
    })
    .fromTo('.action--close', {
      autoAlpha:1,
    }, {
      autoAlpha:0
    }, '<')
    .fromTo('.menu__item-inner>*', {
      y: 0,
      autoAlpha: 1,
    }, {
      autoAlpha: 0,
      y: '50%',
      ease: 'Quart.easeInOut',
      duration: 0.35,
      stagger: 0.1
    }, '<')
    .fromTo('.menu__item--2 img', {
      x: 0,
    }, {
      x: '-100%',
      ease: 'Expo.easeOut',
      duration: 1.25
    }, '<')
    .fromTo('.menu__item--3 img', {
      y: 0,
    }, {
      y: '100%',
      ease: 'Expo.easeOut',
      duration: 1.25
    }, '<')
    .fromTo('.menu__item--4 img', {
      y: 0,
    }, {
      y: '100%',
      ease: 'Expo.easeOut',
      duration: 1.25
    }, '<')
    .fromTo('.menu__item--5 img', {
      y: 0,
    }, {
      y: '-100%',
      ease: 'Expo.easeOut',
      duration: 1.25
    }, '<')
    .set('.menu', {
      pointerEvents: 'none',
      visibility: 'hidden'
    })



    const openMenuTl = gsap.timeline({
      paused: true,
    })
      .set('.menu', {
        pointerEvents: 'all',
        visibility: 'visible'
      })
      .fromTo('.menu__item--1', {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      }, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        ease: 'Expo.easeOut',
        duration: 1.25
      })
      .fromTo('.menu__item-inner>*', {
        autoAlpha: 0,
        y: '50%'
      }, {
        y: 0,
        autoAlpha: 1,
        ease: 'Quart.easeInOut',
        duration: 0.55,
        stagger: 0.1
      }, '<')
      .fromTo('.menu__item--2 img', {
        x: '-100%'
      }, {
        x: 0,
        ease: 'Expo.easeOut',
        duration: 1.25
      }, '<')
      .fromTo('.menu__item--3 img', {
        y: '100%'
      }, {
        y: 0,
        ease: 'Expo.easeOut',
        duration: 1.25
      }, '<')
      .fromTo('.menu__item--4 img', {
        y: '100%'
      }, {
        y: 0,
        ease: 'Expo.easeOut',
        duration: 1.25
      }, '<')
      .fromTo('.menu__item--5 img', {
        y: '-100%'
      }, {
        y: 0,
        ease: 'Expo.easeOut',
        duration: 1.25
      }, '<')
      .fromTo('.action--close', {
        autoAlpha:0
      }, {
        autoAlpha:1
      });
document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-menu-call]');

  if (!target) return;
  openMenuTl.progress(0).play();

});
document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-menu-close]');

  if (!target) return;
  closeMenuTl.timeScale(1.5).progress(0).play();

});




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

googleMap();


document.querySelectorAll('.web-item').forEach(item => {
  const button = item.querySelector('[data-circle-with-hover]');
  const frame = item.querySelector('iframe');
  const playButtonPath = item.querySelector('[data-circle-with-hover] path');
  const morphs = {
      default: playButtonPath.getAttribute('d'),
      custom: 'M 59 60 L 38 60 C 38 60 38 60 38 60 L 38 40 C 38 40 59 40 59 40 L 59 60 C 59 60 59 60 59 60 Z',
  }
  button.addEventListener('click', () => {
      const isHaveClass = item.classList.toggle('is-playing');
      if (isHaveClass) {
          frame.src = frame.dataset.src;
      } else {
          frame.removeAttribute('src');
      }
      button.remove();
      // gsap.to(playButtonPath, {
      //     duration: 0.5,
      //     ease: 'linear',
      //     attr: {
      //         d: isHaveClass ? morphs.custom : morphs.default,
      //     } 
      // })
  }, {
    once: true
  })
});


new Accordion('.accordion-container');