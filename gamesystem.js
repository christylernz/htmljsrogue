import * as resources from './resources.js';
import * as entities from './entity.js';
import * as properties from './property.js';


export var GameSystem = (function() {
  // Load map from file
  const loadMap = async function (filename) {
    try {
      const filename = 'map.txt';
      const response = await fetch(filename);
      const mapText = await response.text();
      gameStatemap = mapText.trim().split('\n');
  
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
    } catch (error) {
      console.error('Error loading map:', error.message + "\n" + error.stack);
    }
  };
  let map;
  return function () {
    map = '';
    return {
      loadMap, 
      map
    };
  }
})();

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

function getObjectAt(position, map) {
    return map[position[1]][position[0]];
}

function updateMapAt(resource, position, map) {
    map[position[1]] = map[position[1]].substring(0, position[0])
        + resource
        + map[position[1]].substring(position[0] + 1);
}

// Handle player movement
export function movePlayer(player, direction, bounds, map) {
    let targetPosition = getTarget(player.position, direction);
    let validMove = false;

    if (isInBounds(targetPosition, bounds)) {
        const targetTile = getObjectAt(targetPosition, map);
        if (targetTile !== resources.icons['wall']) {
            validMove = true;
            updateMapAt(resources.icons['floor'], player.position, map);
            player.move(direction);
            updateMapAt(resources.icons['player'], targetPosition, map);
        }

    }
    return validMove;
}

const DIRECTIONS = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0]
};

function isInBounds(targetPosition, bounds) {

    let x, y, width, height;
    x = bounds[0];
    y = bounds[1];
    width = bounds[2];
    height = bounds[3];

    if (
        targetPosition[0] < x
        || targetPosition[1] < y
        || targetPosition[0] >= width
        || targetPosition[1] >= height
    ) {
        return false;
    }
    return true;
}

function getTarget(position, direction) {
    const directionVector = DIRECTIONS[direction];
    return position.map((coord, index) => coord + directionVector[index]);
}