<?php
session_start();

// Проверяем, авторизован ли пользователь
if (!isset($_SESSION["authenticated"]) || $_SESSION["authenticated"] !== true) {
    // Если не авторизован, перенаправляем на страницу входа
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Админ Панель</title>
</head>
<body>
    <h2>Добро пожаловать в Админ Панель</h2>
    <p>Здесь вы можете управлять данными вашего сайта.</p>

    <!-- Добавьте здесь свой функционал для управления данными -->
    
    <p><a href="logout.php">Выйти</a></p>
</body>
</html>
