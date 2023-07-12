const { gsap } = require("gsap/all");

import menu from './modules/menu';
import { lenis } from './modules/scroll/leniscroll';
const { useState } = require("./modules/helpers/helpers");
const { default: getProgress, getProgressList } = require("./modules/progress/getProgress");
import './modules/form';

import "current-device";
import Headroom from 'headroom.js';
import { progressCard } from './modules/progress/progressCard';
import Swiper, { Navigation } from 'swiper';
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

    document.querySelectorAll('video').forEach(el => el.pause());
    gsap.to(popup, {
        autoAlpha: 0
    });
});

useEffectPopup((val) => {
    popup.querySelector('.build-progress-popup__text-content').innerHTML = `
        ${val.text}
        <div style="color: var(--new-blue, #001A58);">
            <span>${val.gallery.length} фото</span>
            ${val.video ? '<span>1 відео</span>' : ''}
        </div>
    `;
    popup.querySelector('.build-progress-popup__title').textContent = val.title;
    popup.querySelector('.build-swiper .swiper-wrapper').innerHTML = Array.isArray(val.gallery) ? val.gallery.map(el => `
        <img class="swiper-slide" alt="${val.title}" src="${el}">
    `).join('') : '';

    if (val.video) {
        popup.querySelector('.build-swiper .swiper-wrapper').insertAdjacentHTML('afterbegin', `
            <video style="height: auto;" controls muted class="swiper-slide" playsinline poster="/wp-content/themes/3d/assets/images/loader-bg.jpg">
                <source src="${val.video.replace('http://','https://')}" type="video/mp4">
            </video>
        `)
    }

    popup.querySelector('.build-swiper').swiper.update();
    console.log(val);
});

new Swiper('.build-swiper', {
    modules: [Navigation],
    navigation: {
        prevEl: document.querySelector('[data-progress-popup-prev]'),
        nextEl: '.build-progress-popup__nav>:last-child'
    }
})

document.body.addEventListener('click', async (evt) => {
    const target = evt.target.closest('[data-id]');
    if (!target) return;

    const data  = await getProgress(target.dataset.id);

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




const [ progress, setProgress, useProgressEffect ] = useState({
    pending: false,
    tabs: document.querySelector('[data-progress-tabs]'),
    container: document.querySelector('.progress-front-screen'),
    sections: [],
    data: []
});



useProgressEffect(({ pending, container, tabs }) => {
    // gsap.to(container, {
    //     autoAlpha: pending ? 0.5 : 1,
    // });

    if (pending) return container.classList.add('loading');
    setTimeout(() => {
        container.classList.remove('loading');
    }, 1000);
});
useProgressEffect(({ data, container, ...some }) => {
    container.querySelectorAll('.progress-card').forEach(el => el.remove());


    container.insertAdjacentHTML('beforeend', data.map(el => {
        if (progress().sections.length === 0 || !el.sections) return progressCard(el);

        let returnValue = '';

        el.sections.forEach(sectionOfElement => {
            if (progress().sections.includes(sectionOfElement))  {
                returnValue = progressCard(el);
            }
        })

        return returnValue;
    }).join(''));
});

const [tab,setTab,useTabEffect] = useState({
    selector: 'data-progress-tabs',
    active: 0
});

useTabEffect((e) => {
    const { selector, active, sections } = e;
    document.querySelectorAll(`[${selector}] .tabs__tab`)
    .forEach((singleTab, index) => {
            if (singleTab.classList.contains('active') && index === active) return;
            if (index === active) {
                singleTab.classList.add('active');
                setProgress({
                    ...progress(),
                    pending: true,
                })
                getProgressList({
                    type: singleTab.dataset.progress,
                    sections: progress().sections,
                })
                    .then(el => {
                        setProgress({
                            ...progress(),
                            data: [...el.data ],
                        })
                    })
                    .finally(el => {
                        setProgress({
                            ...progress(),
                            pending: false,
                        })
                    })
                return;
            }
            singleTab.classList.remove('active');
        });
});




document.querySelector(`[${tab().selector}]`).addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-progress-section-submit]');
    if (!target) return;
    const sections = Array.from(document.querySelectorAll('.active[data-progress-section]')).map(choosedSection => {
        return choosedSection.dataset.progressSection;
    });
    setProgress({
        ...progress(),
        sections: sections,
        pending: true,
    });

    getProgressList({
        type: document.querySelector('[data-progress].active').dataset.progress,
        sections: progress().sections,
    })
        .then(el => {
            setProgress({
                ...progress(),
                data: [...el.data, ...el.data],
            })
        })
        .finally(el => {
            setProgress({
                ...progress(),
                pending: false,
            })
        })
})

document.querySelector(`[${tab().selector}]`).addEventListener('click', (evt) => {
    const target = evt.target.closest('.tabs__tab');
    if (!target) return;

    if (evt.target.closest('[data-progress-section-submit]')) return;
    if (evt.target.closest('[data-progress-section]')) {
        evt.target.closest('[data-progress-section]').classList.toggle('active');
        return;
    }
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
});
