document.addEventListener('DOMContentLoaded', () => {
    // Переключение меню с настройками
    const toggleButton = document.querySelector('.toggle-settings');
    const settingsContent = document.querySelector('.settings-content');
    const arrowIcon = toggleButton ? toggleButton.querySelector('i') : null;

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // Показ/скрытие меню с настройками
            settingsContent.classList.toggle('show');
            // Переключение иконки: стрелка вниз или крестик
            if (arrowIcon.classList.contains('fa-chevron-down')) {
                arrowIcon.classList.remove('fa-chevron-down');
                arrowIcon.classList.add('fa-times');
            } else {
                arrowIcon.classList.remove('fa-times');
                arrowIcon.classList.add('fa-chevron-down');
            }
        });
    }

    // Логика для переключения темной темы
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i'); // Находим иконку внутри кнопки
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Установка темы и иконки при загрузке страницы
    document.body.classList.toggle('dark-theme', isDarkMode);
    icon.className = isDarkMode ? 'fas fa-lock' : 'fas fa-lock-open'; // Установка нужной иконки при загрузке

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const darkMode = document.body.classList.toggle('dark-theme');
            localStorage.setItem('darkMode', darkMode);

            // Меняем иконки при переключении
            icon.className = darkMode ? 'fas fa-lock' : 'fas fa-lock-open';
        });
    }


    // Добавление класса active к ссылке текущей страницы
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Работа с глазами и полем пароля
    const passwordField = document.getElementById('password');
    const eyes = document.querySelectorAll('.eye');

    function closeEyes() {
        eyes.forEach(eye => {
            eye.classList.add('closed');
        });
        document.getElementById('securityMessage').classList.remove('hidden');
    }

    function openEyes() {
        eyes.forEach(eye => {
            eye.classList.remove('closed');
        });
        const securityMessage = document.getElementById('securityMessage');
        securityMessage.classList.add('hidden');
    }

    if (passwordField) {
        passwordField.addEventListener('focus', closeEyes);
        passwordField.addEventListener('blur', openEyes);
    }

    // Слежение за курсором для движения глаз
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

    // Переключение модальных окон регистрации и входа
    function toggleModal(overlayId) {
        const overlay = document.getElementById(overlayId);
        const usernameInput = overlay.querySelector('input[type="text"]');
        const passwordInput = overlay.querySelector('input[type="password"]');

        if (overlay.style.display === 'flex') {
            usernameInput.value = '';
            passwordInput.value = '';
            overlay.style.display = 'none';
        } else {
            overlay.style.display = 'flex';
            usernameInput.focus();
        }
    }

    const howToUseBtn = document.getElementById('howToUseBtn');
    const howToUseModal = document.getElementById('howToUseModal');
    const closeModal = document.getElementById('closeModal');

    // Открыть модальное окно по нажатию на кнопку
    if (howToUseBtn) {
        howToUseBtn.addEventListener('click', () => {
            howToUseModal.style.display = 'block';
        });
    }

    // Закрыть модальное окно по нажатию на кнопку "Close"
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            howToUseModal.style.display = 'none';
        });
    }

    // Закрыть модальное окно по клику вне его содержимого
    window.addEventListener('click', (event) => {
        if (event.target === howToUseModal) {
            howToUseModal.style.display = 'none';
        }
    });

    // Открытие и закрытие модальных окон регистрации и входа
    const registerLink = document.querySelector('#registerLink');
    const loginLink = document.querySelector('#loginLink');

    if (registerLink) {
        registerLink.addEventListener('click', function (event) {
            event.preventDefault();
            toggleModal('registerOverlay');
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', function (event) {
            event.preventDefault();
            toggleModal('loginOverlay');
        });
    }

    document.getElementById('switchToRegister')?.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('loginOverlay').style.display = 'none';
        toggleModal('registerOverlay');
    });

    document.getElementById('switchToLogin')?.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('registerOverlay').style.display = 'none';
        toggleModal('loginOverlay');
    });

    // Закрытие модальных окон при клике на затемненный фон
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.addEventListener('click', function (event) {
            if (event.target === this) {
                this.style.display = 'none';
            }
        });
    });
});
