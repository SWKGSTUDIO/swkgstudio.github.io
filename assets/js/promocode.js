// Функция для генерации случайной латинской буквы
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
}

// Функция для генерации случайного числа или нуля
function getRandomNumberOrZero() {
    return Math.random() < 0.5 ? '0' : Math.floor(Math.random() * 10).toString();
}

// Функция для генерации промокода
function generatePromoCode() {
    const promoCode = `SWKG-${getRandomLetter()}${getRandomNumberOrZero()}${getRandomNumberOrZero()}${getRandomLetter()}-${getRandomNumberOrZero()}${getRandomLetter()}${getRandomNumberOrZero()}${getRandomNumberOrZero()}`;
    return promoCode;
}

// Обработчик нажатия на кнопку
document.getElementById('generateButton').addEventListener('click', function() {
    const promoCode = generatePromoCode();
    // alert(`Generated Promo Code: ${promoCode}`);
    this.innerText = promoCode;
    // Здесь можно отправить promoCode на сервер для сохранения, например, через AJAX запрос
    // Пример:
    /*
    fetch('/save-promo-code', {
        method: 'POST',
        body: JSON.stringify({ promoCode }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log('Promo Code saved successfully.');
        } else {
            console.error('Failed to save Promo Code.');
        }
    });
    */
});
