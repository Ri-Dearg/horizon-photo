# Horizon Photography

The site is desgined as a portfolio for a travel Photographer. Its goal is to highlight the photographer and to create interest in their work.

## UX

### Outline

The home page is desgined to have a big impact with a strong image upon loading. An image with a person in it is used so the viewer can connect with it on a personal level. A landscape image is utilised with this to communicate the idea of travel. A jumbotron with a headline and a newsletter form are made immediately evident to try and acquire users. Below this is a short introduction to the photographer, followed by links to different gallery sections grouped by location. Finally, there is the footer with basic details repeated.
The flow is designed to first have an impact to create interest and highlight the work, then an option to interact with the newsletter, followed by basic necessary information about the photographer, and returning to highlight the work. The footer finishes with any crucial info repeated.

### User Stories
As a user interested in photography, or looking for a photgrapher to hire,, I would want to examine the Gallery or Contact. Both links are immediately avaialable in the navbar to view more work. I may be interested in the photographer, whom I can learn about by scrolling down. Once I scroll down, links to the gallery are again available to me, along with contact info.

As a user interested in travel, the Blog is highlighted in the navbar and the newsletter is immediately obvious, so I can look at details of travel. Scrolling down I can see different locations whose galleries I can explore. In the footer is another link for the newsletter if I am interested in following the blog.

### Colours
The main color used is black, to keep the design clean and to contrast with the colors of the photos so that they remain the focus. Secondary colors used are a silver-grey or white to continue the clean look. Transparent containers are used on top of the image so that the image remains visible throughout the site, without it taking up too much vertical space on mobile. This also means that the image does not shift around when opening and closing collapsable menus. A deep green is used as an accent to add color and create a thematic connection with nature.
The fonts are sans-serif in keeping with the clean, minimal design elements. An uppercase font is used to emphasise all headings.
The navbar collapses below medium devices as the spacing in the fonts becomes squahed on smaller devices. The logo shifts from the center on larger devices to the left side on smaller devices so it is always visible.

### Wireframes
Wireframe: https://balsamiq.cloud/shm66pj/p116sdz

## Features

### Features implemented
The newsletter will allow people to sign up to receive the blog posts to the their inbox.

### To implement
- The gallery will highlight the locations visited with a tab for each location and a gallery for the images. Clocking on a location will bring up a link to a blog post.
- The blog will be a collection of stories or information about the locations with related images. Giving a story to images seen.
- A map with location linked to photos


## Technologies Used

- Languages
    - [HTML](w3.org/standards/webdesign/htmlcss)
        *Page markup
    - [CSS](w3.org/standards/webdesign/htmlcss)
        *Styling
- Framework
    - [Bootstrap](https://getbootstrap.com/)
        *Used for basic styles and outline
- Resources
    - [Fontawesome](https://fontawesome.com/)
        *Used for icons
    - [Google Fonts](https://fonts.google.com)
        *Font Styles
    - [Favicon Generator](https://www.favicon-generator.org/)

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
- The navbar toggle icon would shift position when opening the collapsable menu to the bottom left from the top right. There were also issues with the alignment of the text and width after adding the jumbotron. I used CSS to tidy things up. Resolved.
- The logo image would display in the middle of the collapsable menu when expanded duw to its central position on larger devices, interrupting the list and meaning the logo would not be displayed in the navbar on smaller form factors. I placed two logos in the code and used bootstrap classes to set their display to none depending on device size. Resolved.
- I was not happy with the way the image was displayed on smaller devices as the person in the photo was out of view and much of the image was being cut off. I mirrored the image and made some containers transparent, laying them on top of the image instead of above and below. Resolved.
- The fluid jumbotron was not fluid on larger devices. I wrapped more elements within it for resolution.
The "About" title aligned to the right loked ugly on smaller device forms. I used bootstrap flex boxes to shift its position. Resolved.
- Had difficulty creating a transition that scaled the image, but did not immedteately clip the image beside it on the "ease-out" phase eve when using the z-index. Solved by creating a keyframe animation using the z-index.


## Deployment

I set up a git hub repository for deployment and set up an SSH key.