const nativeAdsButton = document.getElementById('native-ads-button');
const controlPanel = document.getElementById('control-panel');
const closeControlPanelButton = document.getElementById('close-control-panel');

nativeAdsButton.addEventListener('click', () => {
    controlPanel.style.display = 'block';
});

closeControlPanelButton.addEventListener('click', () => {
    controlPanel.style.display = 'none';
});

const cancelEditButton = document.getElementById('cancelEdit');
const editImageModal = document.getElementById('editImageModal');

cancelEditButton.addEventListener('click', () => {
    editImageModal.style.display = 'none';
});

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

async function deleteAd(id) {

    try {
        const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
        let data = await response.json();

        data = data.filter(ad => ad.id !== id);

        await fetch('https://intermediate-easy-ship.glitch.me/nativeads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        fetchAds();
    } catch (error) {
        console.error('Error deleting ad:', error);
    }
}

document.getElementById('addForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;

    try {
        const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
        let data = await response.json();

        const newAd = {
            id: Date.now().toString(),
            category,
            image,
            title,
            link
        };

        data.push(newAd);
        await fetch('https://intermediate-easy-ship.glitch.me/nativeads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        fetchAds();
    } catch (error) {
        console.error('Error adding ad:', error);
    }
});

async function editImageLink(id, imageLink) {
    const editImageModal = document.getElementById('editImageModal');
    const editImageForm = document.getElementById('editImageForm');
    const editImageId = document.getElementById('editImageId');
    const editImageLinkInput = document.getElementById('editImageLink');

    editImageId.value = id;
    editImageLinkInput.value = imageLink;

    editImageModal.style.display = 'block';

    editImageForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newImageLink = editImageLinkInput.value;

        try {
            const response = await fetch('https://intermediate-easy-ship.glitch.me/nativeads');
            let data = await response.json();

            data = data.map(ad => {
                if (ad.id === id) {
                    ad.image = newImageLink;
                }
                return ad;
            });

            await fetch('https://intermediate-easy-ship.glitch.me/nativeads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            editImageModal.style.display = 'none';

            fetchAds();
        } catch (error) {
            console.error('Error editing image link:', error);
        }
    });
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

fetchAds();
