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
  const promoCode = `SWKG-${getRandomLetter()}${getRandomNumberOrZero()}${getRandomNumberOrZero()}${getRandomLetter()}-${getRandomNumberOrZero()}${getRandomLetter()}${getRandomNumberOrZero()}${getRandomNumberOrZero()}`;
  return promoCode;
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

// ...

document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generateButton');
  const promoCodeDisplay = document.getElementById('promoCodeDisplay');
    
  fetchAndDisplayPromoCode();

  // Event listener for the button click
  generateButton.addEventListener('click', function() {
    const promoCode = generatePromoCode();

    // Send promoCode to the server
    fetch('https://intermediate-easy-ship.glitch.me/save-promo-code', {
      method: 'POST',
      body: JSON.stringify({ promoCode }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to save Promo Code.');
      }
    }).then(data => {
      if (data && data.message === 'Promo code saved successfully') {
        // Fetch the promo code from the server
        fetch('https://intermediate-easy-ship.glitch.me/get-promo-code')
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('Failed to fetch Promo Code.');
            }
          }).then(data => {
            if (data && data.promoCode) {
              promoCodeDisplay.innerText = `${data.promoCode}`;
                promoCodeDisplay.addEventListener('click', function() {
                copyToClipboardWithNotification(data.promoCode);
            });
            } else {
              promoCodeDisplay.innerText = 'No promo code available.';
            }
          }).catch(error => {
            console.error('Error fetching promo code:', error);
          });
      }
    }).catch(error => {
      console.error('Error fetching promo code:', error);
    });
  });
});


// Определение функции для получения и отображения промокода
function fetchAndDisplayPromoCode() {
  const promoCodeDisplay = document.getElementById('promoCodeDisplay');

  fetch('https://intermediate-easy-ship.glitch.me/get-promo-code')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch Promo Code.');
      }
    }).then(data => {
      if (data && data.promoCode) {
        promoCodeDisplay.innerText = `${data.promoCode}`;
      } else {
        console.error('No promo code data received from server.');
      }
    }).catch(error => {
      console.error('Error fetching promo code:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generateButton');
  const promoCodeDisplay = document.getElementById('promoCodeDisplay');
    
  fetchAndDisplayPromoCode();


  // Event listener for the button click
  generateButton.addEventListener('click', function() {
    const promoCode = generatePromoCode();

    // Send promoCode to the server
    fetch('https://intermediate-easy-ship.glitch.me/save-promo-code', {
      method: 'POST',
      body: JSON.stringify({ promoCode }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to save Promo Code.');
      }
    }).then(data => {
      if (data && data.message === 'Promo code saved successfully') {
        // Fetch the promo code from the server
        fetch('https://intermediate-easy-ship.glitch.me/get-promo-code')
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('Failed to fetch Promo Code.');
            }
          }).then(data => {
            if (data && data.promoCode) {
              promoCodeDisplay.innerText = `${data.promoCode}`;
                
                promoCodeDisplay.addEventListener('click', function() {
                copyToClipboardWithNotification(data.promoCode);
                });
                
            } else {
              promoCodeDisplay.innerText = 'No promo code available.';
            }
          }).catch(error => {
            console.error('Error fetching promo code:', error);
          });
      }
    }).catch(error => {
      console.error('Error fetching promo code:', error);
    });
  });
});
