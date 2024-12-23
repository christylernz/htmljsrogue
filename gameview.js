import * as resources from './resources.js';

export var GameView = (function() {
  const viewHeight = 10;
  const viewWidth = 10;
  const renderMap = function(map) {
    const gameContainer = document.getElementById("game-container");
    let visibleMap = "";
    let viewPosX = 2;
    let viewPosY= 2; 
    for (let y = 0; y < viewHeight; y++) {
      for (let x = 0; x < viewWidth; x++) {
        const mapX = viewPosX + x - Math.floor(viewWidth / 2);
        const mapY = viewPosY + y - Math.floor(viewHeight / 2);
  
        if (mapX >= 0 && mapX < map[0].length && mapY >= 0 && mapY < gameState.map.length) {
          visibleMap += map[mapY][mapX];
        } else {
          visibleMap += resources.icons['empty'];
        }
      }
      visibleMap += "<br/>";
    }
  
    gameContainer.innerHTML = visibleMap;
  }
  return function() {
    //staticView.renderMap(staticSystem.map);
    //staticView.renderInventory();
    return {
      renderMap
    };
  }
})();

export function addListeners() {
    // Set up event listeners for player movement
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp": movePlayer(properties.Direction.UP); break;
            case "ArrowDown": movePlayer(properties.Direction.DOWN); break;
            case "ArrowLeft": movePlayer(properties.Direction.LEFT); break;
            case "ArrowRight": movePlayer(properties.Direction.RIGHT); break;
        }
    });

    // Set up event listeners for movement buttons
    document.getElementById("up").addEventListener("click", () => movePlayer(properties.Direction.UP));
    document.getElementById("down").addEventListener("click", () => movePlayer(properties.Direction.DOWN));
    document.getElementById("left").addEventListener("click", () => movePlayer(properties.Direction.LEFT));
    document.getElementById("right").addEventListener("click", () => movePlayer(properties.Direction.RIGHT));

}

// Render the visible portion of the map
 

export function renderInventory() {
    const inventoryContainer = document.getElementById("inventory");
    inventoryContainer.innerHTML = gameState.inventory.map(item => `<div class="item">${item}</div>`).join("");
}