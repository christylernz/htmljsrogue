import * as resources from "./resources.js";
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
                gameState.player = new resources.GameObject("player", [x, y], resources.icons['player']);
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
function movePlayer(dx, dy) {
    const newX = gameState.player.position[0] + dx;
    const newY = gameState.player.position[1] + dy;

    if (newX >= 0 && newX < gameState.map[0].length && newY >= 0 && newY < gameState.map.length) {
        const targetTile = gameState.map[newY][newX];
        if (targetTile !== resources.icons['wall']) {
            gameState.map[gameState.player.position[1]] = gameState.map[gameState.player.position[1]].substring(0, gameState.player.position[0]) + resources.icons['floor'] +
                gameState.map[gameState.player.position[1]].substring(gameState.player.position[0] + 1);
            gameState.player.position = [newX, newY];

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

            gameState.map[newY] = gameState.map[newY].substring(0, newX) + resources.icons['player'] + gameState.map[newY].substring(newX + 1);
            renderGame();
            renderInventory();
        }
    }
}

function renderInventory() {
    const inventoryContainer = document.getElementById("inventory");
    inventoryContainer.innerHTML = gameState.inventory.map(item => `<div class="item">${item}</div>`).join("");
}

// Set up event listeners for player movement
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp": movePlayer(0, -1); break;
        case "ArrowDown": movePlayer(0, 1); break;
        case "ArrowLeft": movePlayer(-1, 0); break;
        case "ArrowRight": movePlayer(1, 0); break;
    }
});

// Set up event listeners for movement buttons
document.getElementById("up").addEventListener("click", () => movePlayer(0, -1));
document.getElementById("down").addEventListener("click", () => movePlayer(0, 1));
document.getElementById("left").addEventListener("click", () => movePlayer(-1, 0));
document.getElementById("right").addEventListener("click", () => movePlayer(1, 0));

// Initialize the game
loadMap('map.txt');