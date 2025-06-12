let dot = document.querySelector('.dot');
let cart = document.querySelector("#cart");
let x = document.querySelector('#x');
let innerCart = document.querySelector('.cart-items');

// Close Cart
x.addEventListener('click', () => {
  cart.style.width = '0px';
  innerCart.style.opacity = '0%';
});

function opener(e) {
  e.preventDefault();
  e.stopPropagation();

  // Open cart
  cart.style.width = '40%';
  innerCart.style.opacity = '100%';
}

// Add to Cart
function add(e) {
  e.preventDefault();
  e.stopPropagation();

  // Open cart
  cart.style.width = '40%';
  innerCart.style.opacity = '100%';

  // Get the clicked button and its product card
  const button = e.target;
  const gridItem = button.closest('.grid-item');

  // Extract info
  const img = gridItem.querySelector('img');
  const productName = gridItem.querySelector('.grid-first-text h4').textContent;
  const color = gridItem.querySelector('.grid-first-text p').textContent;
  const priceText = gridItem.querySelector('.grid-text').textContent;
  const priceMatch = priceText.match(/\$[\d.]+/);
  const price = priceMatch ? priceMatch[0] : 'N/A';

  // Build product info
  const productInfo = {
    name: productName,
    color: color,
    price: price,
    imageSrc: img.getAttribute('src'),
    imageAlt: img.getAttribute('alt')
  };

  // Add to cart visually
  const itemHTML = `
    <div class="cart-item-list">
      <img src="${productInfo.imageSrc}" alt="${productInfo.imageAlt}" width="100" />
      <div class="cart-item-details">
        <h3>${productInfo.name}</h3>
        <p>${productInfo.color}</p>
        <strong>${productInfo.price}</strong>
      </div>
    </div>
  `;

  innerCart.insertAdjacentHTML('beforeend', itemHTML);

  // Update dot
  dot.style.display = 'block';
}


// if(!innerCart.innerHTML) {
//     innerCart.textContent = 'No items in cart area'
//     dot.style.display = 'none'
// } else {
//     innerCart.textContent = 'unstyled cart items, no json data'
//     dot.style.display = 'block'

// }