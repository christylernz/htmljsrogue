//test/spec/resourcesspec.js
import { GameObject } from "../../resources.js";

describe("Given GameObject", () => {
  it("is defined", () => {
    expect(GameObject).toBeDefined();
  });
  describe("when created", () => {
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