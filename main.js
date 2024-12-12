import * as gameView from "./gameview.js"
import * as gameSystem from "./gamesystem.js"
import * as game from './game.js';

export function InitializeGame() {
  let view = gameView.createView();
  let system = gameSystem.loadMap('map.txt');
  let mygame = new game.Game(view, system);
}

InitializeGame();