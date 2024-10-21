//test/spec/resourcesspec.js
import { PlayerEntity, GameObject, RenderProperty, PositionProperty} from "../../resources.js";

describe("Given GameObject", () => {
  it("is defined", () => {
    expect(GameObject).toBeDefined();
  });
  describe("when it is created", () => {
    let gameObject;
    beforeEach(function () {
      gameObject = new GameObject("Test", [0, 0], '@');
    });
    it("then it has a valid name", () => {
      expect(gameObject.name).toBe("Test");
      gameObject.name = "Test Object";
      expect(gameObject.name).toBe("Test Object");
      expect(function() { gameObject.name = ""; }).toThrowError("Name is empty");

    });
    it("then it has a valid position", () => {
      expect(gameObject.position).toEqual([0, 0]);
      gameObject.position = [1,1];
      expect(gameObject.position).toEqual([1,1]);
      expect(function() { gameObject.position = "test"}).toThrowError("Position must be an array");
    });
    it("then it has a symbol", () => {
      expect(gameObject.symbol).toBe('@');
    });
    
    it("then it renders the symbol", () => {
      expect(gameObject.render()).toBe('@');
    });
    
  })
})
describe("Given PositionProperty", () => {
  it("is defined", () => {
    expect(PositionProperty).toBeDefined();
  });
    describe("when it is created", () => {
      let myPosition;
      it("then it only accepts a valid position", () => {
        expect(function() { myPosition = new PositionProperty("invalid");}).toThrowError("Position must be an array");
      });
      beforeEach(function() {
        myPosition = new PositionProperty([0, 0]);
      });
      it("then it must have a valid position", () => {
        expect(myPosition.position).toEqual([0, 0]);
        myPosition.position = [1,1];
        expect(myPosition.position).toEqual([1,1]);
        expect(function() { myPosition.position = "invalid"}).toThrowError("Position must be an array");
      });
    });      
});
describe("Given RenderProperty", () => {
  it("is defined", () => {
    expect(RenderProperty).toBeDefined();
  });
  describe("when it is created", () => {
    let renderFunction;
    it("then it accepts a string", () => {
      expect(function() { renderFunction = new RenderProperty("@"); }).not.toThrow();
    });
    beforeEach(function() {
      renderFunction = new RenderProperty("@");
    });
    it("then it must render the string", () => {
      expect(renderFunction.render()).toBe('@');
    });
  });
});

describe("Given PlayerEntity", () => {
   it("is defined", () => {
     expect(PlayerEntity).toBeDefined();
   });
   describe("when it is created", () => {
     let render = new RenderProperty("@");
     let position = new PositionProperty([0, 0]);
     let player;
     beforeEach(function() {
       player = new PlayerEntity(position, render);
     });
     it("then it must have a valid position", () => {
       expect(player.position).toEqual([0, 0]);
       player.position = [1, 1];
       expect(player.position).toEqual([1, 1]);
       expect(function() { player.position = "invalid" }).toThrowError("Position must be an array");
     });
     it("then it must render the string", () => {
       expect(player.render()).toBe('@');
     });
   });
});