async function getNativeAds() {
    try {
        const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении объявлений:', error);
        throw error;
    }
}

async function deleteTabFromDatabase(tabId) {
    try {
        const response = await fetch(`https://intermediate-easy-ship.glitch.me/nativeads/${tabId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении вкладки из базы данных');
        }
    } catch (error) {
        console.error('Ошибка при удалении вкладки из базы данных:', error);
        throw error;
    }
}

async function saveTabToDatabase(tabId, updatedData) {
    try {
        const response = await fetch(`https://intermediate-easy-ship.glitch.me/nativeads/${tabId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при сохранении вкладки в базу данных');
        }
    } catch (error) {
        console.error('Ошибка при сохранении вкладки в базу данных:', error);
        throw error;
    }
}

async function addTabToDatabase(newTabData) {
    try {
        const response = await fetch(`https://intermediate-easy-ship.glitch.me/nativeads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTabData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при добавлении вкладки в базу данных');
        }

        const addedTab = await response.json();
        newTabData.id = addedTab.id;
    } catch (error) {
        console.error('Ошибка при добавлении вкладки в базу данных:', error);
        throw error;
    }
}

let currentIndex = 0;

async function createTabsAndContent() {
    try {
        const ads = await getNativeAds();
        const nativeTabContainer = document.getElementById('native-tab-container');
        const nativeContentContainer = document.querySelector('.native-content.mx-auto');
        nativeTabContainer.innerHTML = '';
        nativeContentContainer.innerHTML = '';
        ads.forEach((ad, index) => {
            const tab = document.createElement('div');
            tab.className = 'tab';
            tab.textContent = ad.title;
            tab.addEventListener('click', () => {
                nativeContentContainer.innerHTML = `
                    <div class="native-ad">
                        <img src="${ad.image}" alt="${ad.title}">
                        <p><input type="text" id="categoryInput_${index}" value="${ad.category}"></p>
                        <p><input type="text" id="titleInput_${index}" value="${ad.title}"></p>
                        <p><input type="text" id="imageInput_${index}" value="${ad.image}"></p>
                        <p><input type="text" id="linkInput_${index}" value="${ad.link}"></p>
                        <button class="save-tab-button_${index}">Сохранить</button>
                        <button class="delete-tab-button_${index}">Удалить вкладку</button>
                    </div>
                `;
                const saveButton = nativeContentContainer.querySelector(`.save-tab-button_${index}`);
                const deleteButton = nativeContentContainer.querySelector(`.delete-tab-button_${index}`);
                saveButton.addEventListener('click', async () => {
                    const updatedCategory = document.getElementById(`categoryInput_${index}`).value;
                    const updatedTitle = document.getElementById(`titleInput_${index}`).value;
                    const updatedImage = document.getElementById(`imageInput_${index}`).value;
                    const updatedLink = document.getElementById(`linkInput_${index}`).value;
                    const updatedData = {
                        category: updatedCategory,
                        title: updatedTitle,
                        image: updatedImage,
                        link: updatedLink,
                    };
                    try {
                        await saveTabToDatabase(ad.id, updatedData);
                        ad.category = updatedCategory;
                        ad.title = updatedTitle;
                        ad.image = updatedImage;
                        ad.link = updatedLink;

                        // Обновление текстового содержания элемента вкладки
                        tab.textContent = ad.title;

                        nativeContentContainer.innerHTML = '';

                    } catch (error) {
                        console.error('Ошибка при сохранении вкладки:', error);
                    }
                });
                deleteButton.addEventListener('click', async () => {
                    try {
                        await deleteTabFromDatabase(ad.id);
                        tab.remove();
                        nativeContentContainer.innerHTML = '';

                    } catch (error) {
                        console.error('Ошибка при удалении вкладки:', error);
                    }
                });
            });
            nativeTabContainer.appendChild(tab);
        });
        const addTabButton = document.createElement('div');
        addTabButton.className = 'tab add-tab-button';
        addTabButton.innerHTML = '<span>+</span> Добавить';
        addTabButton.addEventListener('click', () => {
            const newTabData = {
                category: 'Новая категория',
                title: 'Новая вкладка',
                image: 'URL к изображению',
                link: 'URL ссылки',
            };
            addTabToDatabase(newTabData);
            const index = currentIndex++;
            const tab = document.createElement('div');
            tab.className = 'tab';
            tab.textContent = newTabData.title;
            tab.addEventListener('click', () => {
                nativeContentContainer.innerHTML = `
                    <div class="native-ad">
                        <img src="${newTabData.image}" alt="${newTabData.title}">
                        <p><input type="text" id="categoryInput_${index}" value="${newTabData.category}"></p>
                        <p><input type="text" id="titleInput_${index}" value="${newTabData.title}"></p>
                        <p><input type="text" id="imageInput_${index}" value="${newTabData.image}"></p>
                        <p><input type="text" id="linkInput_${index}" value="${newTabData.link}"></p>
                        <button class="save-tab-button_${index}">Сохранить</button>
                        <button class="delete-tab-button_${index}">Удалить вкладку</button>
                    </div>
                `;
                const saveButton = nativeContentContainer.querySelector(`.save-tab-button_${index}`);
                const deleteButton = nativeContentContainer.querySelector(`.delete-tab-button_${index}`);

                saveButton.addEventListener('click', async () => {
                    const updatedCategory = document.getElementById(`categoryInput_${index}`).value;
                    const updatedTitle = document.getElementById(`titleInput_${index}`).value;
                    const updatedImage = document.getElementById(`imageInput_${index}`).value;
                    const updatedLink = document.getElementById(`linkInput_${index}`).value;
                    const updatedData = {
                        category: updatedCategory,
                        title: updatedTitle,
                        image: updatedImage,
                        link: updatedLink,
                    };
                    try {
                        await saveTabToDatabase(newTabData.id, updatedData);
                        newTabData.category = updatedCategory;
                        newTabData.title = updatedTitle;
                        newTabData.image = updatedImage;
                        newTabData.link = updatedLink;

                        // Обновление текстового содержания элемента вкладки
                        tab.textContent = newTabData.title;

                        nativeContentContainer.innerHTML = '';

                    } catch (error) {
                        console.error('Ошибка при сохранении вкладки:', error);
                    }
                });

                deleteButton.addEventListener('click', async () => {
                    try {
                        await deleteTabFromDatabase(newTabData.id);
                        tab.remove();
                        nativeContentContainer.innerHTML = '';
                        window.location.reload();
                    } catch (error) {
                        console.error('Ошибка при удалении вкладки:', error);
                    }
                });
            });
            nativeTabContainer.insertBefore(tab, addTabButton);
        });
        nativeTabContainer.appendChild(addTabButton);
    } catch (error) {
        console.error('Ошибка при создании вкладок и заполнении контента:', error);
    }
}

createTabsAndContent();
