<?php
session_start();

// Проверяем, была ли отправлена форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST["login"];
    $password = $_POST["password"];

    // Здесь вы можете добавить проверку логина и пароля
    // Например, сравнить с желаемыми значениями
    if ($login === "swkgadmin" && $password === "swkgpassword") {
        // Установка сессии, чтобы пометить пользователя как авторизованного
        $_SESSION["authenticated"] = true;
        header("Location: admin_panel.php"); // Перенаправляем на админ-панель
        exit();
    } else {
        // Неправильные учетные данные, вы можете добавить обработку ошибки здесь
        // Например, вывести сообщение об ошибке
        echo "Неправильный логин или пароль";
    }
}
?>
