/* 
    ================================================
    JAVASCRIPT CHÍNH CHO WEBSITE KICKS
    Dự án kết thúc môn Thiết Kế Web
    ================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // 2. Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add animation effect
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Product Detail Options Interactions
    // Colors
    const colorDots = document.querySelectorAll('.color-dot');
    if (colorDots.length > 0) {
        colorDots.forEach(dot => {
            dot.addEventListener('click', () => {
                colorDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
    }

    // Sizes
    const sizeBtns = document.querySelectorAll('.size-btn:not(.disabled)');
    if (sizeBtns.length > 0) {
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Quantity
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            let max = parseInt(qtyInput.getAttribute('max')) || 10;
            if (val < max) {
                qtyInput.value = val + 1;
            }
        });
    }

    // 4. Customer Authentication State
    const customerData = sessionStorage.getItem('kicks_customer');
    const userBtn = document.querySelector('.user-btn');
    const userNameDisplay = document.querySelector('.user-name-display');

    if (customerData && userBtn && userNameDisplay) {
        try {
            const customer = JSON.parse(customerData);
            // Hide the icon if you want, or just append the name
            userNameDisplay.textContent = customer.name;
            userNameDisplay.style.display = 'inline-block';
            
            // Override click to show logout option
            userBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if(confirm('Bạn có muốn đăng xuất khỏi tài khoản ' + customer.name + ' không?')) {
                    sessionStorage.removeItem('kicks_customer');
                    window.location.reload();
                }
            });
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu khách hàng', e);
        }
    }

});

// Add keyframes for fadeIn animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
