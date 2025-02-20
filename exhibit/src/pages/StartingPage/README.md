# Starting Page Component -
The starting page serves as an interactive starting screen for a project. it features a fading background slideshow and prompt users to "press anywhere to start".

# Features:
- Background Slideshow: tranisiton between background images using fade effect.
- Navigation: clicking anywhere on the screen navigates to the ./room route.

# Technologies Used:
- React
- React Router (for navigation)
- CSS for trasition and animations

# Installation
Make sure the project includes the required dependencies: (npm install react-router-dom)

# Component Breakdown
- The component maintains an array of background images.
- use "useState" to manage image transitions and fade effects
- use "useEffect" to cycle through background images every 3 seconds.
- Handles click even to trigger navigation with a fade-out effect.

# Customization
- To change background images, replace "slide1" and "slide2" with new images at the top of the page.
- Adjust the "setTimeout" foe adjusting fade effect speed.