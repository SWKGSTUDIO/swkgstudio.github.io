document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const adminContent = document.getElementById('admin-content');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Здесь вы можете добавить проверку логина и пароля.
        // Если они верны, то скрываем форму входа и отображаем содержимое админ-панели.

        if (username === 'swkgadmin' && password === 'swkgpassword') {
            loginForm.style.display = 'none';
            adminContent.style.display = 'block';
        } else {
            alert('Неверный логин или пароль');
        }
    });
});
