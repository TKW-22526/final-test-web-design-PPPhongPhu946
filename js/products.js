/* 
    ================================================
    PRODUCTS JAVASCRIPT CHO WEBSITE KICKS
    Quản lý dữ liệu sản phẩm tĩnh & động qua localStorage
    ================================================
*/

const defaultProducts = [
    {
        id: 'p1',
        name: 'Neon Pulse Lifestyle',
        category: 'lifestyle',
        price: 3200000,
        oldPrice: null,
        image: 'assets/images/sneaker_1_1780630524347.png',
        badge: 'Mới',
        rating: 4.5,
        reviews: 128,
        description: 'Neon Pulse Lifestyle kết hợp hoàn hảo giữa phong cách đường phố năng động và công nghệ đệm cao cấp. Thiết kế ấn tượng với các điểm nhấn phản quang giúp bạn nổi bật bất kể ngày hay đêm. Cấu trúc ôm sát chân mang lại sự thoải mái tối đa cho cả ngày dài.'
    },
    {
        id: 'p2',
        name: 'Velocity Runner X',
        category: 'running',
        price: 2850000,
        oldPrice: 3350000,
        image: 'assets/images/sneaker_2_1780630544175.png',
        badge: '-15%',
        rating: 5.0,
        reviews: 342,
        description: 'Velocity Runner X là mẫu giày chạy bộ đỉnh cao được thiết kế để tối ưu hóa tốc độ. Trọng lượng siêu nhẹ kết hợp cùng đế ngoài bằng cao su chống mài mòn giúp tăng cường độ bám trên mọi bề mặt. Lưới thoáng khí phần trên giữ chân luôn khô ráo.'
    },
    {
        id: 'p3',
        name: 'Retro Pastel High',
        category: 'lifestyle',
        price: 2400000,
        oldPrice: null,
        image: 'assets/images/sneaker_3_1780630564025.png',
        badge: null,
        rating: 4.0,
        reviews: 89,
        description: 'Mang đậm âm hưởng thập niên 80, Retro Pastel High kết hợp những mảng màu pastel nhẹ nhàng tạo nên phong cách cổ điển đầy cuốn hút. Chất liệu da lộn mềm mại phối hợp cùng đế cao su đúc nguyên khối cho độ bền vượt thời gian.'
    },
    {
        id: 'p4',
        name: 'Pro Court Edition',
        category: 'basketball',
        price: 4100000,
        oldPrice: null,
        image: 'assets/images/sneaker_1_1780630524347.png',
        badge: null,
        rating: 4.5,
        reviews: 210,
        filterClass: 'hue-filter',
        description: 'Thiết kế chuyên dụng cho mặt sân bóng rổ, Pro Court Edition hỗ trợ tuyệt vời cho những pha bật nhảy và đổi hướng đột ngột. Hệ thống khóa gót chân chắc chắn và đệm túi khí giúp hạn chế chấn thương tối đa khi thi đấu.'
    },
    {
        id: 'p5',
        name: 'Cyberpunk Hyper-Dunk',
        category: 'basketball',
        price: 4500000,
        oldPrice: 5200000,
        image: 'assets/images/sneaker_futuristic.png',
        badge: 'Siêu Phẩm',
        rating: 5.0,
        reviews: 412,
        description: 'Mang hơi thở của tương lai, Cyberpunk Hyper-Dunk là siêu phẩm bóng rổ với dải màu neon cực cháy. Đôi giày sở hữu bộ đệm trợ lực tiên tiến nhất, cho phép bạn bùng nổ sức mạnh trên mọi mặt sân. Thiết kế cổ cao bảo vệ mắt cá chân hoàn hảo.'
    },
    {
        id: 'p6',
        name: 'AeroGlide Minimalist',
        category: 'running',
        price: 2100000,
        oldPrice: null,
        image: 'assets/images/sneaker_minimalist.png',
        badge: null,
        rating: 4.2,
        reviews: 156,
        description: 'Sự lựa chọn hoàn hảo cho những ai yêu thích phong cách tối giản. AeroGlide Minimalist lược bỏ các chi tiết thừa để mang lại đôi giày siêu nhẹ. Tone màu trắng thanh lịch với đường vát bạc khí động học thích hợp cho chạy bộ lẫn đi làm.'
    },
    {
        id: 'p7',
        name: 'Earth Tone Vintage 90s',
        category: 'lifestyle',
        price: 1850000,
        oldPrice: null,
        image: 'assets/images/sneaker_vintage.png',
        badge: 'Classic',
        rating: 4.8,
        reviews: 623,
        description: 'Sống lại những năm 90 rực rỡ với form dáng chunky hầm hố. Phiên bản Earth Tone mang các sắc màu của tự nhiên như beige, olive và nâu, cực kỳ dễ phối đồ với phong cách đường phố (streetwear) hoài cổ.'
    },
    {
        id: 'p8',
        name: 'Wilderness Trail Pro',
        category: 'running',
        price: 3500000,
        oldPrice: 3800000,
        image: 'assets/images/sneaker_trail.png',
        badge: 'Chống Nước',
        rating: 4.9,
        reviews: 310,
        description: 'Kẻ chinh phục mọi cung đường hiểm trở. Wilderness Trail Pro sở hữu lớp màng GORE-TEX chống thấm nước hoàn toàn và bộ đế ngoài có gai gai góc (lugs) giúp bám chặt vào sỏi đá, bùn lầy, bảo vệ đôi chân bạn trên mọi nẻo đường leo núi.'
    },
    {
        id: 'p9',
        name: 'Hoka Speedgoat Max',
        category: 'running',
        price: 4200000,
        oldPrice: null,
        image: 'assets/images/hoka_trail_1.png',
        badge: 'Siêu Nhẹ',
        rating: 4.8,
        reviews: 450,
        description: 'Dòng Speedgoat nổi tiếng nay được nâng cấp. Đế giữa khổng lồ làm từ bọt EVA cung cấp lớp đệm êm ái chưa từng có, giảm thiểu chấn động lên đầu gối khi chạy quãng đường siêu dài (ultramarathon). Phối màu xanh vàng chói lọi thách thức mọi ánh nhìn.'
    },
    {
        id: 'p10',
        name: 'Hoka Mafate Ultra',
        category: 'running',
        price: 4800000,
        oldPrice: 5100000,
        image: 'assets/images/hoka_trail_2.png',
        badge: 'Mới',
        rating: 5.0,
        reviews: 120,
        description: 'Được sinh ra cho những đường trail khắc nghiệt nhất. Hoka Mafate Ultra sở hữu công nghệ đế ngoài Vibram Megagrip chống trơn trượt cực đoan. Phối màu cam lửa mix tím đậm đầy cá tính cùng thiết kế ôm chắc bàn chân, đây là "vũ khí" tối thượng cho trail runner.'
    }
];

// Khởi tạo localStorage nếu chưa có
function initializeProducts() {
    if (!localStorage.getItem('kicks_products_v5')) {
        localStorage.setItem('kicks_products_v5', JSON.stringify(defaultProducts));
    }
}

// Lấy danh sách sản phẩm hiện tại
function getProducts() {
    return JSON.parse(localStorage.getItem('kicks_products_v5')) || [];
}

// Format số thành chuỗi tiền tệ VNĐ
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

// Render HTML cho 1 thẻ sản phẩm
function createProductCardHTML(product, basePath = '') {
    let oldPriceHTML = product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : '';
    let badgeHTML = product.badge ? `<div class="product-badge ${product.badge.includes('%') ? 'sale' : ''}">${product.badge}</div>` : '';
    
    // Xử lý ảnh: nếu basePath khác rỗng (vd: '../'), ghép vào ảnh nếu ảnh bắt đầu bằng 'assets/'
    let imgPath = product.image;
    if (basePath && imgPath.startsWith('assets/')) {
        imgPath = basePath + imgPath;
    }

    let filterStyle = product.filterClass ? 'style="filter: hue-rotate(120deg);"' : '';

    // URL trang chi tiết
    let detailUrl = basePath === '' ? 'html/chi-tiet.html' : 'chi-tiet.html';

    // Tạo chuỗi JSON an toàn để truyền vào hàm addToCart
    const productDataForCart = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image // Keep original path, cart.js will normalize it
    };
    
    // We use a clean JSON string, but we need to escape quotes carefully for HTML attribute
    const cartDataStr = JSON.stringify(productDataForCart).replace(/"/g, '&quot;');

    return `
        <div class="product-card" data-category="${product.category}">
            ${badgeHTML}
            <div class="product-image">
                <img src="${imgPath}" alt="${product.name}" ${filterStyle}>
                <div class="product-overlay">
                    <button class="btn-icon"><i class="fa-regular fa-heart"></i></button>
                    <a href="${detailUrl}?id=${product.id}" class="btn-icon view-btn"><i class="fa-regular fa-eye"></i></a>
                    <button class="btn-icon" onclick="addToCart(${cartDataStr})"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name"><a href="${detailUrl}?id=${product.id}">${product.name}</a></h3>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid ${product.rating % 1 !== 0 ? 'fa-star-half-stroke' : 'fa-star'}"></i>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price">${formatPrice(product.price)}</span>
                    ${oldPriceHTML}
                </div>
            </div>
        </div>
    `;
}

// Render toàn bộ sản phẩm vào một container
// basePath: rỗng '' nếu gọi từ trang chủ, là '../' nếu gọi từ trang con
function renderProductGrid(containerId, basePath = '', limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    initializeProducts();
    let products = getProducts();
    
    if (limit && limit > 0) {
        products = products.slice(0, limit);
    }
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; grid-column: 1/-1;">Hiện tại chưa có sản phẩm nào.</p>';
        return;
    }

    let html = '';
    products.forEach(p => {
        html += createProductCardHTML(p, basePath);
    });

    container.innerHTML = html;
}

// Nếu load trang có chứa #product-grid-container, tiến hành render ngay
document.addEventListener('DOMContentLoaded', () => {
    // Determine basePath based on current URL
    const isSubPage = window.location.pathname.includes('/html/');
    const basePath = isSubPage ? '../' : '';
    
    // Giới hạn 3 sản phẩm trên trang chủ (index.html), hiển thị tất cả trên trang Sản Phẩm (san-pham.html)
    const limit = isSubPage ? null : 3;
    
    renderProductGrid('product-grid-container', basePath, limit);
});
