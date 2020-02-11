$(document).ready(function () {
    // adjusts iframe height based on device and photo length
    $('iframe').on('load', galleryHeight);

    // Parses markerArray.js for details to give each marker on the map and pushes it to the array
    var markerArr = [];
    $.getJSON("assets/js/markerArray.js", function (data) {
        var length = data.locations.length;
        for (var i = 0; i < length; i++) {
            var eachItem = data.locations[i].attributes;
            var latLng = new google.maps.LatLng(eachItem.Latitude, eachItem.Longitude);
            var placeName = eachItem.title;
            var marker = new google.maps.Marker({
                position: latLng,
                title: placeName,
                map: map,
                animation: google.maps.Animation.DROP,
            });

            markerArr.push(marker);

            // Iterates through each marker on the map, sets the animation to null before pushing the marker through to the other functions
            google.maps.event.addListener(marker, 'click', function () {
                for (var i = 0; i < markerArr.length; i++) {
                    markerArr[i].setAnimation(null);
                }
                bounce(this);
                pageSwitch(this);
            });
        }
    });

    //  toggles the bounce animation for the selected marker
    function bounce(bouncer) {
        if (bouncer.getAnimation() !== null) {
            bouncer.setAnimation(null);
        } else {
            bouncer.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    // Allows selection of elements within the iframe
    const iframeC = $("iframe#iframeGallery").contents();

    // Controls page animation, passing marker title to gallery changing function
    function pageSwitch(markerNum) {
        var localTitle = markerNum.title;
        $('iframe#iframeGallery').fadeOut(1000).fadeIn(1000, galleryChoice(localTitle))

        // Changes title and swaps url in time with animations 
        function galleryChoice(choice) {
            setTimeout(function () {
                iframeC.find("#galleryTitle").html(`${choice}`);
                urlChange(choice);
            }, 950);

            // Iterates through each image id, passing through info to swap out each anchor url
            function urlChange(str) {
                const idArray = ['l1', 'l2', 'l3', 'w1', 'w2', 'w3']
                var lwr = str.toLowerCase();
                for (i = 0; i < idArray.length; i++) {
                    ancSwap(iframeC, idArray[i], lwr);
                }

                // Swaps the anchor urls to change images adjusts the height upon thumbnails loading
                function ancSwap(frameCont, id, lwrString) {
                    var findID = frameCont.find(`#${id} > a`);
                    findID.css('background-image', `url(../assets/images/${lwrString}/${lwrString}${id}_tn.jpg)`);
                    findID.attr('data-image-full', `../assets/images/${lwrString}/${lwrString}${id}.jpg`);
                    // adjusts the iframe height upon thumbnails loading
                    iframeC.find(".img-fluid").on('load', galleryHeight)
                }
            }
        }
    }

    // Adjusts gallery height for varying picture formats and devices
    function galleryHeight() {
        const mapGallery = document.getElementById('iframeGallery');
        if (mapGallery) {
            mapGallery.height = "";
            mapGallery.height = mapGallery.contentWindow.document.body.offsetHeight + 'px';
        }
    }
});


var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.125298, lng: -6.148618 },
        zoom: 2,

        // Styles Map for better consistency with the site theme, using https://mapstyle.withgoogle.com/
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#00611c"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#001105"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    },
                    {
                        "lightness": 100
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#373737"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "lightness": 20
                    }
                ]
            }
        ]
    });
}