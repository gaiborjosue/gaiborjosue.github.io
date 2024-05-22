import { preloadImages } from './utils.js';
import { ImageTrail } from './imageTrail.js';

// Preload all images
preloadImages('.content__imgh-inner').then(() => {
    // Instantiate a new ImageTrail object, initializing it with the element that has the class 'content'.
    // The ImageTrail instance starts managing and animating the sequence of images within the specified element, reacting to mouse movements.
    new ImageTrail(document.querySelector('.contenth'));
});