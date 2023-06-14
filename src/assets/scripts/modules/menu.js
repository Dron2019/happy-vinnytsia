import gsap from 'gsap/all';


export default function menu() {
    

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
}