import Swiper, { EffectFade, Lazy, Navigation } from 'swiper';
import menu from './modules/menu';
import { lenis } from './modules/scroll/leniscroll';
import Headroom from 'headroom.js';
import 'current-device';
const { useState } = require("./modules/helpers/helpers");
import './modules/form';
menu();

new Headroom(document.querySelector('.header')).init();


const [tab,setTab,useTabEffect] = useState({
    selector: 'data-news-tabs',
    active: 0
});

useTabEffect((e) => {
    const { selector, active } = e;
    document.querySelectorAll(`[${selector}] .tabs__tab`)
    .forEach((singleTab, index) => {
            if (index === active) {
                singleTab.classList.add('active');
                return;
            }
            singleTab.classList.remove('active');
        });
});

document.querySelector(`[${tab().selector}]`).addEventListener('click', (evt) => {
    const target = evt.target.closest('.tabs__tab');
    if (!target) return;
    document.querySelectorAll(`[${tab().selector}] .tabs__tab`).forEach((el,index) => {
        if (target === el) {
            setTab({
                ...tab(),
                active: index
            })
        }
    })
})

setTab({
    ...tab(),
    active: 0
})