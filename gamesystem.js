export function gameState() {
    const state = {
        map: [],
        player: null,
        viewWidth: 10,
        viewHeight: 10,
        inventory: []
    };
    return state;
}


// Load map from file
export async function loadMap(filename) {
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
export function validateMap() {
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

// Handle player movement
export function movePlayer(player, direction) {
   player.move(direction);
   let validMove = isMoveValid(player, direction);
   return validMove;
    /*const newX = player.position[0] + dx;
    const newY = player.position[1] + dy;

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

            gameState.map[newY] = gameState.map[newY].substring(0, newX) + gameState.player.render() + gameState.map[newY].substring(newX + 1);
            renderGame();
            renderInventory();
        }
    }*/
}


function isMoveValid(player, direction) {
  let targetPosition = player.position;
  if (direction == 'UP') {
    targetPosition[1]--;
  }
  if (targetPosition[1] < 0) {
    return false;
  }
  return true;
}
