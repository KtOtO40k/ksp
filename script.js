let cart = [];


const products = document.querySelectorAll('.product-card'); 
const cartItemsContainer = document.getElementById('cart-items'); 
const totalPriceElement = document.querySelector('.total-price'); 
const filterButtons = document.querySelectorAll('.filter-btn'); 
const checkoutBtn = document.getElementById('checkout-btn'); 


filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        const category = button.getAttribute('data-filter');

        products.forEach(product => {

            const productCategory = product.getAttribute('data-category');

 
            if (category === 'all' || category === productCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});


document.querySelectorAll('.add-to-cart-btn').forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');

        const name = productCard.getAttribute('data-name');
        const price = parseInt(productCard.getAttribute('data-price')); 


        const newProduct = {
            id: Date.now(), 
            name: name,
            price: price
        };

        
        cart.push(newProduct);
        
       
        renderCart();
    });
});


const renderCart = () => {
    
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
        totalPriceElement.innerText = 'Итого: 0 руб.';
        return; 
    }
    cart.forEach(item => {
        const cartItemHTML = document.createElement('div');
        cartItemHTML.classList.add('cart-item');

        cartItemHTML.innerHTML = `
            <span>${item.name} - ${item.price} руб.</span>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
        `;
        
        cartItemsContainer.appendChild(cartItemHTML);
    });
    calculateTotal();
};


const calculateTotal = () => {
    let total = 0;

    cart.forEach(item => total += item.price);
    totalPriceElement.innerText = `Итого: ${total} руб.`;
};


const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    renderCart(); 
};


checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста! Добавьте товары перед оплатой.');
    } else {
        alert('Покупка прошла успешно! Спасибо за заказ.');
        cart = []; 
        renderCart(); 
    }
});