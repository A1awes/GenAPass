document.addEventListener('DOMContentLoaded', () => {
    // Переключение меню с настройками
    const toggleButton = document.querySelector('.toggle-settings');
    const settingsContent = document.querySelector('.settings-content');
    const arrowIcon = toggleButton ? toggleButton.querySelector('i') : null;

    const logoutButton = document.getElementById('logoutButton');
    
    logoutButton?.addEventListener('click', () => {
        localStorage.removeItem("isAuthenticated"); // Удаляем данные аутентификации
        window.location.href = "index.html"; // Перенаправляем на главную страницу
    });

    const deleteRequestButton = document.getElementById('deleteRequestButton');
    
    deleteRequestButton?.addEventListener('click', () => {
        window.location.href = "delete_request.html"; // Перенаправляем на страницу с опросом
    });


    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            settingsContent.classList.toggle('show');
            if (arrowIcon.classList.contains('fa-chevron-down')) {
                arrowIcon.classList.remove('fa-chevron-down');
                arrowIcon.classList.add('fa-times');
            } else {
                arrowIcon.classList.remove('fa-times');
                arrowIcon.classList.add('fa-chevron-down');
            }
        });
    }

    // Переключение темной темы
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle?.querySelector('i');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    document.body.classList.toggle('dark-theme', isDarkMode);
    icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';

    themeToggle?.addEventListener('click', () => {
        const darkMode = document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkMode', darkMode);
        icon.className = darkMode ? 'fas fa-moon' : 'fas fa-sun';
    });

    // Активная ссылка текущей страницы
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Работа с глазами и полем пароля
    const passwordField = document.getElementById('password');
    const eyes = document.querySelectorAll('.eye');

    function closeEyes() {
        eyes.forEach(eye => eye.classList.add('closed'));
        document.getElementById('securityMessage').classList.remove('hidden');
    }

    function openEyes() {
        eyes.forEach(eye => eye.classList.remove('closed'));
        document.getElementById('securityMessage').classList.add('hidden');
    }

    passwordField?.addEventListener('focus', closeEyes);
    passwordField?.addEventListener('blur', openEyes);

    document.addEventListener('mousemove', (event) => {
        const x = (event.clientX * 100) / window.innerWidth + '%';
        const y = (event.clientY * 100) / window.innerHeight + '%';
        eyes.forEach(eye => {
            const ball = eye.querySelector('.ball');
            ball.style.left = x;
            ball.style.top = y;
            ball.style.transform = `translate(-${x}, -${y})`;
        });
    });

    const loginOverlay = document.getElementById("loginOverlay");
    const registerOverlay = document.getElementById("registerOverlay");
    const registerLink = document.getElementById("registerLink");
    const loginLink = document.getElementById("loginLink");
    const switchToRegister = document.getElementById("switchToRegister");
    const switchToLogin = document.getElementById("switchToLogin");
    const loginErrorMessage = document.getElementById("loginErrorMessage");

    // Функция для переключения модальных окон
    function toggleModal(overlayToShow, overlayToHide) {
        if (overlayToShow) {
            overlayToShow.style.display = 'flex';
        }
        if (overlayToHide) {
            overlayToHide.style.display = 'none';
        }
    }

    // Открытие окна регистрации
    registerLink?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(registerOverlay, loginOverlay);
    });

    // Открытие окна входа
    loginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(loginOverlay, registerOverlay);
    });

    // Закрытие окна входа и скрытие сообщения об ошибке
    document.getElementById("closeModal")?.addEventListener("click", () => {
        loginOverlay.style.display = "none";
        loginErrorMessage.style.display = "none";
    });

    // Проверка логина и пароля
    document.querySelector("#loginOverlay .auth-button")?.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginOverlay.querySelector("input[type='text']").value;
        const password = loginOverlay.querySelector("input[type='password']").value;

        if (username === "test" && password === "1111") { // Пример проверки
            localStorage.setItem("isAuthenticated", "true");
            loginOverlay.style.display = "none";
            showProfileLink();
        } else {
            loginErrorMessage.textContent = "Неправильный логин или пароль. Попробуйте снова.";
            loginErrorMessage.style.display = "block";
        }
    });

    // Показать ссылку на профиль
    function showProfileLink() {
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        const profileLink = document.createElement("a");
        profileLink.href = "profile.html";
        profileLink.textContent = "Profile";
        profileLink.classList.add("profile-link");
        document.querySelector(".auth-buttons").appendChild(profileLink);
    }

    // Проверка статуса аутентификации
    if (localStorage.getItem("isAuthenticated") === "true") {
        showProfileLink();
    }

    // Закрытие модального окна при клике вне содержимого
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.addEventListener('click', function (event) {
            if (event.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Показать окно регистрации при переключении с окна входа
    switchToRegister?.addEventListener("click", (e) => {
        e.preventDefault();
        toggleModal(registerOverlay, loginOverlay);
    });

    // Показать окно входа при переключении с окна регистрации
    switchToLogin?.addEventListener("click", (e) => {
        e.preventDefault();
        toggleModal(loginOverlay, registerOverlay);
    });

});
