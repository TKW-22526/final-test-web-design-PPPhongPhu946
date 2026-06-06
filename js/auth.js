// Toggle Animation Logic
const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInBtn');
const authContainer = document.getElementById('authContainer');

if (signUpBtn && signInBtn && authContainer) {
    signUpBtn.addEventListener('click', () => {
        authContainer.classList.add('sign-up-mode');
    });

    signInBtn.addEventListener('click', () => {
        authContainer.classList.remove('sign-up-mode');
    });
}

// Database Initialization (Mock)
function getUsers() {
    return JSON.parse(localStorage.getItem('kicks_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('kicks_users', JSON.stringify(users));
}

// Registration Logic
const signUpForm = document.getElementById('signUpForm');
if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const errorEl = document.getElementById('registerError');

        errorEl.style.display = 'none';

        if (password !== confirmPassword) {
            errorEl.textContent = 'Mật khẩu xác nhận không khớp!';
            errorEl.style.display = 'block';
            return;
        }

        const users = getUsers();
        const userExists = users.find(u => u.email === email);

        if (userExists) {
            errorEl.textContent = 'Email này đã được đăng ký!';
            errorEl.style.display = 'block';
            return;
        }

        // Add user
        const newUser = {
            id: 'u' + Date.now(),
            name: name,
            email: email,
            password: password // Trrong thực tế phải hash password
        };
        users.push(newUser);
        saveUsers(users);

        alert('Đăng ký thành công! Hãy đăng nhập.');
        signUpForm.reset();
        authContainer.classList.remove('sign-up-mode');
    });
}

// Login Logic
const signInForm = document.getElementById('signInForm');
if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const errorEl = document.getElementById('loginError');

        errorEl.style.display = 'none';

        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Save session
            sessionStorage.setItem('kicks_customer', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            }));
            
            // Redirect
            window.location.href = '../index.html';
        } else {
            errorEl.textContent = 'Email hoặc mật khẩu không chính xác!';
            errorEl.style.display = 'block';
        }
    });
}
