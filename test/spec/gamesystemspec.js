//test/spec/gamesystemspec.js
import * as game from "../../gamesystem.js";

describe("Given a game system", () => {
  it("then validate map is defined", () => {
    expect(game.validateMap).toBeDefined();
  });
});
describe("when it is created", () => {
  let system;
  beforeEach(function () {
    system = new game.GameSystem();
  });
  it("then it can load a map  ", () => {
    expect(system.loadMap).toBeDefined();
  });
  it("then it has a map", () => {
    expect(system.map).toBeDefined();
  });
});