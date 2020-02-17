// Adjusts gallery height for varying picture formats and devices
function galleryHeight() {
    const mapGallery = document.getElementById('iframeGallery');
    if (mapGallery) {
        mapGallery.height = '';
        mapGallery.height = mapGallery.contentWindow.document.body.offsetHeight + 'px';
    }
}

$(document).ready(function () {
    // adjusts iframe height based on device and photo length
   $('iframe').on('load', galleryHeight);

    // Makes the scroll arrow disappear if the bar is at the top
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $('.fa-arrow-up').fadeIn(600);
        } else {
            $('.fa-arrow-up').fadeOut(600);
        }
    });

    // Scrolls to top on clicking the arrow
    $('.fa-arrow-up').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1200);
    });
});

$(window).on('load', function () {
    // selects countries to search for in API
    const countryName = ['Canada', 'China', 'Egypt', 'Germany', 'India', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Morocco', 'United States of America'];

    // Allows selection of elements within the iframe
    const iframeC = $('iframe#iframeGallery').contents();

    // variable containing country info
    let countryData = [];

    // array containing marker info
    let markerArr = [];

    // Variable creating a single infowindow for the mapp
    const infowindow = new google.maps.InfoWindow();

    const xhr = new XMLHttpRequest();

    // Searches for country info on API
    xhr.open('GET', `https://restcountries.eu/rest/v2/all`);
    xhr.send();

    // Fires off function for creating the needed country info arrays
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            getData(data);
            // Prevents backupMap from running multiple times, set to use local info if conditions are bad
        } else if (this.readyState == 4 && this.status !== 200) {
            backupMap();
        }
    });

    // resizes Gallery on window size change, otherwise window is incorrectly sized.
    $(window).resize(galleryHeight)

    // iterates through the array for matching country names and pushes them to the Countrydata variable
    function getData(data) {
        data.forEach(function (item) {
            for (let i = 0; i < countryName.length; i++) {
                if (item.name === countryName[i]) {
                    countryData.push(item);
                }
            }
        });
        makeMarkers(countryData);
    }

    // toggles the bounce animation for the selected marker
    function bounce(markNum) {
        if (markNum.getAnimation() !== null) {
            markNum.setAnimation(null);
        } else {
            markNum.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    function galleryScroll() {
        const ancTag = $('#scrollPoint');
        $('html,body').animate({ scrollTop: ancTag.offset().top }, 1200);
    }

    // Opens a modal in gallery.html when an image in the iframe is clicked
    iframeC.find('.pop').on('click', function () {
        $('.imagepreview').attr('src', $(this).attr('data-image-full'));
        $('#imagemodal').modal('show');
    });

    // Function compiling array data into markers
    function makeMarkers(markerData) {
        const length = markerData.length;
        // iterates through array info
        for (let i = 0; i < length; i++) {
            const location = markerData[i].latlng;
            const latLng = new google.maps.LatLng(location[0], location[1]);
            const placeName = markerData[i].name;
            const marker = new google.maps.Marker({
                position: latLng,
                title: placeName,
                map: map,
                animation: google.maps.Animation.DROP,
            });

            markerArr.push(marker);

            // Iterates through each marker on the map, sets the animation to null before pushing the marker through to the other functions
            google.maps.event.addListener(marker, 'click', function () {
                for (let i = 0; i < markerArr.length; i++) {
                    markerArr[i].setAnimation(null);
                }

                setTimeout(galleryScroll, 2000);

                const markTitle = this.title;
                bounce(this);
                pageSwitch(markTitle);
                infoContent(this, markTitle);
            });
        }
    }

    // Controls page animation, passing marker title to gallery changing function
    function pageSwitch(markName) {
        const lwr1 = markName.toLowerCase().replace(/\s+/g, '');
        $('iframe#iframeGallery').fadeOut(1000).fadeIn(1000, galleryChoice(markName));

        // Changes title and swaps url in time with animations, places blurb content into gallery
        function galleryChoice(markName) {
            const blurbContent = $(`#${lwr1}content`).html();
            setTimeout(function () {
                iframeC.find('#galleryTitle').html(`${markName}`);
                iframeC.find('#countryBlurb').html(`${blurbContent}`);
                urlChange();
            }, 900);

            // Iterates through each image id, passing through info to swap out each anchor url
            function urlChange() {
                const idArray = ['l1', 'l2', 'l3', 'w1', 'w2', 'w3']
                for (i = 0; i < idArray.length; i++) {
                    ancSwap(idArray[i], lwr1);
                }

                // Swaps the anchor urls to change images adjusts the height upon thumbnails loading
                function ancSwap(idNum, lwr1) {
                    const findID = iframeC.find(`#${idNum}`);
                    findID.css('background-image', `url(assets/images/${lwr1}/${lwr1}${idNum}_tn.jpg)`);
                    findID.attr('data-image-full', `assets/images/${lwr1}/${lwr1}${idNum}.jpg`);
                }

                // adjusts the iframe height upon image
                iframeC.find('#l1 > img', '#l2 > img', '#l3 > img', '#w1 > img', '#w2 > img', '#w3 > img').on('load', galleryHeight);
            }
        }
    }



    function infoContent(markNum, markTitle) {
        // changes the string to be suitable to the directory by removing uppercase letters and spaces
        // Sets blurb content for each location in the iframe
        let markContent = ``;
        let langData = [];

        countryData.forEach(function (item) {
            // function to parse through language arrays
            langGet(item);

            // Sets blurb content for selected country
            for (let i = 0; i < countryData.length; i++) {
                if (item.name === markTitle) {
                    markContent = `<h1 class="heading-font">${item.name}</h1>
                                    <div>
                                        <ul id="infowindowlist" class="m-0 p-0 pb-2">
                                            <li>Native Name: ${item.nativeName}</li>
                                            <li>Languages: ${langData.join(', ')}</li>
                                            <li>Capital: ${item.capital}</li>
                                            <li>Population: ${item.population.toLocaleString('en-US')} people</li>
                                            <li>Area: ${item.area.toLocaleString('en-US')} km</li>
                                        </ul>
                                    </div>`;
                }
            }

            // Parses language array from countryData, clears the langData array before pushing the 
            // relevant country info back into the array for display
            function langGet(item) {
                const lang = item.languages;
                langData = [];
                for (let x = 0; x < lang.length; x++) {
                    langData.push(lang[x].name);
                }
            }

            // Sets the content for the infowindow
            infowindow.setContent(markContent);
        });

        // Opens infowindow on clcik
        infowindow.open(map, markNum);
    }

    // Parses markerArray.js for details to give each marker on the map and pushes it to the array in case the API fails
    // Does not run infoContent function at the end, preventing empty infowindow content from popping up
    function backupMap() {

        $.getJSON('assets/js/markerArray.js', function (data) {
            const length = data.locations.length;
            for (let i = 0; i < length; i++) {
                const eachItem = data.locations[i].attributes;
                const latLng = new google.maps.LatLng(eachItem.Latitude, eachItem.Longitude);
                const placeName = eachItem.title;
                const marker = new google.maps.Marker({
                    position: latLng,
                    title: placeName,
                    map: map,
                    animation: google.maps.Animation.DROP,
                });

                markerArr.push(marker);

                // Iterates through each marker on the map, sets the animation to null before pushing the marker through to the other functions
                google.maps.event.addListener(marker, 'click', function () {
                    for (let i = 0; i < markerArr.length; i++) {
                        markerArr[i].setAnimation(null);
                    }

                    setTimeout(galleryScroll, 2000);

                    const markTitle = this.title;
                    bounce(this);
                    pageSwitch(markTitle);
                });
            }
        });
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

        // Sets zoom level further out if device screen is smaller than 700px
    const mq = window.matchMedia('(max-width: 700px)');
    if (mq.matches) {
        map.setZoom(1);
    }
}