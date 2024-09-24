import * as testclass from '../../testclass.js';
import * as testfunction from '../../testfunction.js';
import * as testmodule from '../../testmodule.js';



describe("Object Experiment", () => {
  
  function runGameObjectTest(name, gameObject) {
    it("then it has a valid position", () => {
      expect(gameObject.position).toEqual([0, 0]);
      gameObject.position = [1, 1];
      expect(gameObject.position).toEqual([1, 1]);
      expect(() => gameObject.position = "test").toThrowError("Position must be an array");
      console.log(name);
      console.log(gameObject);
    });
    it("then it renders nothing", () => {
      expect(gameObject.render()).nothing();
    });
  }
  
  function runSimpleObjectTest(name, simpleObject) {
    it("then it has a valid position", () => {
      expect(simpleObject.position).toEqual([0, 0]);
      simpleObject.position = [1, 1];
      expect(simpleObject.position).toEqual([1, 1]);
      expect(() => simpleObject.position = "test").toThrowError("Position must be an array");
      console.log(name);
      console.log(simpleObject);
    });
    it("then it renders @", () => {
      expect(simpleObject.render()).toBe("@");
    });
  }
  let name = "class";
  describe("Game Object class", () => {
    describe("when created", () => {
      let gameObject = new testclass.GameObject([0, 0]);
      runGameObjectTest(name, gameObject);
    });
  });
  describe("Simple Object subclass", () => {
    describe("when created", () => {
      let simpleObject = new testclass.SimpleObject([0, 0]);
      runSimpleObjectTest(name, simpleObject);
    });
  });
  name = "function";
  describe("Game Object function", () => {
    describe("when created", () => {
      let gameObject = new testfunction.GameObject([0, 0]);
      runGameObjectTest(name, gameObject);
    });
  });
  describe("Simple Object function", () => {
    describe("when created", () => {
      let simpleObject = new testfunction.SimpleObject([0, 0]);
      runSimpleObjectTest(name, simpleObject);
    });
  });
  name = "module";
  describe("Game Object module", () => {
    describe("when created", () => {
      let gameObject = new testmodule.GameObject([0, 0]);
      runGameObjectTest(name, gameObject);
    });
  });
  describe("Simple Object module", () => {
    describe("when created", () => {
      let simpleObject = new testmodule.SimpleObject([0, 0]);
      runSimpleObjectTest(name, simpleObject);
    });
  });
});