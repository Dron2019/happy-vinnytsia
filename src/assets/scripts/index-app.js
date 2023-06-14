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
import menu from './modules/menu';


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
  return;
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
