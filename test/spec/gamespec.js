//test/spec/gamespec.js
import * as game from "../../game.js";

describe("Given a game", () => {
  it("is defined", () => {
    expect(game).toBeDefined();
  });
  describe("when it is created with a view and system", () => {
    let game, view, system;
    beforeEach(function () {
      view = jasmine.createSpyObj("view", ["update"]);
    });
    it("then it initialises a new view and system", () => {
      expect(view.update).toHaveBeenCalled();
    });
  });
});