//test/spec/resourcesspec.js
import { GameObject } from "../../resources.js";
/* describe("Given the decision tree contains no animals or distinguishing questions.", function(){
  var someString;
  beforeEach(function() {
      someString = "foo";
  });
  describe("When the user starts a game.", function(){
      beforeEach(function() {
          someString += "bar";
      });
      it("Then the user should be required to create a new animal and distinguishing question.", function(){
          expect(someString).toBe("foobar");
      });
  });
}); */


describe("Given GameObject", () => {
  it("is defined", () => {
    expect(GameObject).toBeDefined();
  });
  describe("when created", () => {
    let gameObject;
    beforeEach(function () {
      gameObject = new GameObject("Test", [0, 0]);
    });
    it("then it has a valid name", () => {
      expect(gameObject.name).toBe("Test");
      gameObject.name = "Test Object";
      expect(gameObject.name).toBe("Test Object");
      expect(function () { gameObject.name = ""; }).toThrowError("Name is empty");

    });
    it("then it has a valid position", () => {
      expect(gameObject.position).toBe([0, 0]);
    });

  })
})