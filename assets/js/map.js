// Adjusts gallery height for varying picture formats and devices
function galleryHeight() {
    const mapGallery = document.getElementById('iframe-gallery');
    if (mapGallery) {
        mapGallery.height = '';
        mapGallery.height = mapGallery.contentWindow.document.body.offsetHeight + 'px'; // sets iframe height to the height of the internal content

    }
}

$(document).ready(function () {
    // adjusts iframe height based on device and photo length once the document loads
   $('iframe').on('load', galleryHeight);

    // sets the display of the scroll to top arrow
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) { // has the appear when you scroll down over 50px
            $('.fa-arrow-up').fadeIn(600);
        } else {
            $('.fa-arrow-up').fadeOut(600);  // Makes the scroll arrow disappear if the scrollbar is at the top
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
    // selects countries to match for in API
    const countryName = ['Canada', 'China', 'Egypt', 'Germany', 'India', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Morocco', 'United States of America'];

    // Allows selection of elements within the iframe
    const iframeC = $('iframe#iframe-gallery').contents();

    // variable containing country API info
    let countryData = [];

    // array containing created marker info
    let markerArr = [];

    // Variable creating a single infowindow for the mapp
    const infowindow = new google.maps.InfoWindow();

    const xhr = new XMLHttpRequest();

    // Searches for country info on API
    xhr.open('GET', `https://restcountries.eu/rest/v2/all`);
    xhr.send();

    // Fires off function for creating the needed country info arrays
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) { // passes on the data if the response is ready
            data = JSON.parse(this.responseText);
            getData(data);
        } else if (this.readyState == 4 && this.status !== 200) { // Prevents backupMap from running multiple times, set to use local info if conditions are bad
            backupMap();
        }
    });

    // resizes Gallery on window size change, otherwise iframe is incorrectly sized.
    $(window).resize(galleryHeight)

    // iterates through the array for matching country names and pushes them to the Countrydata variable
    function getData(data) {
        data.forEach(function (item) {
            for (let i = 0; i < countryName.length; i++) {
                if (item.name === countryName[i]) { // Matches country names to the API for selection
                    countryData.push(item);
                }
            }
        });
        makeMarkers(countryData); // Pushes the REST Country API info into a function to make markers on the map
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
        const ancTag = $('#scroll-point'); // Selects an empty div to scroll to
        $('html,body').animate({scrollTop: ancTag.offset().top}, 1200); // Selects an empty div to scroll to.
    }

    // Opens a modal in gallery.html when an image in the iframe is clicked
    iframeC.find('.pop').on('click', function () {
        $('.imagepreview').attr('src', $(this).attr('data-image-full'));
        $('#image-modal').modal('show');
    });

    // Function compiling array from countryData into markers
    function makeMarkers(markerData) {
        const length = markerData.length;
        for (let i = 0; i < length; i++) { // iterates through array info
            const location = markerData[i].latlng; // Selects coordinates from the array
            const latLong = new google.maps.LatLng(location[0], location[1]); // Sets coordinates  to each marker
            const placeName = markerData[i].name; // Sets coordinates  to each marker
            const marker = new google.maps.Marker({ // creates marker
                position: latLong,
                title: placeName,
                map: map,
                animation: google.maps.Animation.DROP,
            });

            markerArr.push(marker); // pushes each marker into an array


            // Iterates through each marker on the map, sets the animation to null before pushing the marker through to the other functions
            google.maps.event.addListener(marker, 'click', function () {
                for (let i = 0; i < markerArr.length; i++) {
                    markerArr[i].setAnimation(null);
                }

                setTimeout(galleryScroll, 2000); // waits 2 seconds before scrolling from the map down to the gallery

                const markTitle = this.title; // selects the marker's title (the placename) to passthrough to other functions
                bounce(this); // animates the marker
                pageSwitch(markTitle); // switches iframe content
                infoContent(this, markTitle); // uses the API info to fill in an infowindow on the map
            });
        }
    }

    // Controls page animation, passing marker title to gallery changing function
    function pageSwitch(markName) {
        const lwr1 = markName.toLowerCase().replace(/\s+/g, ''); // takes the marker title, changes it to lowercase and removes spaces (e.g. from USA) for use in urls
        $('iframe#iframe-gallery').fadeOut(1000).fadeIn(1000, galleryChoice(markName)); // animates the switch so the image change is less noticeable

        // Changes title and swaps url in time with animations, places blurb content into gallery
        function galleryChoice(markName) {
            const blurbContent = $(`#${lwr1}-content`).html(); // selects unique country blurbs from the gallery for insertion into the iframe
            setTimeout(function () {
                iframeC.find('#gallery-title').html(`${markName}`); // Creates a heading for the iframe
                iframeC.find('#country-blurb').html(`${blurbContent}`); // fills an empty element in the iframe with the blurb
                urlChange(); //switches the image urls
            }, 900);

            // Iterates through each image id, passing through info to swap out each anchor url
            function urlChange() {
                // an array filled with tags attached to the end of each image (l= long, w=wide for each photo)
                const idArray = ['l1', 'l2', 'l3', 'w1', 'w2', 'w3']
                for (i = 0; i < idArray.length; i++) { // iterates through the array to swap the url for each photo
                    ancSwap(idArray[i], lwr1); // passes the info to swap the urls 
                }

                // Swaps the anchor urls to change images adjusts the height upon thumbnails loading
                function ancSwap(idNum, lwrString) {
                    const findID = iframeC.find(`#${idNum}`); // selects the correct image id
                    findID.css('background-image', `url(assets/images/${lwrString}/${lwrString}${idNum}_tn.jpg)`); // swaps the url to the correct image
                    findID.attr('data-image-full', `assets/images/${lwrString}/${lwrString}${idNum}.jpg`);
                }

                // adjusts the iframe height upon all images loading, doing so before will set incorrect height
                iframeC.find('#l1 > img', '#l2 > img', '#l3 > img', '#w1 > img', '#w2 > img', '#w3 > img').on('load', galleryHeight);
            }
        }
    }


    // populates the infowindow with info from the REST COuntry API
    function infoContent(markNum, markTitle) {
        let markContent = ``; // clears the infowindow content so it doesn't stack each click
        let langData = []; // an array that can be used for countries with multiple languages

        countryData.forEach(function (item) {
            langGet(item); // function to parse through language arrays

            // Sets infowindow content for selected country
            for (let i = 0; i < countryData.length; i++) { // iterates through the countryData array to check names
                if (item.name === markTitle) { // matches the specific country marker to the country in the API to populate the info 
                    // fills the infowindow with content from the API, adding spaces and commas
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

            // Parses language array from countryData for the infowindow
            function langGet(item) {
                const lang = item.languages;
                // clears langData so it doesn't stack
                langData = [];
                // pushes each language to the array
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
    // all other functions are identical
    function backupMap() {

        $.getJSON('assets/js/markerArray.js', function (data) {
            const length = data.locations.length;
            for (let i = 0; i < length; i++) {
                const eachItem = data.locations[i].attributes;
                const latLong = new google.maps.LatLng(eachItem.Latitude, eachItem.Longitude);
                const placeName = eachItem.title;
                const marker = new google.maps.Marker({
                    position: latLong,
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


// Google map API functions
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

    // Sets zoom level further out if device screen is smaller than 768px
    const mq = window.matchMedia('(max-width: 768px)');
    if (mq.matches) {
        map.setZoom(1);
    }
}