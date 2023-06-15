import Swiper, { EffectFade, Lazy, Navigation } from 'swiper';
import menu from './modules/menu';
import { lenis } from './modules/scroll/leniscroll';
import Headroom from 'headroom.js';
import 'current-device';
const { useState } = require("./modules/helpers/helpers");
import './modules/form';

menu();

new Headroom(document.querySelector('.header')).init();

Swiper.use([Navigation, EffectFade, Lazy]);

{
    const $container = document.querySelector('[data-gallery-slider]')
    const gallerySlider = new Swiper($container, {
        loop: true,
        preloadImages: false,
        watchSlidesVisibility: true,
        prevNext: 2,
      slidesPerView: 'auto',
        lazy: {
            enabled: true,
            loadPrevNext: true,
            loadPrevNextAmount: 2,
            loadOnTransitionStart: false,
            threshold: 50,
        },
        navigation: {
            nextEl: $container.querySelector('[class*="-next"'),
            prevEl: $container.querySelector('[class*="-prev"')
        }
    });
}