# Báo Cáo Tổng Kết Dự Án Web Thiết Kế: "KICKS - Cửa Hàng Giày Thể Thao"

## 1. Tổng Quan Dự Án (Project Overview)
- **Tên dự án:** KICKS (Website Thương mại điện tử chuyên bán giày thể thao/sneaker).
- **Mục tiêu:** Xây dựng một trang web bán hàng hiện đại, mang phong cách "neon/cyberpunk" kết hợp thể thao năng động. Website không chỉ đáp ứng yêu cầu về mặt thẩm mỹ (UI) mà còn phải hoàn thiện các luồng trải nghiệm người dùng cơ bản (UX) từ xem sản phẩm, thêm vào giỏ hàng, đăng ký/đăng nhập, cho đến quản trị viên quản lý kho hàng.
- **Tính chất:** Dự án Front-End tĩnh kết hợp xử lý Logic bằng Vanilla JavaScript và lưu trữ dữ liệu tại bộ nhớ trình duyệt (LocalStorage/SessionStorage) thay cho Database thực.

## 2. Công Nghệ Sử Dụng (Tech Stack)
- **HTML5:** Xây dựng cấu trúc ngữ nghĩa cho trang web.
- **CSS3 (Vanilla CSS):** 
  - Sử dụng CSS Variables (biến CSS) để dễ dàng quản lý màu sắc (Primary: Neon Yellow/Green, Secondary: Black/Dark Gray).
  - Áp dụng Flexbox và CSS Grid để xây dựng bố cục responsive (tương thích trên cả PC và Mobile).
  - Tạo các hiệu ứng chuyển động (animations, transitions, hover effects) làm tăng tính sinh động.
- **JavaScript (Vanilla JS):** 
  - Thao tác DOM để render giao diện động.
  - Xử lý các sự kiện người dùng (Click, Form Submit, Filter).
- **Bộ nhớ trình duyệt (Web Storage API):**
  - `localStorage`: Lưu trữ giỏ hàng (Cart), Kho dữ liệu Sản phẩm (Products), và Tài khoản người dùng (Users) để dữ liệu không bị mất khi tải lại trang.
  - `sessionStorage`: Lưu trữ trạng thái đăng nhập của Khách hàng và Admin (bảo mật cơ bản ở mức Client-side).
- **Thư viện ngoài:** FontAwesome (icon) và Google Fonts (font chữ Montserrat).

## 3. Cấu Trúc Thư Mục (Directory Structure)
Dự án được phân chia thư mục rõ ràng theo tiêu chuẩn:
```text
KICKS_PROJECT/
│
├── assets/
│   └── images/              # Chứa toàn bộ hình ảnh sản phẩm (Sneakers, Hoka, Trail,...)
│
├── css/
│   ├── style.css            # CSS dùng chung (Header, Footer, Reset, Utility classes)
│   ├── admin.css            # CSS dành riêng cho trang quản trị Admin
│   ├── auth.css             # CSS dành riêng cho trang Đăng ký / Đăng nhập
│   ├── cart.css             # CSS dành riêng cho trang Giỏ hàng
│   ├── gioi-thieu.css       # CSS dành riêng cho trang Giới thiệu (About Us)
│   └── lien-he.css          # CSS dành riêng cho trang Liên hệ
│
├── html/
│   ├── admin.html           # Bảng điều khiển quản trị (Dashboard)
│   ├── auth.html            # Trang Đăng nhập / Đăng ký cho Khách hàng
│   ├── chi-tiet.html        # Trang thông tin chi tiết của 1 sản phẩm
│   ├── gio-hang.html        # Trang giỏ hàng & thanh toán
│   ├── gioi-thieu.html      # Trang thông tin về cửa hàng
│   ├── lien-he.html         # Trang form liên hệ
│   ├── login.html           # Trang đăng nhập Admin
│   └── san-pham.html        # Trang danh sách toàn bộ sản phẩm
│
├── js/
│   ├── auth.js              # Logic xử lý Đăng ký, Đăng nhập Khách hàng
│   ├── cart.js              # Logic xử lý Giỏ hàng (Thêm, Xóa, Tính tổng tiền)
│   ├── main.js              # Logic dùng chung (Menu mobile, Render UI chung, Kiểm tra phiên đăng nhập)
│   └── products.js          # Khởi tạo Mock Data và các hàm thao tác kho dữ liệu
│
└── index.html               # Trang chủ (Homepage)
```

## 4. Các Chức Năng Chính (Key Features)

### 4.1. Giao Diện Người Dùng (Client-side)
1. **Trang Chủ (Home):** 
   - Banner nổi bật, layout thu hút thị giác với phong cách thiết kế đậm chất "streetwear".
   - Danh mục "Sản Phẩm Nổi Bật" giới hạn hiển thị 3 đôi giày thu hút nhất, với nút chuyển tiếp "Xem Tất Cả Sản Phẩm" đưa người dùng vào trang sản phẩm đầy đủ.
2. **Trang Danh Sách Sản Phẩm (Shop):** Lưới sản phẩm được render hoàn toàn tự động bằng JavaScript từ kho dữ liệu (`localStorage`), hỗ trợ bộ lọc phân loại sản phẩm.
3. **Trang Chi Tiết Sản Phẩm (Product Details):**
   - Đọc tham số `?id=xxx` từ URL.
   - Tìm kiếm sản phẩm tương ứng trong dữ liệu và hiển thị chi tiết: Tên, giá, mô tả, danh mục, số sao đánh giá.
   - Cho phép chọn Size, Màu sắc, Số lượng và Thêm vào giỏ hàng.
4. **Giỏ Hàng (Cart):**
   - Lưu trữ các mặt hàng đã chọn vào `localStorage`.
   - Tính toán linh hoạt Tổng phụ (Subtotal), Phí giao hàng và Tổng tiền (Total).
   - Cho phép xóa sản phẩm khỏi giỏ hàng.
5. **Đăng Ký & Đăng Nhập Khách Hàng (Auth):**
   - Cung cấp tính năng đăng ký tài khoản (tên, email, mật khẩu) và lưu trữ trực tiếp vào bộ nhớ của trình duyệt.
   - Giao diện thiết kế theo dạng Split-Panel mượt mà, cho phép trượt qua lại giữa 2 form Đăng Ký và Đăng Nhập.
   - Trạng thái đăng nhập được quản lý bằng `sessionStorage`. Hệ thống Navigation (thanh điều hướng) tự động thay đổi, hiển thị tên Khách hàng kèm chức năng Đăng xuất.
6. **Trang Giới Thiệu (About Us):**
   - Layout đa dạng, hiện đại: Hero banner gradient, Hiệu ứng Ảnh thu phóng khi hover, Lưới 3 cột thể hiện Giá trị cốt lõi, và Bảng thống kê con số (Statistics) thu hút.
7. **Trang Liên Hệ (Contact):**
   - Tích hợp biểu mẫu liên hệ, thông tin địa chỉ và iframe bản đồ Google Maps.

### 4.2. Hệ Thống Quản Trị (Admin Dashboard)
1. **Bảo Mật Đăng Nhập:** 
   - Truy cập vào trang quản trị phải thông qua màn hình Đăng nhập (`login.html`).
   - Trạng thái được giữ trong `sessionStorage`. Nếu chưa đăng nhập, tự động điều hướng (redirect) về trang login.
2. **Quản Lý Sản Phẩm (CRUD):**
   - **C**reate (Thêm): Admin có thể thêm sản phẩm mới (chọn phân loại, nhập giá, nhập link hình ảnh tùy ý, viết mô tả chi tiết).
   - **R**ead (Xem): Hiển thị tất cả sản phẩm dưới dạng bảng (Table) thống kê.
   - **U**pdate (Sửa): Cập nhật thông tin cho sản phẩm hiện có (thay đổi giá, ảnh, mô tả).
   - **D**elete (Xóa): Gỡ sản phẩm khỏi website.
   - Mọi thay đổi trong Admin Dashboard đều lập tức được phản ánh ở Trang chủ và Trang sản phẩm.

## 5. Dữ Liệu Sản Phẩm & Người Dùng (Data Structure)
Do không có Database backend (MySQL/MongoDB), hệ thống sử dụng các mảng Object JavaScript làm Mock Data.

**Cấu trúc dữ liệu Sản Phẩm:**
```javascript
{
    id: "p1",                          // ID duy nhất
    name: "Neon Pulse Lifestyle",      // Tên hiển thị
    category: "lifestyle",             // Phân loại (lifestyle, running, basketball)
    price: 3200000,                    // Giá bán (VNĐ)
    oldPrice: null,                    // Giá cũ (dành cho các sản phẩm giảm giá)
    image: "assets/images/sneaker_1...",// Đường dẫn ảnh (Local hoặc URL online)
    badge: "Mới",                      // Nhãn dán nổi bật (Mới, -15%, Siêu Phẩm)
    rating: 4.5,                       // Điểm đánh giá sao
    reviews: 128,                      // Số lượt đánh giá
    description: "Mô tả chi tiết..."   // Văn bản giới thiệu chi tiết sản phẩm
}
```

**Cấu trúc dữ liệu Người Dùng (Khách Hàng):**
```javascript
{
    id: "u178064...",                  // Mã định danh khởi tạo bằng Date.now()
    name: "Nguyễn Văn A",              // Họ và tên
    email: "email@example.com",        // Email dùng để đăng nhập
    password: "password123"            // Mật khẩu
}
```

## 6. Điểm Nhấn Kiến Trúc (Architecture Highlights)
- **Tách biệt Data và UI:** Trang web không viết cứng (hardcode) thẻ HTML cho từng sản phẩm. JS đóng vai trò lấy dữ liệu, thao tác mảng và render ra DOM. Điều này cho phép mở rộng không giới hạn số lượng sản phẩm một cách cực kỳ tối ưu.
- **Khả năng duy trì State mạnh mẽ:** Nhờ thiết kế tận dụng triệt để LocalStorage, một khách hàng có thể đóng trình duyệt, mở lại thì mọi giỏ hàng, thông tin đã đăng ký và cấu hình cửa hàng đều được giữ nguyên vẹn.
- **Quản lý Component Phức Tạp Bằng Vanilla CSS:** Trang Đăng nhập sử dụng thuần CSS Grid, Flexbox và CSS Transitions (Transform `translateX`) để tạo ra một slider đa chiều cực kì ấn tượng, mà không cần phụ thuộc vào bất cứ thư viện UI như React/Vue hay Bootstrap.

---
*Tài liệu này được tạo ra để cung cấp bối cảnh toàn diện cho mô hình ngôn ngữ lớn (LLM) hoặc hệ thống phân tích như NotebookLM nhằm tổng hợp, đặt câu hỏi và đưa ra đánh giá về toàn bộ vòng đời phát triển dự án web KICKS.*
