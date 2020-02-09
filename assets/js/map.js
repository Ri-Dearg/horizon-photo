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

        /*http://jsfiddle.net/geocodezip/qmboxs2u/*/
        google.maps.event.addListener(marker, 'click', function () {
            for (var i = 0; i < markerArr.length; i++) {
                markerArr[i].setAnimation(null);
            }
            toggleBounce(this);
            toggleDisplay(this);
        });
    }
});

function toggleBounce(bouncer) {
    if (bouncer.getAnimation() !== null) {
        bouncer.setAnimation(null);
    } else {
        bouncer.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function toggleDisplay(localGallery) {
    pageSwitch(localGallery);
    iframeHeight();
}

function pageSwitch(markerNum) {
    var localTitle = markerNum.title;
    $('#iframeGallery').fadeOut(1200, pageIn);

    function pageIn() {
        $('#iframeGallery').attr("src", "").attr("src", `iframe${localTitle}.html`)
    }
}

function iframeHeight() {
    var mapGallery = document.getElementById('iframeGallery');
    if (mapGallery) {
        mapGallery.height = "";
        mapGallery.height = mapGallery.contentWindow.document.body.scrollHeight;
        $('#iframeGallery').fadeIn(1200)
    }
}

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