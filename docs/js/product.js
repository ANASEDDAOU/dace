// /public/js/product.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Haal ID uit URL ?id=...
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  if (!id) return;

  // 2) Haal products uit localStorage (zit er in dankzij app.js/catalog)
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const product  = products.find(p => p.id === id);
  if (!product) return;

  // 3) Vul de detailvelden
  const imgEl   = document.getElementById('pd-image');
  const titleEl = document.getElementById('pd-title');
  const priceEl = document.getElementById('pd-price');
  const descEl  = document.getElementById('pd-description');

  imgEl.src        = product.image;
  imgEl.alt        = product.title;
  titleEl.textContent = product.title;
  // prijs tonen als "€49,99"
  priceEl.textContent = '€' + product.price.toFixed(2).replace('.', ',');
  descEl.textContent  = product.description || 'Nog geen beschrijving beschikbaar.';

  // 4) Zet data-attributes op de knop, zodat cart.js 'm oppikt
  const btn = document.getElementById('addToCart');
  btn.classList.add('btn-add-cart');
  btn.dataset.id    = product.id;
  btn.dataset.title = product.title;
  // Sla hier een numerieke prijs op, NIET de "€49,99"
  btn.dataset.price = product.price;
  btn.dataset.image = product.image;
});
