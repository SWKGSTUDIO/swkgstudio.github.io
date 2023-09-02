document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.getElementById('tab-container');
    const tabContent = document.querySelector('.tab-content');
    const addTabButton = document.getElementById('add-tab-button');
    
    let maxTabId = 0; // Определяем переменную для хранения максимального ID вкладки

    async function loadTabs() {
        try {
            const response = await fetch('https://intermediate-easy-ship.glitch.me/adminpaneldata');
            if (!response.ok) {
                throw new Error(`Ошибка загрузки вкладок: ${response.statusText}`);
            }
            const data = await response.json();
    
            tabContainer.innerHTML = '';
    
            // Если сервер вернул пустой список вкладок или не вернул данные, добавим пустую вкладку на клиенте
            if (!data.games || data.games.length === 0) {
                const emptyTab = {
                    name: 'Пустая вкладка',
                    content: 'Здесь пока нет данных'
                };
                data.games = [emptyTab];
            }
    
            data.games.forEach((game) => {
                const tabElement = document.createElement('div');
                tabElement.classList.add('tab');
    
                // Устанавливаем data-tab-id для вкладки
                tabElement.setAttribute('data-tab-id', game.id);
    
                const tabName = document.createElement('span');
                tabName.classList.add('tab-name');
                tabName.textContent = game.name;
                tabElement.appendChild(tabName);
    
                const closeIcon = document.createElement('button');
                closeIcon.classList.add('close-tab', 'close-tab-button');
                closeIcon.textContent = 'X';
                tabElement.appendChild(closeIcon);
    
                tabElement.addEventListener('click', () => {
                    loadTabContent(game);
                });
    
                closeIcon.addEventListener('click', async (event) => {
                    event.stopPropagation();
                
                    // Выводим подтверждающее окно
                    const confirmed = confirm('Вы уверены, что хотите удалить эту вкладку?');
                
                    if (confirmed) {
                        removeTab(tabElement);
                
                        const tabId = tabElement.getAttribute('data-tab-id');
                
                        try {
                            const deleteResponse = await fetch(`https://intermediate-easy-ship.glitch.me/adminpaneldata/${tabId}`, {
                                method: 'DELETE'
                            });
                            if (!deleteResponse.ok) {
                                throw new Error(`Ошибка удаления вкладки: ${deleteResponse.statusText}`);
                            }
                
                            location.reload();
                
                        } catch (error) {
                            console.error('Произошла ошибка при удалении вкладки на сервере:', error);
                        }
                    }
                });
                
    
                tabContainer.appendChild(tabElement);
    
                maxTabId = Math.max(maxTabId, game.id || 0);
            });
    
            if (data.games.length > 0) {
                loadTabContent(data.games[0]);
            }
        } catch (error) {
            console.error('Произошла ошибка при загрузке вкладок:', error);
        }
    }
    
    function loadTabContent(game) {
        tabContent.innerHTML = '';
    
        const tabPanel = document.createElement('div');
        tabPanel.classList.add('tab-panel');
    
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить';
        saveButton.id = 'save-button';
    
        const saveIcon = document.createElement('i');
        saveIcon.classList.add('fas', 'fa-save');
    
        const gameNameLabel = document.createElement('label');
        gameNameLabel.textContent = 'Название:';
    
        const gameNameInput = document.createElement('input');
        gameNameInput.type = 'text';
        gameNameInput.value = game.name;
        gameNameInput.id = 'game-name-input';
    
        const googleAdMobLabel = document.createElement('label');
        googleAdMobLabel.textContent = 'AdMob AppID:';
    
        const googleAdMobInput = document.createElement('input');
        googleAdMobInput.type = 'text';
        googleAdMobInput.value = game.google_admob_id || '';
        googleAdMobInput.id = 'google-admob-input';
    
        const bannerIdLabel = document.createElement('label');
        bannerIdLabel.textContent = 'Баннер ИД:';
    
        const bannerIdInput = document.createElement('input');
        bannerIdInput.type = 'text';
        bannerIdInput.value = game.banner_id || '';
        bannerIdInput.id = 'banner-id-input';
    
        const interstitialIdLabel = document.createElement('label');
        interstitialIdLabel.textContent = 'Межстраничка ИД:';
    
        const interstitialIdInput = document.createElement('input');
        interstitialIdInput.type = 'text';
        interstitialIdInput.value = game.interstitial_id || '';
        interstitialIdInput.id = 'interstitial-id-input';
    
        const rewardIdLabel = document.createElement('label');
        rewardIdLabel.textContent = 'Ревард ИД:';
    
        const rewardIdInput = document.createElement('input');
        rewardIdInput.type = 'text';
        rewardIdInput.value = game.reward_id || '';
        rewardIdInput.id = 'reward-id-input';
    
        tabPanel.appendChild(saveButton);
        saveButton.appendChild(saveIcon);
        tabPanel.appendChild(gameNameLabel);
        tabPanel.appendChild(gameNameInput);
        tabPanel.appendChild(googleAdMobLabel);
        tabPanel.appendChild(googleAdMobInput);
        tabPanel.appendChild(bannerIdLabel);
        tabPanel.appendChild(bannerIdInput);
        tabPanel.appendChild(interstitialIdLabel);
        tabPanel.appendChild(interstitialIdInput);
        tabPanel.appendChild(rewardIdLabel);
        tabPanel.appendChild(rewardIdInput);
    
        tabContent.appendChild(tabPanel);
    
        saveButton.addEventListener('click', async () => {
            const newGameName = gameNameInput.value;
            const newGoogleAdMobId = googleAdMobInput.value;
            const newBannerId = bannerIdInput.value;
            const newInterstitialId = interstitialIdInput.value;
            const newRewardId = rewardIdInput.value;
    
            game.name = newGameName;
            game.google_admob_id = newGoogleAdMobId;
            game.banner_id = newBannerId;
            game.interstitial_id = newInterstitialId;
            game.reward_id = newRewardId;
    
            try {
                const updateResponse = await fetch(`https://intermediate-easy-ship.glitch.me/adminpaneldata/${game.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(game)
                });
    
                if (!updateResponse.ok) {
                    throw new Error(`Ошибка обновления игры: ${updateResponse.statusText}`);
                }
    
                const tabElement = document.querySelector(`[data-tab-id="${game.id}"]`);
                const tabNameElement = tabElement.querySelector('.tab-name');
                tabNameElement.textContent = newGameName;
    
            } catch (error) {
                console.error('Произошла ошибка при обновлении игры на сервере:', error);
            }
        });
    }
    
    function removeTab(tabElement) {
        tabElement.remove();
    }
    
    addTabButton.addEventListener('click', async () => {
        // Создаем новую вкладку с ID на единицу больше максимального
        const newTab = {
            name: 'Новая вкладка',
            content: '',
            id: maxTabId + 1
        };
    
        try {
            // Отправляем новую вкладку на сервер
            const response = await fetch('https://intermediate-easy-ship.glitch.me/adminpaneldata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTab)
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка добавления вкладки: ${response.statusText}`);
            }
    
            // После успешного добавления перезагружаем страницу
            location.reload();
        } catch (error) {
            console.error('Произошла ошибка при добавлении вкладки на сервере:', error);
        }
    });
    
    loadTabs();
});
