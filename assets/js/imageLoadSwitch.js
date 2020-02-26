// Starts function on window load for each image
window.addEventListener('load', function () {    
    setTimeout(lazyLoad, 1000);
});

/* Resets the class of each loaded image when the anchors are modified
This allows the lazyLoad function to correctly blur and swap images on url change*/
$('body').on('DOMSubtreeModified', '#gallery-title', function() {
    $('#gallery-title').addClass('heading-font');
    $('a').removeClass('is-loaded');
    setTimeout(lazyLoad, 1000);
});


// based on code from: https://www.cssscript.com/progressive-image-lazy-loading-with-blur-effect/
function lazyLoad() {
    const card_images = document.querySelectorAll('.card-image');

    // loop over each image
    card_images.forEach(function (card_image) {
        const image_url = card_image.getAttribute('data-image-full');
        const content_image = card_image.querySelector('img');

        // change src to full res image
        content_image.src = image_url;

        // fires the swap function on load
        content_image.addEventListener('load', function () {
            
            // sets the background as the full res image
            card_image.style.backgroundImage = 'url(' + image_url + ')';
            
            // applies class for a smooth transition to the gallery images
            if (card_image.className = 'card-image pop') {
            card_image.className = 'card-image pop is-loaded';

            // does the same for the callout image on the front page
            } if (card_image.className = 'container-fluid callout-container m-0 p-0 card-image') {
                card_image.className = 'container-fluid callout-container m-0 p-0 card-image is-loaded';
            }
        });
    });
}