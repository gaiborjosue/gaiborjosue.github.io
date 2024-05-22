
const preloadImages = (selector = 'img') => {
	return new Promise((resolve) => {
			// The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
			imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
	});
};

const getGrid = selector => {
	let elements = gsap.utils.toArray(selector),
		bounds,
		getSubset = (axis, dimension, alternating, merge) => {
		  	let a = [], 
			  	subsets = {},
			  	onlyEven = alternating === "even",
			  	p;
			bounds.forEach((b, i) => {
				let position = Math.round(b[axis] + b[dimension] / 2),
					subset = subsets[position];
				subset || (subsets[position] = subset = []);
				subset.push(elements[i]);
			});
			for (p in subsets) {
				a.push(subsets[p]);
			}
			if (onlyEven || alternating === "odd") {
				a = a.filter((el, i) => !(i % 2) === onlyEven);
			}
		  	if (merge) {
				let a2 = [];
				a.forEach(subset => a2.push(...subset));
				return a2;
		  	}
		  	return a;
		};
	elements.refresh = () => bounds = elements.map(el => el.getBoundingClientRect());
	elements.columns = (alternating, merge) => getSubset("left", "width", alternating, merge);
	elements.rows = (alternating, merge) => getSubset("top", "height", alternating, merge);
	elements.refresh();

	return elements;
}


const lerp = (a, b, n) => (1 - n) * a + n * b;

const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

const getCursorPos = ev => {
     return { 
         x : ev.clientX, 
         y : ev.clientY 
     };
 };


const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;


const calcWinsize = () => {
    return {
        width: window.innerWidth, 
        height: window.innerHeight
    }
}

const getPointerPos = ev => {
	let posx = 0;
	let posy = 0;
	
	// If the event is not provided, use the global window event object.
	if (!ev) ev = window.event;

	// Handle touch events
	if (ev.touches) {
			if (ev.touches.length > 0) { // Check if there are any touches available
					posx = ev.touches[0].pageX;
					posy = ev.touches[0].pageY;
			}
	}
	// Handle mouse events
	else if (ev.pageX || ev.pageY) {
			posx = ev.pageX;
			posy = ev.pageY;
	}
	else if (ev.clientX || ev.clientY) {
			posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
			posy = ev.clientY + body.scrollTop + docEl.scrollTop;
	}

	// Return the position.
	return {x: posx, y: posy};
}

const getMouseDistance = (mousePos, lastMousePos) => {
	return distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
};

/**
* Computes the new position in an array after moving by a given offset.
* The array is treated as circular, meaning subtracting from the beginning 
* wraps to the end of the array.
*
* @function
* @param {number} position - The starting position in the array.
* @param {number} offset - The number of positions to move backward.
* @param {Array} arr - The array in which to compute the new position.
* @returns {number} The new position in the array after moving by the offset.
*/
const getNewPosition = (position, offset, arr) => {
	// Ensure offset is non-negative and is within the range of the array's length
	const realOffset = Math.abs(offset) % arr.length;
	
	// Check if subtracting the offset stays within the array's bounds
	if (position - realOffset >= 0) {
			return position - realOffset;
	} else {
			// If not, wrap around to the end of the array and compute the new position
			return arr.length - (realOffset - position);
	}
};

/**
* Set the clip path for each of the clipInnerElements based on the provided grid dimensions.
* @param {Array} clipInnerElements - The list of elements to set the clip paths on.
* @param {number} numRows - The number of rows in the grid.
* @param {number} numCols - The number of columns in the grid.
*/
const setClipPath = (clipInnerElements, numRows, numCols) => {
	if (clipInnerElements.length !== numRows * numCols) {
			console.error('Mismatch between provided grid dimensions and number of elements.');
			return;
	}

	for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
					const idx = i * numCols + j;

					const top = (100 / numRows) * i + '%';
					const bottom = (100 / numRows) * (i + 1) + '%';
					const left = (100 / numCols) * j + '%';
					const right = (100 / numCols) * (j + 1) + '%';

					const clipPathValue = `polygon(${left} ${top}, ${right} ${top}, ${right} ${bottom}, ${left} ${bottom})`;

					clipInnerElements[idx].style.clipPath = clipPathValue;
			}
	}
}

export {
    preloadImages,
    getGrid,
    lerp,
    getCursorPos,
    map,
    calcWinsize,
		getPointerPos,
		getMouseDistance,
		getNewPosition,
		setClipPath,
		distance
};