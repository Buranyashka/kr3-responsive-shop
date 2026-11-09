const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));

if (!id){
  location.replace('catalog.html');
} else{
  fetch('data/products.json')
    .then(r => r.json())
    .then(products => {
      const p = products.find(x => x.id === id);

      if (!p) {
        location.replace('catalog.html');
        return;
      }

      document.title = `${p.name} — Bonsai Shop`;
      document.querySelector('meta[property="og:title"]')
        ?.setAttribute('content', `${p.name} — Bonsai Shop`);

      setText('breadcrumb-name', p.name);
      setText('product-title', p.name);
      setText('product-price', `${p.price} руб.`);
      setText('product-description', p.description);
      setText('spec-category', p.category);
      setText('spec-sku', p.sku);
      setText('spec-price', `${p.price} руб.`);
      setText('spec-stock', p.stock);

      const img = document.getElementById('product-image');
      if (img) {
        if (p.image) {
          img.src = p.image;
          img.alt = p.imageAlt || p.name;
        } else {
          // товара без картинки — покажем заглушку
          img.src = 'images/placeholder.jpg';
          img.alt = p.name;
        }
      }
    
      const badge = document.getElementById('product-badge');
      if (badge) {
        if (p.badge) badge.textContent = p.badge;
        else badge.style.display = 'none';
      }

      const orderLink = document.getElementById('order-link');
      if (orderLink) {
        orderLink.href = `order.html?product=${encodeURIComponent(p.name)}`;
      }
    })
    .catch(err => {
      document.getElementById('product-title').textContent =
        'Не удалось загрузить товар';
      console.error(err);
    });
}

function setText(id, value){
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? '';
}