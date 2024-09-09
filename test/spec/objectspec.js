import * as testclass from '../../testclass.js';
import * as testfunction from '../../testfunction.js';
import * as testmodule from '../../testmodule.js';


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
  describe("Simple Object subclass", () => {
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
  describe("Game Object function", () => {
    it("is defined", () => {
      expect(testfunction.GameObject).toBeDefined();
    });
    describe("when created", () => {
      let gameObject;
      beforeEach(function() {
        gameObject = new testfunction.GameObject([0, 0]);
      });
      it("then it has a position", () => {
        expect(gameObject.position).toEqual([0, 0]);
      });
      it("then it renders nothing", () => {
        expect(gameObject.render()).nothing();
      });
    });
  });
  describe("Simple Object function", () => {
    it("is defined", () => {
      expect(testfunction.SimpleObject).toBeDefined();
    });
    describe("when created", () => {
      let simpleObject;
      beforeEach(function() {
        simpleObject = new testfunction.SimpleObject([0, 0]);
      });
      it("then it has a position", () => {
        expect(simpleObject.position).toEqual([0, 0]);
      });
      it("then it renders nothing", () => {
        expect(simpleObject.render()).toBe("@");
      });
    });
  });
  describe("Game Object module", () => {
    it("is defined", () => {
      expect(testmodule.GameObject).toBeDefined();
    });
    describe("when created", () => {
      let gameObject;
      beforeEach(function() {
        gameObject = testmodule.GameObject([0, 0]);
      });
      it("then it has a position", () => {
        expect(gameObject.position).toEqual([0, 0]);
      });
      it("then it renders nothing", () => {
        expect(gameObject.render()).nothing();
      });
    });
  });
  describe("Simple Object module", () => {
    it("is defined", () => {
      expect(testmodule.SimpleObject).toBeDefined();
    });
    describe("when created", () => {
      let simpleObject;
      beforeEach(function() {
        simpleObject = testmodule.SimpleObject([0, 0]);
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