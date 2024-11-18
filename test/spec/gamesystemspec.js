//test/spec/gamespec.js
import * as game from "../../gamesystem.js";

describe("Given a game system", () => {
    it("then move player is defined", () => {
        expect(game.movePlayer).toBeDefined();
    });
});

describe("Given a player and move direction", () => {
    let player, direction;
    direction = 'UP';

    validMover = jasmine.createSpyObj("movePosition", ["move"]);
    validMover.move.and.returnValue([0, -1]);
    player = {
        validMover
    };

    it("then player is position is updated", () => {
        game.movePlayer(player, direction);
        expect(validMover).toHaveBeenCalled();
    });
});