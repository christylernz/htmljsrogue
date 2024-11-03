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
      position = jasmine.createSpyObj("position", ["get", "set"]); 
      display = jasmine.createSpyObj("display", ["render"]);
      
      position.get.and.returnValue([0, 0]);
      display.render.and.returnValue("@");

      player = new Player(position, display);
    });
    
    it("then it injects properties from position and display", () => {
      expect(player.get).toBeDefined();  // Ensures 'get' from position is available
      expect(player.set).toBeDefined();  // Ensures 'set' from position is available
      expect(player.render).toBeDefined();  // Ensures 'render' from display is available
    });
    
    it("should delegate calls to the injected position and display methods", () => {
      player.render();
      expect(display.render).toHaveBeenCalled();  // Confirm render call is delegated

      player.set([1, 1]);
      expect(position.set).toHaveBeenCalledWith([1, 1]);  // Confirm set is delegated
    });
  
       /*  it("then it must have a valid position", () => {
         expect(player.position).toEqual([0, 0]);
         player.position = [1, 1];
         expect(player.position).toEqual([1, 1]);
         expect(function() { player.position = "invalid" }).toThrowError("Position must be an array");
       });
       it("then it must render the string", () => {
         expect(player.render()).toBe('@');
       });  */
  });
  describe("when it is created without display or position", () => {
    let position, display, player;
    position = jasmine.createSpyObj("position", ["get", "set"]); 
    display = jasmine.createSpyObj("display", ["render"]);
      
    position.get.and.returnValue([0, 0]);
    display.render.and.returnValue("@");

    // player = new Player(position, display);
    it("then it should throw error ", () => {
      expect(() => {
        player = new Player(undefined, display);
      }).toThrowError(TypeError, "Cannot convert undefined or null to object");
      expect(() => {
        player = new Player(position, undefined);
      }).toThrowError(TypeError, "Cannot convert undefined or null to object");
    });
  });
});