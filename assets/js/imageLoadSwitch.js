// Starts function on window load for each image
window.addEventListener('load', function () {    
    setTimeout(lazyLoad, 1000);
});

/* Resets the class of each loaded image when the anchors are modified
This allows the lazyLoad function to correctly blur and swap images on url change*/
$('body').on('DOMSubtreeModified', '#gallery-title', function() {
    $('#gallery-title').addClass('heading-font')
    $('a').removeClass('is-loaded');
    setTimeout(lazyLoad, 1000);
});

function lazyLoad() {
    var card_images = document.querySelectorAll('.card-image');

    card_images.forEach(function (card_image) {
        var image_url = card_image.getAttribute('data-image-full');
        var content_image = card_image.querySelector('img');

        content_image.src = image_url;

        content_image.addEventListener('load', function () {
            card_image.style.backgroundImage = 'url(' + image_url + ')';
            if (card_image.className = 'card-image pop') {
            card_image.className = 'card-image pop is-loaded';
            } if (card_image.className = 'container-fluid callout-container m-0 p-0 card-image') {
                card_image.className = 'container-fluid callout-container m-0 p-0 card-image is-loaded';
            }
        });
    });
}