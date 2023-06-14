const { gsap } = require("gsap/all");

import menu from './modules/menu';
import { lenis } from './modules/scroll/leniscroll';
const { useState } = require("./modules/helpers/helpers");
const { default: getProgress } = require("./modules/progress/getProgress");

menu();

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