import * as resources from './resources.js';
import { Direction } from "./property.js";

export var GameView = (function() {
  // Render the visible portion of the map
  const renderMap = function(map) {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = map;
  };
  const renderInventory = function(inventory) {
    const inventoryContainer = document.getElementById("inventory");
    inventoryContainer.innerHTML = inventory.map(item => `<div class="item">${item}</div>`).join("");
  };
  return function() {
    //staticView.renderMap(staticSystem.map);
    //staticView.renderInventory();
    return {
      renderMap,
      renderInventory,
      addListeners
    };
  }
})();

export function addListeners(movePlayer) {
    // Set up event listeners for player movement
    console.log(movePlayer)
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp": movePlayer(Direction.UP); break;
            case "ArrowDown": movePlayer(Direction.DOWN); break;
            case "ArrowLeft": movePlayer(Direction.LEFT); break;
            case "ArrowRight": movePlayer(Direction.RIGHT); break;
        }
    });

    // Set up event listeners for movement buttons
    document.getElementById("up").addEventListener("click", () => movePlayer(Direction.UP));
    document.getElementById("down").addEventListener("click", () => movePlayer(Direction.DOWN));
    document.getElementById("left").addEventListener("click", () => movePlayer(Direction.LEFT));
    document.getElementById("right").addEventListener("click", () => movePlayer(Direction.RIGHT));

}