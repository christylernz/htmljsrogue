// Game state
const gameState = {
    map: [],
    player: { x: 0, y: 0 },
    viewWidth: 10,
    viewHeight: 10,
    inventory: []
};

const icons = {
  player: '@',
  coin: '$',
  potion: '*',
  chest: '!',
  empty: ' ',
  wall: '#',
  floor: '.', 
};

// Load map from file
async function loadMap(filename) {
    try {
        const response = await fetch(filename);
        const mapText = await response.text();
        gameState.map = mapText.trim().split('\n');
        
        // Find player starting position
        for (let y = 0; y < gameState.map.length; y++) {
            const x = gameState.map[y].indexOf(icons['player']);
            if (x !== -1) {
                gameState.player = { x, y };
                break;
            }
        }
        
        validateMap();
        renderGame();
        renderInventory();
    } catch (error) {
        console.error('Error loading map:', error);
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
            throw new Error(`Row ${y} has inconsistent length`);
        }

        for (let x = 0; x < mapWidth; x++) {
            const tile = gameState.map[y][x];
            if (!Object.values(icons) .includes(tile)) {
                throw new Error(`Invalid character "${tile}" at position (${x}, ${y})`);
            }
            if (tile === icons['player']) {
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
            const mapX = gameState.player.x + x - Math.floor(gameState.viewWidth / 2);
            const mapY = gameState.player.y + y - Math.floor(gameState.viewHeight / 2);
            
            if (mapX >= 0 && mapX < gameState.map[0].length && mapY >= 0 && mapY < gameState.map.length) {
                visibleMap += gameState.map[mapY][mapX];
            } else {
                visibleMap += icons['empty'];
            }
        }
        visibleMap += "<br/>";
    }
    
    gameContainer.innerHTML = visibleMap;
}

// Handle player movement
function movePlayer(dx, dy) {
    const newX = gameState.player.x + dx;
    const newY = gameState.player.y + dy;
    
    if (newX >= 0 && newX < gameState.map[0].length && newY >= 0 && newY < gameState.map.length) {
        const targetTile = gameState.map[newY][newX];
        if (targetTile !== icons['wall']) {
            gameState.map[gameState.player.y] = gameState.map[gameState.player.y].substring(0, gameState.player.x) + icons['floor'] + 
                                                gameState.map[gameState.player.y].substring(gameState.player.x + 1);
            gameState.player.x = newX;
            gameState.player.y = newY;
            
            // Handle object interactions
            switch(targetTile) {
                case icons['coin']:
                    gameState.inventory.push("Coin");
                    break;
                case icons['potion']:
                    gameState.inventory.push("Potion");
                    break;
                case icons['chest']:
                    alert("You found a chest!");
                    break;
            }
            
            gameState.map[newY] = gameState.map[newY].substring(0, newX) + icons['player'] + gameState.map[newY].substring(newX + 1);
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