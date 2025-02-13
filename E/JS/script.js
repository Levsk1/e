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






















// product page




let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();