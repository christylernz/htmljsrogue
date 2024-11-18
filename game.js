import * as resources from './resources.js';
import * as entities from './entity.js';
import * as properties from './property.js';
import * as gameView from "./gameView.js"
import * as gameSystem from "./gameSystem.js"


export function InitializeGame() {
    gameView.createView();
    gameSystem.loadMap('map.txt');
}

InitializeGame();