document.addEventListener("DOMContentLoaded", async function () {
  console.log("🔥 GAXAREBA SYSTEM 2.1 ONLINE");

  await loadComponents();
  attachMenuHandler();
  makeHeaderSticky();
  insertIframe();

  console.log("✅ Script Loaded Successfully");
});

async function loadComponents() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    const headerPath = header.getAttribute("data-header");
    if (headerPath) {
      await loadHTML("header", getCorrectPath(headerPath));
    }
  }

  if (footer) {
    const footerPath = footer.getAttribute("data-footer");
    if (footerPath) {
      await loadHTML("footer", getCorrectPath(footerPath));
    }
  }
}

async function loadHTML(elementId, url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    document.getElementById(elementId).innerHTML = data;
    console.log(`✅ ${elementId.toUpperCase()} LOADED`);
    if (elementId === "header") {
      attachMenuHandler(); // Only once
    }
  } catch (err) {
    console.error(`💀 ${elementId.toUpperCase()} NOT LOADED:`, err);
  }
}

function getCorrectPath(filePath) {
  const folderDepth = window.location.pathname.split("/").length - 2;
  let correctPath = filePath;

  for (let i = 0; i < folderDepth; i++) {
    correctPath = "../" + correctPath;
  }

  return correctPath;
}

function attachMenuHandler() {
  const hamMenu = document.querySelector(".ham-menu");
  const menu = document.querySelector(".off-screen-menu");

  if (hamMenu && menu) {
    hamMenu.onclick = () => {
      menu.classList.toggle("menu-open");
      console.log("📱 MENU OPENED");
    };

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== hamMenu) {
        menu.classList.remove("menu-open");
        console.log("❌ MENU CLOSED");
      }
    });
    console.log("✅ MENU READY");
  } else {
    console.error("💀 MENU NOT FOUND");
  }
}

function makeHeaderSticky() {
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 100);
    }
  });
}

function insertIframe() {
  const iframeContainer = document.querySelector(".iframe-container");
  if (iframeContainer) {
    iframeContainer.innerHTML = `
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.835694555024!2d44.79397357679874!3d41.69984237121266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd5377aab05%3A0x68dc91c70f7c396c!2sTbilisi!5e0!3m2!1sen!2sge!4v1707735764700!5m2!1sen!2sge" 
      width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    `;
  }
}
