import * as testclass from '../../testclass.js';

describe("Object Experiment", () => {
  describe("Game Object class", () => {
    it("is defined", () => {
      expect(testclass.GameObject).toBeDefined();
    });
    describe("when created", () => {
      let gameObject;
      beforeEach(function () {
        gameObject = new testclass.GameObject([0, 0]);
      });
      it("then it has a position", () => {
        expect(gameObject.position).toEqual([0,0]);
      });
      it("then it renders nothing", () => {
        expect(gameObject.render()).nothing();
      });
    });
  });
  describe("Simple Object subtype", () => {
     it("is defined", () => {
       expect(testclass.SimpleObject).toBeDefined();
     });
     describe("when created", () => {
       let simpleObject;
       beforeEach(function() {
         simpleObject = new testclass.SimpleObject([0, 0]);
       });
       it("then it has a position", () => {
         expect(simpleObject.position).toEqual([0, 0]);
       });
       it("then it renders nothing", () => {
         expect(simpleObject.render()).toBe("@");
       });
     });
  });
});