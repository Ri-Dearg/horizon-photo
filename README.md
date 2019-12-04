# Horizon Photography

The site is desgined as a portfolio for a travel Photographer. Its goal is to highlight the photographer and to create interest in their work.

## UX

### Outline

The home page is desgined to have a big impact with a strong image upon loading. A pre-loader is used to ensure the page is loaded before seeing it. An image with a person in it is used so the viewer can connect with it on a personal level. A landscape image is utilised to communicate the idea of travel. A jumbotron with a headline and a newsletter form are made immediately evident to acquire subscribers. Below is a short introduction to the photographer, followed by links to the gallery. Finally, there is the footer with basic details repeated.  
The flow is designed to first have an impact to create interest and highlight the work, then an option to interact with the newsletter, followed by basic necessary information about the photographer, and returning to highlight the work. The footer finishes with any crucial info repeated.

### User Stories
As a user interested in photography, or looking for a photgrapher to hire. The work is highlighted front and center, also highlighting the type of photgrpaher they may be. I would want to examine the Gallery or Contact. Both links are immediately avaialable in the navbar to view more work. I may be interested in the photographer, whom I can learn about by scrolling down. Once I scroll down, links to the gallery are again available to me, along with contact info.

As a user interested in travel, the Blog is highlighted in the navbar and the newsletter is immediately obvious, so I can look at details of travel. Scrolling down I can see different locations whose galleries I can explore. In the footer is another link for the newsletter if I am interested in following the blog.

### Colours
The main color used is black, to keep the design clean and to contrast with the colors of the photos so that they remain the focus. Secondary colors used are a silver-grey or white to continue the clean look. Transparent containers are used on top of the image so that the image remains visible throughout the site, without it taking up too much vertical space on mobile. This also means that the image does not shift around when opening and closing collapsable menus. A deep green is used as an accent to add color and create a thematic connection with nature. the dark colors highlight the colors of the photographs much better than a lighter color.  
The fonts are sans-serif in keeping with the clean, minimal design elements. An uppercase font is used to emphasise all headings.  
The navbar collapses below medium devices as the spacing in the fonts becomes squahed on smaller devices. The logo shifts from the center on larger devices to the left side on smaller devices so it is always visible.

### Wireframes
Wireframe: https://balsamiq.cloud/shm66pj/p116sdz
The designs for each page changed quite a bit as worked progressed, so they do not represent the wireframes any longer.

## Features

### Features implemented
- The newsletter allows people to sign up to receive the blog posts to the their inbox.
- The gallery highlight the locations visited with a filter tab for each location and a pop-up modal for the enlarged images. A blur before the image has loaded eases the loading time and maintains the layout.
- The blog is a collection of stories or information about the locations with related images, giving a story to images seen.
- A simple contact page.

### Features to be implemented
- Form Validation

#### Features Cancelled
- ~~A map with location linked to photos~~
- ~~Clicking on a location in the gallery will bring up a link to a blog post.~~


## Technologies Used
- Languages
    - [HTML](w3.org/standards/webdesign/htmlcss)
        * Page markup
    - [CSS](w3.org/standards/webdesign/htmlcss)
        * Styling
    - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
        * Pre-loader, filter switches, image loading blur
    - [JQuery](https://jquery.com/)
        * Used for bootstrap and some scripts
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
    - [Modernizr](https://modernizr.com/)
        * Pre-loader

I have also used numbers in my comments as a reference to highlight sections relevant to that comment. Example:
```HTML
<!-- 1. Comment with details of code use-->
<div class="xxxyyy">
...
</div>
<!-- 1. End -->
```

## Testing
So far I have only developed the homepage.
I have tested the site and its layout on multiple devices and different sizes. It seems fully responsive with a clean layout on each device.

The main issues I encountered were:
- The navbar toggle icon would shift position when opening the collapsable menu to the bottom left from the top right. There were also issues with the alignment of the text and width after adding the jumbotron. I used CSS to tidy things up.
- The logo image would display in the middle of the collapsable menu when expanded duw to its central position on larger devices, interrupting the list and meaning the logo would not be displayed in the navbar on smaller form factors. I placed two logos in the code and used bootstrap classes to set their display to none depending on device size.
- I was not happy with the way the image was displayed on smaller devices as the person in the photo was out of view and much of the image was being cut off. I mirrored the image and made some containers transparent, laying them on top of the image instead of above and below. Resolved.
- The fluid jumbotron was not fluid on larger devices. I wrapped more elements within it for resolution. The "About" title aligned to the right loked ugly on smaller device forms. I used bootstrap flex boxes to shift its position.
- Had difficulty creating a transition that scaled the image, but did not immedteately clip the image beside it on the "ease-out" phase eve when using the z-index. Solved by creating a keyframe animation using the z-index.
- Had to stop the animation from expanding the page width on mobile devices. Set overflow-x to hidden on the body element.
- Newsletter form had unusual positioning on small desktop sizes. Had to change style so it is a responsive inline form.
- The image was taking a long time to load, so I used a pre-loader to cover the page before the image fully loaded.
- The layout of the gallery had uneven spaces at the end due to using a free template. I changed the display property of the gallery to flex and created div flex-columns inside flexbox that wrapped different pictures per column. I then auto aligned them vertically for a more even spacing between content. This also creates a much nicer aesthetic and better use of the modal on smaller device screens.
- Gallery images were taking a long time and the progressive was ugly, so I used thumbnails and image blur to hold the layout and space of the image for a nicer aesthetic.
- I added a modal as it was impossible to zoom in on the images in the normal gallery layout.
- I had a secondary branch when testing out different gallery layouts. I deleted that branch after it was no longer useful.
- The blog layout with images on alternating sides on a larger screen was messy in a vertical view on smaller screens. I used to classes to ensure the order was always correct on smaller viewports.
- The text for each blog post was overflowing and creating an ugly layout when changing the viewport responsively. I truncated the text at a set line to best maintain the layout and the peek into the blog post.
- I found AWS to be a bit slow and my credit was disappearing. I switched to Gitpod

## Deployment
1. I set up a git hub repository for deployment and set up an SSH key.
0. I pushed the master branch to the Github Repository.
0. I went to the settings of the repository and went to the Github pages section.
0. I validated all HTML and CSS.
0. I published the site from the master branch.

### User Deployment
1. Download Master Branch.
0. Unzip contents into a folder.
0. Open up index.html in a web browser. Site should be totally accessible.

## Credits

### Content
To be added.  
Any code utilised from a site is documented and credited within the code.

### Media
All photographs, authors, license rights, copyright, etc. used in this project can be found [here.]( https://unsplash.com/collections/8825126/used-in-horizon-photo)  
All other media used is my own.