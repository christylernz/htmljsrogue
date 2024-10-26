//test/spec/resourcesspec.js
import { PlayerEntity, NameProperty, RenderProperty, PositionProperty} from "../../resources.js";

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

describe("Given NameProperty", () => {
  it("is defined", () => {
    expect(NameProperty).toBeDefined();
  });
  describe("when it is created", () => {
    let myName;
    it("then it accepts only a non empty string", () => {
      expect(function() { myName = new NameProperty(2); }).toThrowError("Name must be a string");
      expect(function() {  myName = new NameProperty(""); }).toThrowError("Name is empty");
    });
    beforeEach(function () {
      myName = new NameProperty("Test");
    });
    it("then it has a valid name", () => {
      expect(myName.name).toBe("Test");
      myName.name = "changed name";
      expect(myName.name).toBe("changed name");
      expect(function() { myName.name = 2; }).toThrowError("Name must be a string");
      expect(function() { myName.name = ""; }).toThrowError("Name is empty");
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