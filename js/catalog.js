fetch('data/products.json')
  .then(r => r.json())
  .then(products => {
    const grid = document.querySelector('.products-grid');

    grid.innerHTML = products.map(p => `
      <article class="product-card${p.featured ? ' product-card--featured' : ''}">
        
        <div class="product-card__media">
          <a href="product.html?id=${p.id}" class="product-card__image-link">
            <img 
              class="product-card__img" 
              src="${p.image || 'images/placeholder.jpg'}" 
              alt="${p.imageAlt || p.name}"
              loading="lazy"
            >
          </a>
        </div>

        <h3 class="product-card__title">
          <a class="product-card__link" href="product.html?id=${p.id}">${p.name}</a>
        </h3>
        
        <p class="product-card__description">${p.shortDescription}</p>
        <p class="product-card__price">Цена: ${p.price} руб.</p>
        
        <div class="product-card__actions">
          <a class="button button--primary product-card__button"
            href="order.html?id=${p.id}">Заказать</a>
        </div>
        
      </article>
    `).join('');
  })
  .catch(err => {
    document.querySelector('.products-grid').textContent =
      'Не удалось загрузить товары';
    console.error(err);
  });