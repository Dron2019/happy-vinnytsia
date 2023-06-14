import Swiper, { EffectFade, Navigation } from 'swiper';
import menu from './modules/menu';
import { lenis } from './modules/scroll/leniscroll';

Swiper.use([EffectFade, Navigation]);


menu();

const sec1Slider = new Swiper('[data-project-slider]', {
    effect: 'fade',
    loop: true,
    speed: 500,
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: document.querySelector('[data-project-slider-next]'),
      prevEl: document.querySelector('[data-project-slider-prev]'),
    },
    on: {
        init: (e) => {
          document.querySelector('[data-project-slider] .total').textContent = e.slides.length;
          console.log(e);
        }
    }
});

sec1Slider.on('activeIndexChange',  ({ activeIndex, realIndex }) => {
    document.querySelector('[data-project-slider] .current')
      .textContent = realIndex + 1;
})