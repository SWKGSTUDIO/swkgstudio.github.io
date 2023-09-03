// Получаем кнопку "NATIVEADS" и панель управления
const nativeAdsButton = document.getElementById('native-ads-button');
const controlPanel = document.getElementById('control-panel');
const closeControlPanelButton = document.getElementById('close-control-panel');

// Обработчик клика на кнопку "NATIVEADS"
nativeAdsButton.addEventListener('click', () => {
    controlPanel.style.display = 'block'; // Отображаем панель управления
});

// Обработчик клика на кнопку закрытия панели управления
closeControlPanelButton.addEventListener('click', () => {
    controlPanel.style.display = 'none'; // Скрываем панель управления
});


// Получаем кнопку "Cancel" и модальное окно редактирования
const cancelEditButton = document.getElementById('cancelEdit');
const editImageModal = document.getElementById('editImageModal');

// Обработчик клика на кнопку "Cancel"
cancelEditButton.addEventListener('click', () => {
    editImageModal.style.display = 'none'; // Скрываем модальное окно
});

// Функция для загрузки рекламных данных
async function fetchAds() {
    try {
        const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
        const data = await response.json();
        const tableBody = document.getElementById('tableBody');

        tableBody.innerHTML = '';

        data.forEach(ad => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ad.category}</td>
                <td><img src="${ad.image}" alt="${ad.title}" onclick="editImageLink('${ad.id}', '${ad.image}')"></td>
                <td>${ad.title}</td>
                <td><a href="${ad.link}" target="_blank">${ad.link}</a></td>
                <td><button class="delete-button" onclick="deleteAd('${ad.id}')">Delete</button></td>
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching ads:', error);
    }
}

// Функция для удаления рекламной записи
async function deleteAd(id) {
    // Получаем текущие данные
    try {
        const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
        let data = await response.json();

        // Удаляем запись с указанным id
        data = data.filter(ad => ad.id !== id);

        // Сохраняем обновленные данные
        await fetch('https://intermediate-easy-ship.glitch.me/nativeads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Перезагружаем таблицу
        fetchAds();
    } catch (error) {
        console.error('Error deleting ad:', error);
    }
}

// Функция для добавления новой рекламной записи
document.getElementById('addForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Получение данных из полей формы
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;

    // Получаем текущие данные
    try {
        const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
        let data = await response.json();

        // Создаем новую запись
        const newAd = {
            id: Date.now().toString(),
            category,
            image,
            title,
            link
        };

        // Обновляем данные и сохраняем
        data.push(newAd);
        await fetch('https://intermediate-easy-ship.glitch.me/nativeads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Перезагружаем таблицу
        fetchAds();
    } catch (error) {
        console.error('Error adding ad:', error);
    }
});

// Функция для редактирования ссылки на изображение
async function editImageLink(id, imageLink) {
    const editImageModal = document.getElementById('editImageModal');
    const editImageForm = document.getElementById('editImageForm');
    const editImageId = document.getElementById('editImageId');
    const editImageLinkInput = document.getElementById('editImageLink');

    // Заполнение формы данными
    editImageId.value = id;
    editImageLinkInput.value = imageLink;

    // Отображение модального окна
    editImageModal.style.display = 'block';

    // Обработчик формы редактирования
    editImageForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Получение данных из полей формы
        const newImageLink = editImageLinkInput.value;

        // Получаем текущие данные
        try {
            const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
            let data = await response.json();

            // Находим запись с указанным id и обновляем ссылку на изображение
            data = data.map(ad => {
                if (ad.id === id) {
                    ad.image = newImageLink;
                }
                return ad;
            });

            // Сохраняем обновленные данные
            await fetch('https://intermediate-easy-ship.glitch.me/nativeads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Закрываем модальное окно
            editImageModal.style.display = 'none';

            // Перезагружаем таблицу
            fetchAds();
        } catch (error) {
            console.error('Error editing image link:', error);
        }
    });
}

// Генерация уникальных идентификаторов для изображений в таблице
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Загрузка данных при загрузке страницы
fetchAds();
