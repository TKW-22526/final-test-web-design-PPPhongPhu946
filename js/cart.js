/* 
    ================================================
    CART JAVASCRIPT CHO WEBSITE KICKS
    Xử lý logic giỏ hàng bằng localStorage
    ================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    const cartTbody = document.getElementById('cart-tbody');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    // Parse currency string to number (e.g. "3,200,000₫" -> 3200000)
    function parsePrice(priceStr) {
        return parseInt(priceStr.replace(/[^0-9]/g, ''));
    }

    // Format number to currency string
    function formatPrice(priceNum) {
        return priceNum.toLocaleString('vi-VN') + '₫';
    }

    // Load cart from localStorage
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem('kicks_cart')) || [];
        return cart;
    }

    // Save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('kicks_cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Update cart badge in header
    function updateCartCount() {
        const cart = loadCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    // Render cart items
    function renderCart() {
        if (!cartTbody) return; // Not on cart page

        const cart = loadCart();
        cartTbody.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            document.querySelector('.cart-table').style.display = 'none';
            subtotalEl.textContent = '0₫';
            totalEl.textContent = '0₫';
            return;
        }

        emptyCartMessage.style.display = 'none';
        document.querySelector('.cart-table').style.display = 'table';

        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            // Normalize image path. If the item was added from index.html (assets/...), 
            // prepend '../' because gio-hang.html is inside the html/ folder.
            let displayImage = item.image;
            if (displayImage.startsWith('assets/')) {
                displayImage = '../' + displayImage;
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="Sản phẩm">
                    <div class="cart-product-info">
                        <div class="cart-product-img">
                            <img src="${displayImage}" alt="${item.name}">
                        </div>
                        <div class="cart-product-details">
                            <h4>${item.name}</h4>
                            <p>${item.variant || 'Tiêu chuẩn'}</p>
                        </div>
                    </div>
                </td>
                <td data-label="Giá" class="cart-price">${formatPrice(item.price)}</td>
                <td data-label="Số lượng">
                    <div class="cart-qty-controls">
                        <button class="cart-qty-btn minus" data-index="${index}">-</button>
                        <input type="text" class="cart-qty-input" value="${item.quantity}" readonly>
                        <button class="cart-qty-btn plus" data-index="${index}">+</button>
                    </div>
                </td>
                <td data-label="Tạm tính" class="cart-price">${formatPrice(itemTotal)}</td>
                <td data-label="">
                    <button class="cart-remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            cartTbody.appendChild(tr);
        });

        subtotalEl.textContent = formatPrice(subtotal);
        totalEl.textContent = formatPrice(subtotal);

        attachCartEvents();
    }

    function attachCartEvents() {
        const cart = loadCart();

        document.querySelectorAll('.cart-qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    saveCart(cart);
                    renderCart();
                }
            });
        });

        document.querySelectorAll('.cart-qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity < 10) {
                    cart[index].quantity++;
                    saveCart(cart);
                    renderCart();
                }
            });
        });

        document.querySelectorAll('.cart-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart.splice(index, 1);
                saveCart(cart);
                renderCart();
            });
        });
    }

    // Add to cart functionality (for product cards and detail page)
    window.addToCart = function(product) {
        let cart = loadCart();
        
        // Check if product already in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id && item.variant === product.variant);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += product.quantity || 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                variant: product.variant || '',
                quantity: product.quantity || 1
            });
        }
        
        saveCart(cart);
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    };

    // Initialize global cart count and render cart if on cart page
    updateCartCount();
    if (cartTbody) {
        renderCart();
    }
});
