import Swiper, { EffectFade, Lazy, Navigation } from 'swiper';
import menu from './modules/menu';
import { lenis } from './modules/scroll/leniscroll';
import Headroom from 'headroom.js';
import 'current-device';
const { useState } = require("./modules/helpers/helpers");
import './modules/form';
import { sideSwitchArrow } from './modules/effects/sideSwitchArrow';
import { getGallerySlider } from './modules/gallery/getGallerySlider';

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
        // navigation: {
        //     nextEl: $container.querySelector('[class*="-next"'),
        //     prevEl: $container.querySelector('[class*="-prev"')
        // }
    });

    sideSwitchArrow(
        gallerySlider,
        $container.querySelector('[class*="-next"'),
        $container.querySelector('.swiper-wrapper')

    )
    const [ gallerySliderState, setGallerySlider, useGallerySliderEffect ] = useState({
        title: '',
        gallery: [],
        img: '',
    });
    
    
    //data-gallery-id
    
    useGallerySliderEffect((state) => {

        const $miniImage = document.querySelector('[data-gallery-mini-image]');
        if (state.miniFlatImage) {
            $miniImage.src = state.miniFlatImage;
            $miniImage.style.opacity = 1;
        } else {
            $miniImage.style.opacity = 0;
        }

        $container.querySelector('.swiper-wrapper').innerHTML = state.gallery.map(el => `
            <div class="swiper-slide">
                <img src="${el}" class="swiper-lazy" loading="lazy">
            </div>
        `).join('');

        gallerySlider.update();
    
    })
    
    
    
    document.querySelector('body').addEventListener('click',function(evt){
        const target = evt.target.closest('[data-gallery-id]');
        if (!target) return;
        const id = target.dataset.galleryId;
    
        getGallerySlider(id)
            .then(({ data }) => {
                setGallerySlider({
                    ...data
                })
                console.log(res);
            })
    
    });
}

