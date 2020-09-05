/**
 * This script runs the function for the image lazy load.
 * The images have a thumbnail, with a filter applied over them.
 * This scripts controls how that image is swapped out, and the filter is removed.
 */
window.addEventListener("load", function () {
	setTimeout(lazyLoad, 1000);
});

/*
* Resets the class of each loaded image when the anchors are modified.
* This allows the lazyLoad function to correctly blur and swap images on url change.
It also changes the initial font for country titles.
*/
$("body").on("DOMSubtreeModified", "#gallery-title", function () {
	$("#gallery-title").addClass("heading-font");
	$("a").removeClass("is-loaded");
	setTimeout(lazyLoad, 1000);
});

// based on code from: https://www.cssscript.com/progressive-image-lazy-loading-with-blur-effect/

/**
 * Runs a loop over each thumbnail card image, retrieving the url for the full size image.
 * On load, it removes the thumbnail, and gives visibility to the full size-image.
 * Adds a class which provides the transition.
 */
function lazyLoad() {
	const cardImages = document.querySelectorAll(".card-image");

	// loop over each image
	cardImages.forEach(function (cardImage) {
		const imageUrl = cardImage.getAttribute("data-image-full");
		const contentImage = cardImage.querySelector("img");

		// change src to full res image
		contentImage.src = imageUrl;

		// fires the swap function on load
		contentImage.addEventListener("load", function () {
			// sets the background as the full res image
			cardImage.style.backgroundImage = "url(" + imageUrl + ")";

			// applies class for a smooth transition to the gallery images
			cardImage.classList.add("is-loaded");
		});
	});
}
