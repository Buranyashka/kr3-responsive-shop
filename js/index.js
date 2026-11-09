fetch('data/products.json')
  .then(r => r.json())
  .then(products => {
    const carousel = document.getElementById('popular-carousel');
    
    // Берем первые 5 товаров
    const popularProducts = products.slice(0, 5); 

    carousel.innerHTML = popularProducts.map(p => `
      <article class="product-card product-card--carousel">
        
        <!-- Обертка для картинки (не дает картинке вылезти за края) -->
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
        
        <p class="product-card__price">${p.price} ₽</p>
        
        <a class="button button--primary product-card__button" 
          href="order.html?id=${p.id}">Заказать</a>
      </article>
    `).join('');
  })
  .catch(err => {
    document.getElementById('popular-carousel').innerHTML = 
      '<p>Не удалось загрузить популярные товары.</p>';
    console.error(err);
  });