// Countries to match in the API for display on the map
const countryName = [
	"Canada",
	"China",
	"Egypt",
	"Germany",
	"India",
	"Ireland",
	"Italy",
	"Japan",
	"Kenya",
	"Mexico",
	"Morocco",
	"United States of America",
];

// variable array that will contain country API info
let countryData = [];

/**
 * Iterates through the array for matching country names and pushes them to the CountryData variable
 * @param {string} data - Parsed JSON country info data from the API
 */
function getData(data) {
	data.forEach(function (item) {
		for (let i = 0; i < countryName.length; i++) {
			if (item.name === countryName[i]) {
				// Matches country names to the API for selection
				countryData.push(item);
			}
		}
	});
	makeMarkers(countryData); // Pushes the REST Country API info into a function to make markers on the map
}

// array containing created marker info for use on the map.
let markerArr = [];

/**
 * Function compiling array from countryData into markers
 * @param {array} countryData - The Array containing the info pushed from the getData function
 */
function makeMarkers(countryData) {
	const length = countryData.length;

	/**
	 * Iterates through each marker on the map, sets the animation to null before pushing the marker through to the other functions.
	 * This loops through all markers, prevents them from bouncing.
	 * @param {Object} marker - The marker object created by makeMarkers function
	 */
	function markerClick(marker) {
		google.maps.event.addListener(marker, "click", function () {
			for (let i = 0; i < markerArr.length; i++) {
				markerArr[i].setAnimation(null);
			}

			// waits 2 seconds before scrolling from the map down to the gallery
			setTimeout(galleryScroll, 2000);

			// selects the marker's title (the placename) to passthrough to other functions
			const markTitle = this.title;
			// animates the marker
			bounce(this);
			// switches iframe content
			pageSwitch(markTitle);
			// uses the API info to fill in an infowindow on the map
			infoContent(this, markTitle);
		});
	}

	for (let i = 0; i < length; i++) {
		// iterates through array info and selects coordinates from the array,
		// Sets coordinates to each marker and finally creates the marker.
		const location = countryData[i].latlng;
		const latLong = new google.maps.LatLng(location[0], location[1]);
		const placeName = countryData[i].name;
		const marker = new google.maps.Marker({
			position: latLong,
			title: placeName,
			map: map,
			animation: google.maps.Animation.DROP,
		});

		// pushes each marker into an array
		markerArr.push(marker);
		//Adds an event listener for a click to run swapping functions.
		markerClick(marker);
	}
}

/**
 * Essentially the same function as makeMarkers, but functions when the API is offline.
 * Parses markerArray.js for details to give each marker on the map and pushes it to the array in case the API fails.
 * Does not run infoContent function at the end, preventing empty infowindow content from popping up.
 * all other functions are identical.
 */
function backupMap() {
	$.getJSON("assets/js/markerArray.js", function (data) {
		const length = data.locations.length;

		/**
		 * Iterates through each marker on the map, sets the animation to null before pushing the marker through to the other functions.
		 * This loops through all markers, prevents them from bouncing.
		 * @param {Object} marker - The marker object created by makeMarkers function
		 */
		function markerClick(marker) {
			google.maps.event.addListener(marker, "click", function () {
				for (let i = 0; i < markerArr.length; i++) {
					markerArr[i].setAnimation(null);
				}

				// waits 2 seconds before scrolling from the map down to the gallery
				setTimeout(galleryScroll, 2000);

				// selects the marker's title (the placename) to passthrough to other functions
				const markTitle = this.title;
				// animates the marker
				bounce(this);
				// switches iframe content
				pageSwitch(markTitle);
				// uses the API info to fill in an infowindow on the map
				infoContent(this, markTitle);
			});
		}
		for (let i = 0; i < length; i++) {
			const eachItem = data.locations[i].attributes;
			const latLong = new google.maps.LatLng(
				eachItem.Latitude,
				eachItem.Longitude
			);
			const placeName = eachItem.title;
			const marker = new google.maps.Marker({
				position: latLong,
				title: placeName,
				map: map,
				animation: google.maps.Animation.DROP,
			});

			markerArr.push(marker);
			//Adds an event listener for a click to run swapping functions.
			markerClick(marker);
		}
	});
}

/**
 * A simple function that scrolls down to the gallery after clicking on a map marker
 */
function galleryScroll() {
	const ancTag = $("#scroll-point");
	$("html,body").animate({ scrollTop: ancTag.offset().top }, 1200);
}

/**
 * A function that makes the selected marker bounce or stop bouncing, and ensures the others aren't animated
 * @param {Object} markNum - The marker object created by makeMarkers function
 */
function bounce(markNum) {
	if (markNum.getAnimation() !== null) {
		markNum.setAnimation(null);
	} else {
		markNum.setAnimation(google.maps.Animation.BOUNCE);
	}
}

// Allows selection of elements within the iframe
const iframeC = $("iframe#iframe-gallery").contents();

/**
 * This function swaps all of the data in the iframe.
 * It utilises the API data to swap image URLS, gallery title, description, in the iFrame.
 * It uses animations to smoothen the change.
 * imageLoadSwitch.js has scripts that detect the change and reset the lazyLoad image blur.
 * It holds three other functions, galleryChoice, urlChange and ancSwap, all used solely for this function.
 * @param {string} markTitle - The title of the marker, the name of the country.
 */
function pageSwitch(markTitle) {
	// takes the marker title, changes it to lowercase and removes spaces (e.g. from USA) for use in urls
	const lwr1 = markTitle.toLowerCase().replace(/\s+/g, "");

	/**
	 * Swaps the CSS and attributes for the card-images,
	 * to load the correct images when a different country is selected.
	 * Follows a rigid file structure to access and place files.
	 * @param {string} idArrayNum - an identifier for images used in the HTML to maintain layout.
	 * @param {string} lwr1 0 string representing the country in lower
	 */
	function ancSwap(idArrayNum, lwr1) {
		// selects the correct image id
		const findID = iframeC.find(`#${idArrayNum}`);
		findID.css(
			"background-image",
			`url(assets/images/${lwr1}/${lwr1}${idArrayNum}_tn.jpg)`
		);
		// swaps the url to the correct image
		findID.attr(
			"data-image-full",
			`assets/images/${lwr1}/${lwr1}${idArrayNum}.jpg`
		);
	}

	/**
	 * Iterates through each image and fires ancSwap to change to the correct images.
	 * Then once all the images load, it adjusts the height of the gallery.
	 */
	function urlChange() {
		// an array filled with tags attached to the end of each image (l= long, w=wide for each photo)
		const idArray = ["l1", "l2", "l3", "w1", "w2", "w3"];
		for (i = 0; i < idArray.length; i++) {
			// iterates through the array to swap the url for each photo
			ancSwap(idArray[i], lwr1);
		}

		// adjusts the iframe height upon all images loading, doing so before will set incorrect height
		iframeC
			.find(
				"#l1 > img",
				"#l2 > img",
				"#l3 > img",
				"#w1 > img",
				"#w2 > img",
				"#w3 > img"
			)
			.on("load", galleryHeight);
	}

	/**
	 * This first switches the written content for a gallery and then initiates the image change.
	 * @param {string} markTitle - The title of the marker, the name of the country.
	 */
	function galleryChoice(markTitle) {
		// selects unique country blurbs from the gallery for insertion into the iframe
		const blurbContent = $(`#${lwr1}-content`).html();
		setTimeout(function () {
			// Creates a heading for the iframe and fills an empty element in the iframe with the blurb
			iframeC.find("#gallery-title").html(`${markTitle}`);
			iframeC.find("#country-blurb").html(`${blurbContent}`);
			urlChange();
		}, 900);
	}

	// animates the switch so the image change is less noticeable
	$("iframe#iframe-gallery")
		.fadeOut(1000)
		.fadeIn(1000, galleryChoice(markTitle));
}

/**
 * This is the window that shows when a marker is clicked.
 * It utilises info pulled from the API to display some statistics.
 * It empties and refreshes itself every time a marker is clicked,
 * so it doesn't populate more than one window at a time.
 * Contains the langGet function
 * @param {Object} markNum - The marker object created by makeMarkers function
 * @param {string} markTitle - The title of the marker, the name of the country.
 */
function infoContent(markNum, markTitle) {
	// clears the infowindow content so it doesn't stack each click
	let markContent = ``;
	// an array that can be used for countries with multiple languages
	let langData = [];

	/**
	 * This cycles through a country's languages and creates an array for use in the info window.
	 * @param {dict} item
	 */
	function langGet(item) {
		const lang = item.languages;
		// clears langData so it doesn't stack
		langData = [];
		// pushes each language to the array
		for (let x = 0; x < lang.length; x++) {
			langData.push(lang[x].name);
		}
	}

	countryData.forEach(function (item) {
		// function to parse through language arrays
		langGet(item);

		// Sets infowindow content for selected country.
		for (let i = 0; i < countryData.length; i++) {
			// Iterates through the countryData array to check names.
			if (item.name === markTitle) {
				// Matches the specific country marker to the country in the API to populate the info.
				// Fills the infowindow with content from the API, adding spaces and commas.
				markContent = `<h1 class="heading-font h4">${item.name}</h1>
                                <div>
                                    <ul id="infowindowlist" class="m-0 p-0 pb-2">
                                        <li>Native Name: ${item.nativeName}</li>
                                        <li>Languages: ${langData.join(
											", "
										)}</li>
                                        <li>Capital: ${item.capital}</li>
                                        <li>Population: ${item.population.toLocaleString(
											"en-US"
										)} people</li>
                                        <li>Area: ${item.area.toLocaleString(
											"en-US"
										)} km</li>
                                    </ul>
                                </div>`;
			}
		}
		// Sets the content for the infowindow
		window.infowindow.setContent(markContent);
	});
	// Opens infowindow on click
	window.infowindow.open(map, markNum);
}

/**
 * Adjusts gallery height for varying picture formats and devices.
 * Each country gallery may vary in height, so it resets the iframe height.
 */
function galleryHeight() {
	const mapGallery = document.getElementById("iframe-gallery");
	if (mapGallery) {
		mapGallery.height = "";
		// sets iframe height to the height of the internal content
		mapGallery.height =
			mapGallery.contentWindow.document.body.offsetHeight + "px";
	}
}

$(document).ready(function () {
	// adjusts iframe height based on device and photo length once the iframe loads.
	$("iframe").on("load", galleryHeight);

	// Displays an arrow which scrolls to top after scrolling down past a set point.
	$(window).scroll(function () {
		// has the appear when you scroll down over 50px
		if ($(this).scrollTop() >= 50) {
			$(".fa-arrow-up").fadeIn(1000);
		} else {
			// Makes the scroll arrow disappear if the scrollbar is at the top
			$(".fa-arrow-up").fadeOut(1000);
		}
	});

	// Scrolls to top on clicking the arrow
	$(".fa-arrow-up").click(function () {
		$("body,html").animate(
			{
				scrollTop: 0,
			},
			1200
		);
	});
});

$(window).on("load", function () {
	// Declare a global variable for the infoWIndow once the window has loaded.
	window.infowindow = new google.maps.InfoWindow();

	const xhr = new XMLHttpRequest();

	// Searches for country info on API
	xhr.open("GET", `https://restcountries.eu/rest/v2/all`);
	xhr.send();

	// Fires off function for creating the needed country info arrays
	xhr.addEventListener("readystatechange", function () {
		// passes on the data if the response is ready
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText);
			getData(data);
			// Prevents backupMap from running multiple times, set to use local info if conditions are bad
		} else if (this.readyState == 4 && this.status !== 200) {
			backupMap();
		}
	});

	// resizes Gallery on window size change, otherwise iframe is incorrectly sized.
	$(window).resize(galleryHeight);

	// Opens a modal in gallery.html when an image in the iframe is clicked
	iframeC.find(".pop").on("click", function () {
		$(".imagepreview").attr("src", $(this).attr("data-image-full"));
		$("#image-modal").modal("show");
	});
});

var map;
/**
 * Google map API functions. It initializes the map.
 * It themes the map and sets the zoom level depending on device size.
 */
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 45.125298, lng: -6.148618 },
		zoom: 2,

		// Styles Map for better consistency with the site theme, using https://mapstyle.withgoogle.com/
		styles: [
			{
				elementType: "geometry",
				stylers: [
					{
						color: "#212121",
					},
				],
			},
			{
				elementType: "labels.icon",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#757575",
					},
				],
			},
			{
				elementType: "labels.text.stroke",
				stylers: [
					{
						color: "#212121",
					},
				],
			},
			{
				featureType: "administrative",
				elementType: "geometry",
				stylers: [
					{
						color: "#757575",
					},
				],
			},
			{
				featureType: "administrative.country",
				elementType: "geometry.stroke",
				stylers: [
					{
						color: "#00611c",
					},
				],
			},
			{
				featureType: "administrative.country",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#9e9e9e",
					},
				],
			},
			{
				featureType: "administrative.land_parcel",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "administrative.locality",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#bdbdbd",
					},
				],
			},
			{
				featureType: "administrative.province",
				elementType: "geometry.stroke",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "administrative.province",
				elementType: "labels.text",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "poi",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#757575",
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "geometry",
				stylers: [
					{
						color: "#001105",
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#616161",
					},
					{
						lightness: 100,
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.stroke",
				stylers: [
					{
						color: "#1b1b1b",
					},
				],
			},
			{
				featureType: "road",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "road",
				elementType: "geometry.fill",
				stylers: [
					{
						color: "#2c2c2c",
					},
				],
			},
			{
				featureType: "road",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#8a8a8a",
					},
				],
			},
			{
				featureType: "road.arterial",
				elementType: "geometry",
				stylers: [
					{
						color: "#373737",
					},
				],
			},
			{
				featureType: "road.highway",
				elementType: "geometry",
				stylers: [
					{
						color: "#3c3c3c",
					},
				],
			},
			{
				featureType: "road.highway.controlled_access",
				elementType: "geometry",
				stylers: [
					{
						color: "#4e4e4e",
					},
				],
			},
			{
				featureType: "road.local",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#616161",
					},
				],
			},
			{
				featureType: "transit",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#757575",
					},
				],
			},
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [
					{
						color: "#000000",
					},
				],
			},
			{
				featureType: "water",
				elementType: "labels.text",
				stylers: [
					{
						lightness: 20,
					},
				],
			},
		],
	});

	// Sets zoom level further out if device screen is smaller than 768px
	const mq = window.matchMedia("(max-width: 768px)");
	if (mq.matches) {
		map.setZoom(1);
	}
}
