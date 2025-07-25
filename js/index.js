let dot = document.querySelector('.dot');
let cart = document.querySelector("#cart");
let x = document.querySelector('#x');
let innerCart = document.querySelector('.cart-items');

let products = JSON.parse(localStorage.getItem('products')) || [];  // ✅ Load saved products

// 🔁 Show saved products visually on reload
if (products.length > 0) {
  dot.style.display = 'block';
  products.forEach((prod) => {
    renderCartItem(prod);
  });
} else {
  dot.style.display = 'none';
}

x.addEventListener('click', () => {
  cart.style.width = '0px';
  innerCart.style.opacity = '0%';
});

function opener(e) {
  e.preventDefault();
  e.stopPropagation();

  cart.style.width = '40%';
  innerCart.style.opacity = '100%';
}

function add(e) {
  e.preventDefault();
  e.stopPropagation();

  cart.style.width = '40%';
  innerCart.style.opacity = '100%';

  const button = e.target;
  const gridItem = button.closest('.grid-item');

  const img = gridItem.querySelector('img');
  const productName = gridItem.querySelector('.grid-first-text h4').textContent;
  const color = gridItem.querySelector('.grid-first-text p').textContent;
  const priceText = gridItem.querySelector('.grid-text').textContent;
  const priceMatch = priceText.match(/\$[\d.]+/);
  const price = priceMatch ? priceMatch[0] : 'N/A';

  const productInfo = {
    name: productName,
    color: color,
    price: price,
    imageSrc: img.getAttribute('src'),
    imageAlt: img.getAttribute('alt')
  };

  products.push(productInfo);

  localStorage.setItem('products', JSON.stringify(products)); // ✅ Stringify

  renderCartItem(productInfo); // ✅ Display item

  dot.style.display = 'block'; // ✅ Show dot
}


// ✅ Utility to render a product into the cart
function renderCartItem(prod) {
    let count = 0
    function sub() {
      return count - 1
    }
  
    
    function add() {
      return count + 1
    }
  const itemsHTML = `
    <div class="cart-item-list">
      <div class='group'>
        <img src="${prod.imageSrc}" alt="${prod.imageAlt}" width="100" />
        <button class='delete-btn'>delete</button>
      </div>
      <div class="cart-item-details">
        <h3>${prod.name}</h3>
        <p>${prod.color}</p>
        <strong>${prod.price}</strong>
      <div class='count-section'>
        <button class='subtract-btn' onclick='sub()'>-</button>
          <p>${count}</p>  
        <button class='add-btn'  onclick='add()'>+</button>
      </div>
      </div>
    </div>
  `;
  innerCart.insertAdjacentHTML('beforeend', itemsHTML);

}


if(!innerCart.innerHTML) {
    dot.style.display = 'none'
} else {
    dot.style.display = 'block'

}