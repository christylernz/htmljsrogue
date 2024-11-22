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
    game.movePlayer(player, direction);
    expect(player.move).toHaveBeenCalledWith(direction);
  });
  it("then the move must be within bounds", () => {
    player.position = [0,0];
    expect(game.movePlayer(player, direction)).toBe(false);
  });
});

