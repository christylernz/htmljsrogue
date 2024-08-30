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


describe("GameObject",() =>{
  it("is defined", () => {
    expect(GameObject).toBeDefined();
  });
})