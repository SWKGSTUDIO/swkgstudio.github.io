// import { getAnalytics, logEvent } from "firebase/analytics";

const apiKey = 'key9kpLHqsdRFXvS2';
const baseId = 'appaePimTt1Ji6hSr';
const tableName = 'tblivWUpxtGbTszm3';

fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const listWidget = document.getElementById('list-widget');
    const ul = document.createElement('ul');
    ul.classList.add('button-list', 'horizontal');

    data.records.sort((a, b) => a.fields.Num - b.fields.Num);

    data.records.forEach(record => {
      const fields = record.fields;
      const name = fields.Name;
      const imageUrl = fields.Image;
      const url = fields.URL;
      const power = fields.Power;

      const button = document.createElement('button');
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = name;
      button.appendChild(img);

      const span = document.createElement('span');
      span.innerText = name;
      span.classList.add('image-text');
      img.parentNode.insertBefore(span, img.nextSibling);

      const li = document.createElement('li');

      if (power === "ON") {
        button.classList.add('button-on');
        button.addEventListener('click', () => {

          // console.log("Button clicked"); 
          // const analytics = getAnalytics();
          // logEvent(analytics, 'goal_completion', { name: 'CLICK GAME' });

          Ya.Context.AdvManager.render({
            "blockId": "R-A-2697791-1",
            "type": "fullscreen",
            "platform": "desktop"
          });

           // Показ рекламы для мобильных устройств
          if (isMobileDevice()) {
          Ya.Context.AdvManager.render({
          "blockId": "R-A-2697791-3",
          "type": "fullscreen",
          "platform": "touch"
          });
          }

          setTimeout(() => {
            console.log("Redirecting to URL");
            window.open(url, '_blank');
          }, 2000);
        });

      } else if (power === "OFF") {
        button.classList.add('button-off');
        button.disabled = true;
      }

      li.classList.add('hide');
      li.appendChild(button);
      ul.appendChild(li);
    });

    listWidget.appendChild(ul);

    setTimeout(function () {
      document.getElementById('list-widget').style.display = 'block';

      const listItems = ul.querySelectorAll('li');
      listItems.forEach((item, index) => {
        setTimeout(function () {
          item.classList.add('show');
        }, index * 50);
      });
    }, 100);
  })
  .catch(error => {
    console.error(error);
  });

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }