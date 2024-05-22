import { preloadImages } from './utils.js';

// Combine all selectors for preloading images
const imageSelectors = '.grid__item-img-inner, .content__img';

// Selecting DOM elements for both functionalities
const gridItems = document.querySelectorAll('.grid__item');
const contentElements = [...document.querySelectorAll('.content--sticky')];
const totalContentElements = contentElements.length;

const initSmoothScrolling = () => {
    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
    console.log(e)
    })

    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
};

const handleGridAnimations = () => {
    gridItems.forEach((item) => {
        const isLeftSide = item.previousElementSibling && (item.offsetLeft + item.offsetWidth <= item.previousElementSibling.offsetLeft + 1);
        const originX = isLeftSide ? 100 : 0;

        gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=15%',
                end: '+=50%',
                scrub: true
            }
        })
        .fromTo(item.querySelector('.grid__item-img'), {
            yPercent: -100,
            xPercent: isLeftSide ? 100 : -100
        }, {
            yPercent: 0,
            xPercent: 0,
        })
        .fromTo(item.querySelector('.grid__item-img-inner'), {
            yPercent: 100,
            xPercent: isLeftSide ? -100 : 100,
            filter: 'brightness(200%) contrast(300%)'
        }, {
            yPercent: 0,
            xPercent: 0,
            filter: 'brightness(100%) contrast(100%)'
        }, 0)
        .fromTo(item.querySelector('.grid__item-caption'), {
            yPercent: 200,
            xPercent: 50,
            opacity: 0
        }, {
            yPercent: 0,
            xPercent: 0,
            opacity: 1
        }, 0);
    });
};

const handleContentAnimations = () => {
    contentElements.forEach((el, position) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: '+=100%',
                scrub: true
            }
        })
        .fromTo(el.querySelector('.content__img'), {
            yPercent: 10,
            rotation: 20,
        }, {
            ease: 'power1',
            yPercent: -60,
            rotation: -20,
        }, 0);
    });
};

// Preload images then initialize everything
preloadImages(imageSelectors).then(() => {
    // initSmoothScrolling();
    handleGridAnimations();
    handleContentAnimations();
});
