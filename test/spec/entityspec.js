//test/spec/entityspec.js
import { Player } from "../../entity.js";
import { DisplayChar, Position} from "../../property.js";

describe("Given Player", () => {
  it("is defined", () => {
    expect(Player).toBeDefined();
  });
  describe("when it is created with display and position", () => {
    let display, position, player;
    beforeEach(function() {
      position = {
        get position() { return [0, 0] },
        set position(newPosition) { }
      };
      spyOnProperty(position, 'position', 'get').and.returnValue([0, 0]);
      spyOnProperty(position, 'position', 'set');
      
      display = jasmine.createSpyObj("display", ["render"]);
      display.render.and.returnValue("@");

      player = new Player(position, display);
    });
    
    it("then it injects properties from position and display", () => {
      expect(player.position).toBeDefined();  // Ensures getter and setter from position is available
      expect(player.render).toBeDefined();  // Ensures 'render' from display is available
    });
    
    it("should delegate calls to the injected position and display methods", () => {
      player.render();
      expect(display.render).toHaveBeenCalled();  // Confirm render call is delegated

      player.set([1, 1]);
      expect(Object.getOwnPropertyDescriptor(validPosition, 'position').set).toHaveBeenCalledWith([1, 1]);  // Confirm set is delegated
    });
  });
    it("then it should get only accept a valid position and dispaly", () => {
      const invalidPosition = jasmine.createSpyObj("position", ["get"]); // No setter
      expect(() => {
        player = new Player(invalidPosition, display);
      }).toThrow(new Error("Position must implement get and set methods"));
      
      const invalidDisplay = {}; // No render method 
      expect(() => {
        player = new Player(position, invalidDisplay);
      }).toThrow(new Error("Display must implement render method"));
  });
});