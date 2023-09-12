
    function handleTileClick(link, imageSrc, isMobile) {
      showYandexAd(isMobile, () => {
        setTimeout(() => {
          window.open(link, '_blank');
        }, 2000);
      });
    }
  
    function showYandexAd(isMobile, callback) {
      const mobileBlockId = 'R-A-2697791-3';
      const desktopBlockId = 'R-A-2697791-1';
  
      if (isMobile) {
        Ya.Context.AdvManager.render({
          blockId: mobileBlockId,
          type: 'fullscreen',
          platform: 'touch'
        });
      } else {
        Ya.Context.AdvManager.render({
          blockId: desktopBlockId,
          type: 'fullscreen',
          platform: 'desktop'
        });
      }
  
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  
    function isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  
    window.yaContextCb = window.yaContextCb || [];
  
    const apiKey = 'key9kpLHqsdRFXvS2';
    const baseId = 'appaePimTt1Ji6hSr';
    const tableName = 'tbl4Q3aHOdskWF9aR';
  
    fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
  
        const appTilesContainer = document.getElementById("appTiles");
  
        data.records.forEach(record => {
          const fields = record.fields;
          const appTile = document.createElement("div");
          appTile.classList.add("app-tile");
  
          const image = document.createElement("img");
          image.src = fields.Image;
  
          const title = document.createElement("div");
          title.textContent = fields.Title;
          title.classList.add("app-title");
  
          appTile.addEventListener('click', () => handleTileClick(fields.URL, fields.Image, isMobileDevice()));
  
          appTile.appendChild(image);
          appTile.appendChild(title);
          appTilesContainer.appendChild(appTile);
        });
  
        setTimeout(() => {
          document.getElementById('list-widget').style.display = 'block';
        }, 100);
      })
      .catch(error => {
        console.error(error);
      });

      
