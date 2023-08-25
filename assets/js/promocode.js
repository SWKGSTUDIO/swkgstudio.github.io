// Function to generate a random letter
function getRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
}

// Function to generate a random number or zero
function getRandomNumberOrZero() {
  return Math.random() < 0.5 ? '0' : Math.floor(Math.random() * 10).toString();
}

// Function to generate a promo code
function generatePromoCode() {
  return `SWKG-${getRandomLetter()}${getRandomNumberOrZero()}${getRandomNumberOrZero()}${getRandomLetter()}-${getRandomNumberOrZero()}${getRandomLetter()}${getRandomNumberOrZero()}${getRandomNumberOrZero()}`;
}

// Function to copy text to clipboard
function copyToClipboardWithNotification(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showNotification(`Promo code: ${text}`);
      })
      .catch(error => {
        console.error('Error copying text to clipboard:', error);
      });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification(`Promo code: ${text}`);
  }
}

let lastNotification;

function showNotification(text) {
  if (lastNotification) {
    lastNotification.close();
  }
  lastNotification = new Notification('Promo Code Copied', {
    body: text,
  });
  setTimeout(() => {
    lastNotification.close();
  }, 5000);
}

function fetchPromoCode() {
  return fetch('https://intermediate-easy-ship.glitch.me/get-promo-code')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch Promo Code.');
      }
    })
    .catch(error => {
      console.error('Error fetching promo code:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generateButton');
  const promoCodeDisplay = document.getElementById('promoCodeDisplay');
    
  fetchAndDisplayPromoCode();
  
  // Event listener for the button click
  generateButton.addEventListener('click', async function() {
    const promoCode = generatePromoCode();
    try {
      // Send promoCode to the server
      const response = await fetch('https://intermediate-easy-ship.glitch.me/save-promo-code', {
        method: 'POST',
        body: JSON.stringify({ promoCode }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        await fetchAndDisplayPromoCode();
      } else {
        console.error('Failed to save Promo Code.');
      }
    } catch (error) {
      console.error('Error fetching promo code:', error);
    }
  });

  async function fetchAndDisplayPromoCode() {
    try {
      const data = await fetchPromoCode();
      if (data && data.promoCode) {
        promoCodeDisplay.innerText = `${data.promoCode}`;
        promoCodeDisplay.addEventListener('click', function() {
          setTimeout(function() {
            copyToClipboardWithNotification(data.promoCode);
          }, 0);
        });
      } else {
        promoCodeDisplay.innerText = 'No promo code available.';
      }
    } catch (error) {
      console.error('Error fetching promo code:', error);
    }
  }

  async function fetchPromoCode() {
    const response = await fetch('https://intermediate-easy-ship.glitch.me/get-promo-code');
    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to fetch Promo Code.');
      return { promoCode: null };
    }
  }
});
