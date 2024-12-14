//test/spec/entityspec.js
import { Player } from "../../entity.js";

describe("Given Player", () => {
  it("is defined", () => {
    expect(Player).toBeDefined();
  });
  describe("when it is created with properties", () => {
    let validDisplay, validPosition, validMover, player;
    beforeEach(function () {
      //Position
      validPosition = {
        get position() { return [0, 0] },
        set position(newPosition) { }
      };
      spyOnProperty(validPosition, 'position', 'get').and.returnValue([0, 0]);
      spyOnProperty(validPosition, 'position', 'set');

      //Display Property 
      validDisplay = jasmine.createSpyObj("display", ["render"]);
      validDisplay.render.and.returnValue("@");

      //MovePosition Property 
      validMover = jasmine.createSpyObj("movePosition", ["move"]);
      validMover.move.and.returnValue([0, -1]);

      player = new Player(validPosition, validDisplay, validMover);
    });

    it("then it injects properties", () => {
      expect(player.position).toBeDefined();  // Ensures getter and setter from position is available
      expect(player.render).toBeDefined();  // Ensures 'render' from display is available
      expect(player.move).toBeDefined();

    });

    it("should delegate calls to the injected position and display methods", () => {
      player.render();
      expect(validDisplay.render).toHaveBeenCalled();  // Confirm render call is delegated

      player.position = [1, 1];
      expect(Object.getOwnPropertyDescriptor(validPosition, 'position').set).toHaveBeenCalledWith([1, 1]);
    });

    it("then it should only accept a valid position and dispaly", () => {
      const invalidPosition = {
        set position(newPos) { }
      }; // No setter
      expect(() => {
        player = new Player(invalidPosition, validDisplay);
      }).toThrow(new Error("Position must implement getter and setter"));

      const invalidDisplay = {}; // No render method 
      expect(() => {
        player = new Player(validPosition, invalidDisplay);
      }).toThrow(new Error("Display must implement render method"));

      const invalidMover = {};
      expect(() => {
        player = new Player(validPosition, validDisplay, invalidMover);
      }).toThrow(new Error("MovePosition must implement move method"));
    });
    let direction = 'UP'
    it("then it delegates movement correctly", () => {
      player.move(direction);
      expect(validMover.move).toHaveBeenCalledWith(direction, [0, 0]);
      expect(Object.getOwnPropertyDescriptor(validPosition, 'position').set).toHaveBeenCalledWith([0, -1])
    });
  });
});