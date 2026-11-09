let allProducts = [];

// Загружаем товары
fetch('data/products.json')
  .then(r => r.json())
  .then(products => {
    allProducts = products;
    const select = document.getElementById('order-product');
    const priceInput = document.getElementById('order-price');
    
    // Получаем параметры из URL (если перешли со страницы товара или каталога)
    const params = new URLSearchParams(location.search);
    const urlId = params.get('id');
    const urlProductName = params.get('product'); // для обратной совместимости

    // 1. Заполняем выпадающий список
    products.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.name} — ${p.price} ₽`;
      select.appendChild(option);
    });

    // 2. Функция обновления цены
    const updatePrice = () => {
      const selectedId = Number(select.value);
      const product = allProducts.find(p => p.id === selectedId);
      
      if (product) {
        priceInput.value = `${product.price} руб.`;
      } else {
        priceInput.value = '—';
      }
    };

    // 3. Автоматически выбираем товар, если перешли по ссылке
    if (urlId) {
      select.value = urlId;
    } else if (urlProductName) {
      // Если в URL старое название, ищем его по имени
      const found = products.find(p => p.name === urlProductName);
      if (found) select.value = found.id;
    }

    // Обновляем цену при загрузке и при каждом изменении выбора
    updatePrice();
    select.addEventListener('change', updatePrice);
  })
  .catch(err => {
    console.error("Ошибка загрузки товаров для формы:", err);
  });