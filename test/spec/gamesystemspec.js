//test/spec/gamespec.js
import * as game from "../../gamesystem.js";

describe("Given a game system", () => {
    it("then move player is defined", () => {
        expect(game.movePlayer).toBeDefined();
    });
});

describe("Given a player and direction to move", () => {
  let player, direction, validPosition, validMover;
  
  beforeEach(function () {
    direction = 'UP';
    validMover = jasmine.createSpyObj("movePlayer", ["move"]);
    validMover.move.and.returnValue([0, -1]);
    player = {
      position: [0,0], 
      ...validMover
    };
  });
  it("then player position is updated", () => {
    game.movePlayer(player, direction, [0,0,10,10]);
    expect(player.move).toHaveBeenCalledWith(direction);
  });
  it("then the move must be within bounds", () => {
    let bounds = [0,0,1,1];
    expect(game.movePlayer(player, 'UP', bounds)).toBe(false);
    expect(game.movePlayer(player, 'DOWN', bounds)).toBe(false);
    expect(game.movePlayer(player, 'LEFT', bounds)).toBe(false);
    expect(game.movePlayer(player, 'RIGHT', bounds)).toBe(false);
    
  });
});

