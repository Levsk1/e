document.addEventListener("DOMContentLoaded", function () {
  function loadHTML(id, file, callback) {
      let element = document.getElementById(id);
      if (!element) {
          console.error(`Element with ID '${id}' not found.`);
          return;
      }

      fetch(file)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
          })
          .then(data => {
              element.innerHTML = data;
              callback && callback();
          })
          .catch(error => console.error(`Error loading ${file}:`, error));
  }

  // Load header and footer
  loadHTML("header", "header.html", function () {
      attachMenuHandler(); // Run menu handler after header loads
      makeHeaderSticky();  // Run sticky header after header loads
  });
  loadHTML("footer", "footer.html");
});

// Function to Attach Hamburger Menu Event
function attachMenuHandler() {
  const hamMenu = document.querySelector(".ham-menu");
  const mobileMenu = document.querySelector(".off-screen-menu");
  const body = document.body;

  if (!hamMenu || !mobileMenu) {
      console.error("Menu elements not found!");
      return;
  }

  function toggleClass(element, className) {
      element.classList.toggle(className);
  }

  function toggleMenu() {
      toggleClass(mobileMenu, "active");
      toggleClass(hamMenu, "active");
      body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
  }

  hamMenu.addEventListener("click", toggleMenu);

  document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamMenu.contains(e.target)) {
          mobileMenu.classList.remove("active");
          hamMenu.classList.remove("active");
          body.style.overflow = "auto";
      }
  });
}

// Function to Add Sticky Header on Scroll
function makeHeaderSticky() {
  const header = document.querySelector('.header');
  if (!header) {
      console.error("Header not found!");
      return;
  }

  window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
          header.classList.add("sticky");
      } else {
          header.classList.remove("sticky");
      }
  });
}

// Function to Add iFrame Dynamically (Only If `.iframe-container` Exists)
function insertIframe() {
  const container = document.querySelector('.iframe-container');
  if (!container) {
      console.warn("iFrame container not found on this page.");
      return;
  }

  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.example.com'; // Replace with actual URL
  iframe.width = '100%';
  iframe.height = '500';
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;

  if (!iframe.src) {
      console.error("Invalid iframe URL.");
      return;
  }

  container.appendChild(iframe);
}


console.log("Script loaded  successfully!");










document.addEventListener("DOMContentLoaded", function () {
    function loadHTML(id, file) {
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with ID '${id}' not found.`);
        return;
      }
  
      fetch(file)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;
        })
        .catch((error) => console.error(`Error loading ${file}:`, error));
    }
  
    // Dynamically load header and footer
    loadHTML("header", document.getElementById("header").getAttribute("data-header"));
    loadHTML("footer", document.getElementById("footer").getAttribute("data-footer"));
  });
  



  function attachMenuHandler() {
    const hamMenu = document.getElementById("menuBtn");
    const mobileMenu = document.querySelector(".off-screen-menu");
    const body = document.body;
  
    if (!hamMenu || !mobileMenu) {
      console.error("Menu elements not found!");
      return;
    }
  
    function toggleMenu() {
      // Toggle "active" class on both the button and the menu
      hamMenu.classList.toggle("active");
      mobileMenu.classList.toggle("active");
  
      // Toggle the aria-expanded attribute for accessibility
      const isExpanded = hamMenu.getAttribute("aria-expanded") === "true";
      hamMenu.setAttribute("aria-expanded", !isExpanded);
  
      // Prevent body scrolling when menu is open
      body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
    }
  
    // Add click event to the hamburger menu button
    hamMenu.addEventListener("click", toggleMenu);
  
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamMenu.contains(e.target)) {
        mobileMenu.classList.remove("active");
        hamMenu.classList.remove("active");
        hamMenu.setAttribute("aria-expanded", "false");
        body.style.overflow = "auto";
      }
    });
  }
  