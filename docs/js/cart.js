// /public/js/cart.js

const CART_KEY = 'dace_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function saveCart(c) {
  localStorage.setItem(CART_KEY, JSON.stringify(c));
}
function updateCartCount() {
  const count = getCart().reduce((sum,i)=> sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}
function addToCart(p) {
  const cart = getCart();
  const ex = cart.find(x=>x.id==p.id);
  if (ex) ex.qty++;
  else cart.push({ ...p, qty:1 });
  saveCart(cart);
  updateCartCount();
}
function bindRemoveButtons() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', ()=>{
      let c = getCart().filter(i => i.id!=btn.dataset.id);
      saveCart(c);
      renderCart();
      updateCartCount();
    });
  });
}
function calculateSummary() {
  const items = getCart();
  const sub = items.reduce((s,i)=>s + i.price*i.qty,0);
  const tax = sub*0.21;
  document.getElementById('subtotal').textContent = sub.toFixed(2);
  document.getElementById('tax').textContent      = tax.toFixed(2);
  document.getElementById('total').textContent    = (sub+tax).toFixed(2);
}
function renderCart() {
  const ctn = document.getElementById('cartItems');
  const items = getCart();
  ctn.innerHTML = '';
  if (!items.length) {
    ctn.innerHTML = '<p>Je winkelmandje is leeg.</p>';
    calculateSummary();
    return;
  }
  items.forEach(item => {
    const line = (item.price*item.qty).toFixed(2);
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="thumb">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="info">
        <h3>${item.title}</h3>
        <p>€${item.price.toFixed(2)} × ${item.qty} = €${line}</p>
        <button class="remove-btn" data-id="${item.id}">Verwijder</button>
      </div>`;
    ctn.appendChild(div);
  });
  calculateSummary();
  bindRemoveButtons();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Alle product-pagina knoppen koppelen
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart({
        id:     parseInt(btn.dataset.id,10),
        title:  btn.dataset.title,
        price:  parseFloat(btn.dataset.price),
        image:  btn.dataset.image
      });
    });
  });

  // Als we op cart.html zijn:
  if (document.getElementById('cartItems')) {
    renderCart();
    document.getElementById('checkoutBtn').addEventListener('click', ()=>{
      alert('Bedankt voor je bestelling!');
      localStorage.removeItem(CART_KEY);
      renderCart();
      updateCartCount();
    });
  }
});
