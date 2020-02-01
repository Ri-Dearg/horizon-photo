window.addEventListener('load', function () {

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
            card_image.className = card_image.className + ' is-loaded';
        });

    });

}