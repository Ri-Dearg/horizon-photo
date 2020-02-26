# Horizon Photography

The site is desgined as a portfolio for a travel Photographer. Its goal is to highlight the photographer and to create interest in their work.
Link to deployed project [here](https://ri-dearg.github.io/horizon-photo/index.html).

## UX

### Outline
The home page is desgined to have a big impact with a strong image upon loading. Image blur is used on the splash image as it may take a long time on a slow connection and must display at once for a greater impact. An image with a person in it is used so the viewer can connect with it on a personal level. A landscape image is utilised to communicate the idea of travel. A jumbotron with a headline is made immediately evident to acquire give a indication of the theme. Below is a short introduction to the photographer, followed by a link to the gallery with an image of a map. Finally, there is the footer with basic details repeated and an option to subscribe to the newsletter.

The flow is designed to first have an impact to create interest and highlight the work followed by basic necessary information about the photographer, and returning, following by highlighting the idea of travel. The footer finishes with any crucial info repeated and the option to subscribe to a newsletter.

Images used are of full quality as I felt it necessary for a photographer's website that the best quality is always utilised. Loading blur is used where appropriate to ensure that the images will be loaded at full quality without disruption to the user experience.

### Layouts, Colours and Styles
The layout utilised is simple, a sticky nav helps to navigate after scrolling down. The navbar collapses below medium devices as the spacing in the fonts becomes squahed on smaller devices. The logo shifts from the center on larger devices to the left side on smaller devices so it is always visible. The nav features only two obvious options for simplicity and a focus on what's important: the gallery. The footer contains basic options: newsletter, social links, contact. The gallery has a map with markers which, when clicked, open a gallery coressponding to the country. An infowindow opens, the map shifts to focus on it and after a few seconds the page automatically scrolls down to the images. Once the page shifts down an arrow appears that scrolls you back up to the map. The gallery is responsive and opens a large modal on an image click to highlight the photo, modal background is darkened significantly to highlight the photo. Contact page is simple and clean, with photographer info stacked on top of the form.

The main color used is black, to keep the design clean and to contrast with the colors of the photos so that they remain the focus. Secondary colors used are a silver-grey or white to continue the clean look. A deep green is used as an accent to add color and create a thematic connection with nature. The dark colors highlight the colors of the photographs much better than a lighter color. This theme is continued throughout the site to retain a minimalistic, clean design with a focus on the photographer's work.

The fonts are sans-serif in keeping with the clean, minimal design elements. An uppercase font is used to emphasise all headings. 

### User Stories
As a user interested in photography, I expect to see a varied photography portfolio.

As a user interested in travel, I expect to be able to explore locations through photography.

As a user interested in project work, I can use the contact form to reach the photographer.

### Wireframes
Wireframe: https://drive.google.com/open?id=17ZBPFFBDwHyMecXJiWNz-r5LhEaP79as

## Features

### Features implemented

- Map styled consistently with website
- Map zooms differently based on device size
- A map that is populated with markers featuring drop animation on load, bounce animation on selection
- Marker information pulled from REST Countries API
- Backup marker array so the map and gallery can still be populated if the API fails
- The function skips the infowindow as it would not be able to be populated
- Map has infowindow that auto-populates with content pulled from the API
- Map features a fully responsive gallery within an iframe
- Gallery auto-scrolls down after 2 seconds to iframe heading after selecting a marker
- An arrow that scrolls back to the map appears after scrolling down
- Iframe images, heading and blurb swap country on marker selection
- Iframe height auto adjust on window resize and iframe images loading
- All images use loading blur and thumbnail placeholders until they are fully loaded
- An image popup modal appears when an image is clicked to highlight it
- Form Validation
- The newsletter allows people to sign up to receive the blog posts to the their inbox.
- Modal with success/error response on filling in forms ons the site

## Technologies Used
- Languages
    - [HTML](w3.org/standards/webdesign/htmlcss)
        * Page markup
    - [CSS](w3.org/standards/webdesign/htmlcss)
        * Styling
    - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
        * Map, iframe, response windows
    - [JQuery](https://jquery.com/)
        * Map, iframe, response windows
- Framework
    - [Bootstrap](https://getbootstrap.com/)
        * Used for basic styles and outline
- Resources
    - [Fontawesome](https://fontawesome.com/)
        * Used for icons
    - [Google Fonts](https://fonts.google.com)
        * Font Styles
    - [Favicon Generator](https://www.favicon-generator.org/)
        * Favicons
    - [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
        * Map
    - [REST Countries API](https://restcountries.eu/)
        * Statistics for infowindow, marker information

## Testing
- I have tested the site and its layout on multiple android devices, different sizes, on multiple browsers. I was unable to test on iOS. Mainly developed and tested using chrome developer mode. It is fully responsive with a clean layout on each device.
- The image loading blur has been thoroughly tested and gone through numerous iterations to optimise the smoothness of the transition on different devices and internet speeds.
- Changes in the UI occur depending on size, such as map zoom level, navbar logo position, iframe height, modal size, image styling.
- In case the REST Countries API fails, I have implemented a secondary backup array which will populate the map markers and provide enough info to change the images in the iframe.
- Iframe adjusts height based on the content within and window size, as switching images often left images cut.
- Animation length has been adjusted to aid in smoothing the transition
- All forms have validation and will not submit without the proper information.
- Different functions are provided for the newsletter and contact form.
- Forms will clear their field upon successful submission and the page will not reload.
- A modal will clarify the success or the failure of the form submission and provide error codes.
- An auto-reply to the form submission has been implemented.
- For ease of use, the gallery automatically scrolls down to the iframe with the images amd an arrow is provided that scrolls back to the top.
- The fixed navabar covered the heading, so I created an offset div to scroll down to.
- External links open in a new tab.
- Images sytematically organised for iframe image switching functions.
- Links checked with [W3C Link Checker](https://validator.w3.org/checklink)
- HTML has been validated with [W3C HTML5 Validator](https://validator.w3.org/)
- CSS has been validated with [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and auto-prefixed with [CSS Autoprefixer](https://autoprefixer.github.io/)
- Each javascript file was tested on the site for errors and fucntionality using the console and with [JSHint](https://jshint.com/).
- gitignore file has been included to prevent system file commits
- Each feature was developed and tested in its own branch before being pushed to master.

## Deployment
1. Set up a git hub repository for deployment and set up an SSH key.
0. Push the master branch to the Github Repository. The site will update automatically from the master branch.
0. Go to the settings of the repository and select the Github pages section.
0. Validate and test HTML, CSS and Javascript.
0. Published the site from the master branch, ensure index.html is the landing page.

### User Deployment
1. Download Master Branch.
0. Unzip contents into a folder.
0. Open up index.html in a web browser. Site will function offline.

To run locally, you can clone this repository by clicking the clone button on the repository or by typing ```git clone https://github.com/Ri-Dearg/horizon-photo``` into your terminal. To disconnect from this repository, type ```git remote rm origin``` into the terminal.

## Credits

### Content
All text content was generated by GPT-2 and lighlty edited at [Talk to Transformer](https://talktotransformer.com/).  
Any code utilised from a site is documented and credited within the code.

### Media
All photographs, authors, license rights, copyright, etc. used in this project can be found [here.]( https://unsplash.com/collections/8825126/used-in-horizon-photo)  
All other media used is my own.
