//test/spec/gamespec.js
import * as game from "../../game.js";

describe("Given a game", () => {
  it("is defined", () => {
    expect(game).toBeDefined();
  });
  describe("when it is created with a view and system", () => {
    let validGame, validView, validSystem, map, mapGetterSpy;
    beforeEach(function () {
      validView = jasmine.createSpyObj("validView", ["renderMap", "renderInventory"]);
      validSystem = jasmine.createSpyObj("validSystem", ["loadMap"]);
      map = [
        "@",
        "#"
      ];
      mapGetterSpy = jasmine.createSpy('mapGetter').and.returnValue(map);

      Object.defineProperty(validSystem, 'map', {
        get: mapGetterSpy
      });
    });
    it("then it initialises a new view and system", () => {
      validGame = new game.Game(validView, validSystem);
      expect(validSystem.loadMap).toHaveBeenCalled();
      expect(mapGetterSpy).toHaveBeenCalled();
      expect(validView.renderMap).toHaveBeenCalledWith(map);
      expect(validView.renderInventory).toHaveBeenCalled();
    });
  });
});