import * as resources from './resources.js';
import * as entities from './entity.js';
import * as properties from './property.js';
import * as debug from './debug.js';

export var MovementSystem = (function() {
    // move player object
    const movePlayer = function movePlayer(player, direction, bounds, map) {
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
    return function () {
        return {
            movePlayer
        };
    }
})();


function getObjectAt(position, map) {
    return map[position[1]][position[0]];
}

function updateMapAt(resource, position, map) {
    map[position[1]] = map[position[1]].substring(0, position[0])
        + resource
        + map[position[1]].substring(position[0] + 1);
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