document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.getElementById('tab-container');
    const tabContent = document.querySelector('.tab-content');
    // const addTabButton = document.getElementById('add-tab-button');

    let maxTabId = 0;

    async function loadTabs() {
        try {
            const response = await fetch('https://intermediate-easy-ship.glitch.me/adminpaneldata');
            if (!response.ok) {
                throw new Error(`Ошибка загрузки вкладок: ${response.statusText}`);
            }
            const data = await response.json();

            tabContainer.innerHTML = '';

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

                tabElement.setAttribute('data-tab-id', game.id);

                const tabName = document.createElement('span');
                tabName.classList.add('tab-name');
                tabName.textContent = truncateText(game.name, 15);
                tabElement.appendChild(tabName);

                const closeIcon = document.createElement('button');
                closeIcon.classList.add('close-tab', 'close-tab-button');
                closeIcon.textContent = '';
                tabElement.appendChild(closeIcon);

                tabElement.addEventListener('click', () => {
                    loadTabContent(game);
                });

                closeIcon.addEventListener('click', async (event) => {
                    event.stopPropagation();

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

                function truncateText(text, maxLength) {
                    if (text.length > maxLength) {
                        return text.slice(0, maxLength - 3) + '...';
                    }
                    return text;
                }

                tabContainer.appendChild(tabElement);

                maxTabId = Math.max(maxTabId, game.id || 0);
            });

            // Создаем кнопку "ДОБАВИТЬ" как последнюю вкладку
            const addButtonTab = document.createElement('div');
            addButtonTab.classList.add('tab', 'btn', 'btn-custom', 'add-tab-button');
            addButtonTab.textContent = 'ДОБАВИТЬ';

            addButtonTab.addEventListener('click', async () => {
                const newTab = {
                    name: 'Новая вкладка',
                    content: '',
                    id: maxTabId + 1
                };

                try {
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

                    location.reload();
                } catch (error) {
                    console.error('Произошла ошибка при добавлении вкладки на сервере:', error);
                }
            });

            tabContainer.appendChild(addButtonTab);

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


        const promoLiteLabel = document.createElement('label');
        promoLiteLabel.textContent = 'Промо-код Lite:';

        const promoLiteInput = document.createElement('input');
        promoLiteInput.type = 'text';
        promoLiteInput.value = game.promo_lite || ''; // Предположим, что поле называется promo_lite
        promoLiteInput.id = 'promo-lite-input';

        const promoPremiumLabel = document.createElement('label');
        promoPremiumLabel.textContent = 'Промо-код Premium:';

        const promoPremiumInput = document.createElement('input');
        promoPremiumInput.type = 'text';
        promoPremiumInput.value = game.promo_premium || ''; // Предположим, что поле называется promo_premium
        promoPremiumInput.id = 'promo-premium-input';


        const installZipLabel = document.createElement('label');
        installZipLabel.textContent = 'Install Zip:';

        const installZipInput = document.createElement('input');
        installZipInput.type = 'text';
        installZipInput.value = game.install_zip || ''; // Предположим, что поле называется install_zip
        installZipInput.id = 'install-zip-input';

        const installZipFreeLabel = document.createElement('label');
        installZipFreeLabel.textContent = 'Install Zip Free:';

        const installZipFreeInput = document.createElement('input');
        installZipFreeInput.type = 'text';
        installZipFreeInput.value = game.install_zip_free || ''; // Предположим, что поле называется install_zip_free
        installZipFreeInput.id = 'install-zip-free-input';


        // Создайте элементы для ввода строкового кода
        const stringCodeLabel = document.createElement('label');
        stringCodeLabel.textContent = 'Код (строка):';

        const stringCodeTextarea = document.createElement('textarea');
        stringCodeTextarea.value = game.string_code || '';
    
        stringCodeTextarea.addEventListener('input', () => {
            const newStringCode = stringCodeTextarea.value;
            game.string_code = newStringCode;
        });
    
        const generateCodeButton = document.createElement('button');
        generateCodeButton.textContent = 'Сгенерировать код';
        generateCodeButton.classList.add('generate-code-button');

    
        generateCodeButton.addEventListener('click', () => {

            const app_name = gameNameInput.value;
            const admob_app_id = googleAdMobInput.value;
            const banner_id = bannerIdInput.value;
            const interstitial_id = interstitialIdInput.value;
            const reward_id = rewardIdInput.value;
            const install_zip = installZipInput.value;
            const install_zip_free = installZipFreeInput.value;
            const Promo_Lite = promoLiteInput.value;
            const Promo_Premium = promoPremiumInput.value;

            const generatedCode = `
            <string name="app_name">${app_name}</string>
            <string name="admob_app_id">${admob_app_id}</string>
            <string name="banner_id">${banner_id}</string>
            <string name="interstitial_id">${interstitial_id}</string>
            <string name="reward_id">${reward_id}</string>
            <string name="install_zip">${install_zip}</string>
            <string name="install_zip_free">${install_zip_free}</string>
            <string name="Promo_Lite">${Promo_Lite}</string>
            <string name="Promo_Premium">${Promo_Premium}</string>
            `;

            stringCodeTextarea.value = generatedCode;
        });

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
        tabPanel.appendChild(promoLiteLabel);
        tabPanel.appendChild(promoLiteInput);
        tabPanel.appendChild(promoPremiumLabel);
        tabPanel.appendChild(promoPremiumInput);
        tabPanel.appendChild(promoLiteLabel);
        tabPanel.appendChild(promoLiteInput);
        tabPanel.appendChild(promoPremiumLabel);
        tabPanel.appendChild(promoPremiumInput);
        tabPanel.appendChild(installZipLabel);
        tabPanel.appendChild(installZipInput);
        tabPanel.appendChild(installZipFreeLabel);
        tabPanel.appendChild(installZipFreeInput);


        tabPanel.appendChild(stringCodeLabel);
        tabPanel.appendChild(stringCodeTextarea);
        tabPanel.appendChild(generateCodeButton);

        tabContent.appendChild(tabPanel);
        

        saveButton.addEventListener('click', async () => {
            const newGameName = gameNameInput.value;
            const newGoogleAdMobId = googleAdMobInput.value;
            const newBannerId = bannerIdInput.value;
            const newInterstitialId = interstitialIdInput.value;
            const newRewardId = rewardIdInput.value;
            const newInstallZip = installZipInput.value; // Добавлено
            const newInstallZipFree = installZipFreeInput.value; // Добавлено
            const newPromoLite = promoLiteInput.value;
            const newPromoPremium = promoPremiumInput.value;
            const newStringCode = stringCodeTextarea.value;
        
            game.name = newGameName;
            game.google_admob_id = newGoogleAdMobId;
            game.banner_id = newBannerId;
            game.interstitial_id = newInterstitialId;
            game.reward_id = newRewardId;
            game.install_zip = newInstallZip; // Обновлено
            game.install_zip_free = newInstallZipFree; // Обновлено
            game.promo_lite = newPromoLite;
            game.promo_premium = newPromoPremium;
            game.string_code = newStringCode;
        
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
        
                location.reload();
        
            } catch (error) {
                console.error('Произошла ошибка при обновлении игры на сервере:', error);
            }
        });
    }
    


    function removeTab(tabElement) {
        tabElement.remove();
    }


    loadTabs();
});
