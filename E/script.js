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
