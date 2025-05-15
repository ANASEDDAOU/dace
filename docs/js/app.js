// /public/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  // ===== Burger-menu =====
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }

  // ===== Scroll-animaties =====
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { rootMargin: '0px 0px -100px 0px' }
  );
  document.querySelectorAll('.fade-in, .fade-zoom, .fade-slide')
          .forEach(el => observer.observe(el));

  // ===== Form-handlers =====
  ['contactForm','feedbackForm'].forEach(id => {
    const f = document.getElementById(id);
    if (!f) return;
    f.addEventListener('submit', e => {
      e.preventDefault();
      alert(id === 'contactForm' ? 'Bedankt!' : 'Dank voor je feedback!');
      f.reset();
    });
  });

  // ===== Products data (numerieke prijzen!) =====
  const products = [
    { id:1,  title:'Ralph lauren',          price:49.99, image:'images/streetwear.png', description:'Warme hoodie in zwarte vintage stijl.' },
    { id:2,  title:'ralph lauren pant',     price:29.99, image:'../images/streetwear.png', description:'Basic tee met opvallende print.' },
    { id:3,  title:'Streetwear Jacket',     price:79.99, image:'../images/streetwear.png', description:'Stoer jack met meerdere zakken.' },
    { id:4,  title:'Streetwear Sneakers',   price:59.99, image:'../images/streetwear.png', description:'Comfortabele sneakers met retro look.' },
    { id:5,  title:'Streetwear Cap',        price:19.99, image:'../images/streetwear.png', description:'Snapback cap met logo.' },
    { id:6,  title:'Vintage Jeans',         price:39.99, image:'../images/VINTAGE.png',    description:'High-waist jeans met slijtageplekken.' },
    { id:7,  title:'Vintage Blouse',        price:34.99, image:'../images/VINTAGE.png',    description:'Zijden blouse in pasteltint.' },
    { id:8,  title:'Vintage Dress',         price:59.99, image:'../images/VINTAGE.png',    description:'Bloemenprint maxi-jurk.' },
    { id:9,  title:'Vintage Bag',           price:24.99, image:'../images/VINTAGE.png',    description:'Leer handtasje met metalen gesp.' },
    { id:10, title:'Vintage Scarf',         price:14.99, image:'../images/VINTAGE.png',    description:'Zijden sjaal in rokstijl.' },
    { id:11, title:'Accessoire Ring',       price:9.99,  image:'../images/ACCESOIRE.jpg',  description:'Verstelbare zilveren ring.' },
    { id:12, title:'Accessoire Belt',       price:19.99, image:'../images/ACCESOIRE.jpg',  description:'Leren riem met grote gesp.' },
    { id:13, title:'Accessoire Watch',      price:69.99, image:'../images/ACCESOIRE.jpg',  description:'Analoge horloge met metalen band.' },
    { id:14, title:'Accessoire Sunglasses', price:29.99, image:'../images/ACCESOIRE.jpg',  description:'Retro zonnebril met UV-bescherming.' },
    { id:15, title:'Accessoire Socks',      price:7.99,  image:'../images/ACCESOIRE.jpg',  description:'Set van 3 bamboe sokken.' },
    { id:16, title:'Accessoire Hat',        price:22.99, image:'../images/ACCESOIRE.jpg',  description:'Fedora-hoed in wolmix.' },
    { id:17, title:'Accessoire Wallet',     price:24.99, image:'../images/ACCESOIRE.jpg',  description:'Compacte portemonnee van leer.' }
  ];
  

  // Sla producten **optijd** op, vóór navigatie naar detail-pagina
  localStorage.setItem('products', JSON.stringify(products));

  // ===== Kaart-maker =====
  function createCard(p) {
    const a = document.createElement('a');
    a.href = `product.html?id=${p.id}`;
    a.className = 'product-card-link';
    a.innerHTML = `
      <div class="product-card fade-in">
        <img src="${p.image}" alt="${p.title}">
        <div class="info">
          <h2>${p.title}</h2>
          <p>€${p.price.toFixed(2)}</p>
          <span class="btn-sober">Bekijk</span>
        </div>
      </div>`;
    return a;
  }

  // ===== Render per categorie =====
  [
    { id:'streetwearGrid', start:0,  end:5  },
    { id:'vintageGrid',    start:5,  end:10 },
    { id:'accessoireGrid', start:10, end:products.length }
  ].forEach(cat => {
    const grid = document.getElementById(cat.id);
    if (!grid) return;
    products.slice(cat.start, cat.end)
            .forEach(p => grid.appendChild(createCard(p)));
  });

  // ===== Filter-knoppen =====
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn')
              .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      ['streetwear','vintage','accessoire']
        .forEach(sec => {
          document.getElementById(sec)
                  .classList.toggle('hidden',
                    cat !== 'all' && cat !== sec);
        });
    });
  });
});
