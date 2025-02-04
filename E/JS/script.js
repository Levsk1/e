const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});


const header = document.querySelector('.header'); // Select your header element
const stickyClass = 'sticky'; // Define the class that will make it sticky

// Function to add the sticky class when scrolling
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add(stickyClass);
  } else {
    header.classList.remove(stickyClass);
  }
});




// Select the container where you want to add the iframe
const container = document.querySelector('.iframe-container');

// Create an iframe element
const iframe = document.createElement('iframe');

// Set the iframe attributes
iframe.src = 'https://www.example.com'; // Replace with the desired URL
iframe.width = '100%'; // Set the width of the iframe
iframe.height = '500'; // Set the height of the iframe
iframe.frameborder = '0'; // Optional: remove border
iframe.allowfullscreen = true; // Optional: allow fullscreen mode

// Append the iframe to the container
container.appendChild(iframe);





