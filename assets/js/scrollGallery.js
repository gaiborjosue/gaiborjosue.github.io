import { preloadImages } from './utils.js';

// Get the grid element
const grid = document.querySelector('.grid');

// Get all grid items within the grid
const gridItems = document.querySelectorAll('.grid__item');

const scroller = () => {
	const viewportHeight = window.innerHeight;
	const endValue = viewportHeight / 2;

	// Loop through each grid item to add animations
	gridItems.forEach((item, index) => {
		// Get the previous element sibling for the current item
		const previousElementSibling = item.previousElementSibling;
		// Determine if the current item is on the left side based on its position relative to the previous item
		const isLeftSide = previousElementSibling && (item.offsetLeft + item.offsetWidth <= previousElementSibling.offsetLeft + 1);
		// Determine the origin for transformations (either 100 or 0 depending on position)
		const originX = isLeftSide ? 100 : 0;

		gsap
		.timeline({
			defaults: {
				ease: 'none'
			},
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
			//ease: 'power1',
			yPercent: 0,
			xPercent: 0,
			opacity: 1
		}, 0);

	});
}

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
preloadImages('.grid__item-img-inner').then(() => {
	scroller();
});