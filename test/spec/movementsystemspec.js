//test/spec/movementsystemspec.js
import * as movement from '../../systems/movementsystem.js';

describe("Given a player and direction to move", () => {
  let movementSystem, player, direction, validPosition, validMover, map, bounds;
  
  beforeEach(function() {
    movementSystem = new movement.MovementSystem();
    map = [
      "@",
      "."
    ];
    bounds = [0, 0, map[0].length, map.length];
    direction = 'DOWN';
    validMover = jasmine.createSpyObj("movePlayer", ["move"]);
    validMover.move.and.returnValue([0, -1]);
    player = {
      position: [0, 0],
      ...validMover
    };
  });
  it("then player position is updated", () => {
    movementSystem.movePlayer(player, direction, bounds, map);
    expect(player.move).toHaveBeenCalledWith(direction);
  });
  it("then the move must be within bounds", () => {
    bounds = [0, 0, 1, 1];
    expect(movementSystem.movePlayer(player, 'UP', bounds, map)).toBe(false);
    expect(movementSystem.movePlayer(player, 'DOWN', bounds, map)).toBe(false);
    expect(movementSystem.movePlayer(player, 'LEFT', bounds, map)).toBe(false);
    expect(movementSystem.movePlayer(player, 'RIGHT', bounds, map)).toBe(false);
  });
  it("then the move must not create a collision", () => {
    map = [
      "@",
      "#"
    ];
    expect(movementSystem.movePlayer(player, direction, bounds, map)).toBe(false);
  });
  it("then the map must be updated to show change in location", () => {
    movementSystem.movePlayer(player, direction, bounds, map);
    expect(map[0, 0]).toBe('.');
    expect(map[0, 1]).toBe('@');
  });
  
  
});