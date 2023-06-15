const { gsap } = require("gsap/all");

import menu from './modules/menu';
import { lenis } from './modules/scroll/leniscroll';
const { useState } = require("./modules/helpers/helpers");
const { default: getProgress } = require("./modules/progress/getProgress");
import './modules/form';

import "current-device";
import Headroom from 'headroom.js';
menu();

var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
headroom.init();

const [ popupState, setPopup, useEffectPopup ] = useState({
    visible: false,
});

const popup = document.querySelector('[data-build-popup-progress]')

document.body.append(popup);

useEffectPopup((val) => {
    if (val.visible) {
        gsap.to(popup, {
            autoAlpha: 1
        });
        return;
    }
    gsap.to(popup, {
        autoAlpha: 0
    });
});

useEffectPopup((val) => {
    popup.querySelector('.build-progress-popup__text-content').textContent = val.text;
    popup.querySelector('.build-progress-popup__title').textContent = val.title;
});


document.body.addEventListener('click', async (evt) => {
    const target = evt.target.closest('[data-id]');
    if (!target) return;

    const data  = await getProgress(target.dataset.id);
    console.log(data);

    setPopup({
        ...popupState(),
        visible: true,
        ...data.data
    })

})


/**Попап карточек строительства */
document.querySelectorAll('[data-build-popup-progress]').forEach(el => {
    const close = el.querySelector('[class*="close"]');
    close.addEventListener('click', () => {
        gsap.to(el, { autoAlpha: 0 });
        window.dispatchEvent(new Event('popup-close'));
    })
})




const [tab,setTab,useTabEffect] = useState({
    selector: 'data-progress-tabs',
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