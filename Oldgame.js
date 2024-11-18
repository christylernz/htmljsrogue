import * as resources from './resources.js';
import * as entities from './entity.js';
import * as properties from './property.js';
// Game state
const gameState = {
    map: [],
    player: null,
    viewWidth: 10,
    viewHeight: 10,
    inventory: []
};



// Load map from file
async function loadMap(filename) {
    try {
        const response = await fetch(filename);
        const mapText = await response.text();
        gameState.map = mapText.trim().split('\n');

        // Find player starting position
        for (let y = 0; y < gameState.map.length; y++) {
            const x = gameState.map[y].indexOf(resources.icons['player']);
            if (x !== -1) {
                gameState.player = new entities.Player(
                  new properties.Position([x, y]),
                  new properties.DisplayChar(resources.icons['player']), 
                  new properties.MovePosition()
                );
                break;
            }
        }

        validateMap();
        renderGame();
        renderInventory();
    } catch (error) {
        console.error('Error loading map:', error.message + "\n" + error.stack);
    }
}

// Validate the loaded map
function validateMap() {
    if (gameState.map.length === 0) {
        throw new Error('Map is empty');
    }

    const mapWidth = gameState.map[0].length;
    let playerCount = 0;

    for (let y = 0; y < gameState.map.length; y++) {
        if (gameState.map[y].length !== mapWidth) {
            throw new Error(`Row ${y} has inconsistent length: want ${mapWidth} got ${gameState.map[y].length}`);
        }

        for (let x = 0; x < mapWidth; x++) {
            const tile = gameState.map[y][x];
            /*if (!Object.values(resources.icons) .includes(tile)) {
                throw new Error(`Invalid character "${tile}" at position (${x}, ${y})`);
            }*/
            if (tile === resources.icons['player']) {
                playerCount++;
            }
        }
    }

    if (playerCount !== 1) {
        throw new Error(`Map should contain exactly one player starting position (@), found ${playerCount}`);
    }

    console.log('Map validation passed');
}

// Render the visible portion of the map
function renderGame() {
    const gameContainer = document.getElementById("game-container");
    let visibleMap = "";

    for (let y = 0; y < gameState.viewHeight; y++) {
        for (let x = 0; x < gameState.viewWidth; x++) {
            const mapX = gameState.player.position[0] + x - Math.floor(gameState.viewWidth / 2);
            const mapY = gameState.player.position[1] + y - Math.floor(gameState.viewHeight / 2);

            if (mapX >= 0 && mapX < gameState.map[0].length && mapY >= 0 && mapY < gameState.map.length) {
                visibleMap += gameState.map[mapY][mapX];
            } else {
                visibleMap += resources.icons['empty'];
            }
        }
        visibleMap += "<br/>";
    }

    gameContainer.innerHTML = visibleMap;
}

// Handle player movement
function movePlayer(direction) {
    let targetPosition = calculateDelta(gameState.player.position,direction)
    
    if (isInBounds(targetPosition)) {
        const targetTile = getObjectAt(targetPosition);
        if (targetTile !== resources.icons['wall']) {
            updateMapAt(resources.icons['floor'], gameState.player.position);
            gameState.player.move(direction);

            handleIteractions(targetTile);

            updateMapAt(gameState.player.render(), targetPosition);
            renderGame();
            renderInventory();
        }
    }
}

// Define direction vectors as constants
const VECTORS = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0]
};

function calculateDelta(position, direction) {
  const directionVector = VECTORS[direction];
  return position.map((coord, index) => coord + directionVector[index]);
}

function getObjectAt(position) {
  return gameState.map[position[0]][position[1]];
}

function updateMapAt(resource, position) {
  gameState.map[position[1]] = gameState.map[position[1]].substring(0, position[0]) 
  + resource
  + gameState.map[position[1]].substring(position[0] + 1);
           
}

function isInBounds(targetPosition) {
  const newX = targetPosition[0];
  const newY = targetPosition[1];
  return newX >= 0 && newX < gameState.map[0].length
    && newY >= 0 && newY < gameState.map.length
}

function handleIteractions(targetTile) {
  // Handle object interactions
            switch (targetTile) {
                case resources.icons['coin']:
                    gameState.inventory.push("Coin");
                    break;
                case resources.icons['potion']:
                    gameState.inventory.push("Potion");
                    break;
                case resources.icons['chest']:
                    alert("You found a chest!");
                    break;
            }
}

export function getTarget() {
  // Tab to edit
}


function renderInventory() {
    const inventoryContainer = document.getElementById("inventory");
    inventoryContainer.innerHTML = gameState.inventory.map(item => `<div class="item">${item}</div>`).join("");
}


export function initializeGame() {
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

  // Initialize the game
  loadMap('map.txt');
}
// Only call initialize if we're in a browser environment
if (typeof document !== 'undefined') {
  initializeGame();
}