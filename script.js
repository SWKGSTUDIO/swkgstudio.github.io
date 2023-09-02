// Код для работы с админ-панелью

document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-game-button');
    const saveButton = document.getElementById('save-button');
    const gamePanels = document.getElementById('game-panels');

    addButton.addEventListener('click', addGamePanel);
    saveButton.addEventListener('click', saveGameData);

    // Функция для добавления новой панели игры
    function addGamePanel() {
        const newGamePanel = createGamePanel();
        gamePanels.appendChild(newGamePanel);
    }

    // Функция для создания новой панели игры
    function createGamePanel() {
        const gamePanel = document.createElement('div');
        gamePanel.classList.add('game-panel');

        // Здесь вы можете добавить поля для ввода, например:
        // const inputName = document.createElement('input');
        // inputName.setAttribute('placeholder', 'Название игры');

        // Добавьте поля и другие элементы, которые вам нужны, внутрь gamePanel.

        return gamePanel;
    }

    // Функция для сохранения данных на сервере
    function saveGameData() {
        // Здесь вы можете собрать данные со всех панелей и отправить их на сервер.
        // Пример:
        const gamePanelsArray = Array.from(gamePanels.getElementsByClassName('game-panel'));
        const gameData = [];

        gamePanelsArray.forEach(panel => {
            // Соберите данные из полей панели и добавьте их в gameData.
            // Пример:
            // const name = panel.querySelector('input[placeholder="Название игры"]').value;
            // gameData.push({ name: name });
        });

        // Отправьте gameData на сервер с помощью fetch или другого метода.

        // Пример:
        // fetch('https://your-server.com/api/addGame', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ gameData: gameData })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Обработка ответа от сервера.
        // })
        // .catch(error => {
        //     console.error('Произошла ошибка при отправке данных:', error);
        // });
    }
});
