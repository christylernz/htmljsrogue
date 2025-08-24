import * as resources from './resources.js';
import * as entities from './entity.js';
import * as properties from './property.js';
import * as debug from './debug.js';

export var GameSystem = (function() {
    const myDebug = new debug.Debug();
    const state = {
        map: [],
        player: null,
        viewWidth: 10,
        viewHeight: 10,
        inventory: []
    };
    // Load map from file
    const loadMap = async function (filename) {
        console.log('Loading map from', filename);
        try {
            const filename = 'map.txt';
            const response = await fetch(filename);
            const mapText = await response.text();
            state.map = mapText.trim().split('\n');
        
            // Find player starting position
            for (let y = 0; y < state.map.length; y++) {
                const x = state.map[y].indexOf(resources.icons['player']);
                if (x !== -1) {
                state.player = new entities.Player(
                    new properties.Position([x, y]),
                    new properties.DisplayChar(resources.icons['player']),
                    new properties.MovePosition()
                );
                break;
                }
            }
        
            validateMap(state.map);
            myDebug.init(state);
        } catch (error) {
            console.error('Error loading map:', error.message + "\n" + error.stack);
        }
    };
    const getVisibleMap = function () {
        let calculateMapVisible = "";
        if (!state.player) {
            console.error('Player not found in the map');
            return 'no player';
        }

        for (let y = 0; y < state.viewHeight; y++) {
            for (let x = 0; x < state.viewWidth; x++) {
                const mapX = state.player.position[0] + x - Math.floor(state.viewWidth / 2);
                const mapY = state.player.position[1] + y - Math.floor(state.viewHeight / 2);

                if (mapX >= 0 && mapX < state.map[0].length && mapY >= 0 && mapY < state.map.length) {
                    calculateMapVisible += state.map[mapY][mapX];
                } else {
                    calculateMapVisible += resources.icons['empty'];
                }
            }
            calculateMapVisible += "<br/>";
        }
        return calculateMapVisible;
    };

    const handlePlayerInput = function (direction){
        if (!direction) {
        console.log('No direction provided');
        return ;
        }
        movePlayer(state.player, direction, [0, 0, state.map[0].length, state.map.length], state.map);
    };
    let map,inventory;
    return function () {
        map = state.map;
        inventory = state.inventory;
        return {
            loadMap, 
            map,
            inventory,
            get visibleMap() {
                return getVisibleMap();
            },
            handlePlayerInput
        };
    }
})();

// Validate the loaded map
export function validateMap(map) {
    if (map.length === 0) {
        throw new Error('Map is empty');
    }

    const mapWidth = map[0].length;
    let playerCount = 0;

    for (let y = 0; y < map.length; y++) {
        if (map[y].length !== mapWidth) {
            throw new Error(`Row ${y} has inconsistent length: want ${mapWidth} got ${map[y].length}`);
        }

        for (let x = 0; x < mapWidth; x++) {
            const tile = map[y][x];
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

    console.log('Moving player ', direction);
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