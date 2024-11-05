import { Name, DisplayChar, Position } from "../../property.js";

describe("Given Position", () => {
  it("is defined", () => {
    expect(Position).toBeDefined();
  });
  describe("when it is created", () => {
    let myPosition;
    it("then it only accepts a valid position", () => {
      expect(function () { myPosition = new Position("invalid"); }).toThrowError("Position must be an array");
    });
    beforeEach(function () {
      myPosition = new Position([0, 0]);
    });
    it("then it must have a valid position", () => {
      expect(myPosition.position).toEqual([0, 0]);
      myPosition.position = [1, 1];
      expect(myPosition.position).toEqual([1, 1]);
      expect(function () { myPosition.position = "invalid" }).toThrowError("Position must be an array");
    });
  });
});


describe("Given DisplayChar", () => {
  it("is defined", () => {
    expect(DisplayChar).toBeDefined();
  });
  describe("when it is created", () => {
    let display;
    it("then it accepts a string", () => {
      expect(function () { display = new DisplayChar("@"); }).not.toThrow();
    });
    beforeEach(function () {
      display = new DisplayChar("@");
    });
    it("then it must render the string", () => {
      expect(display.render()).toBe('@');
    });
  });
});

describe("Given Name", () => {
  it("is defined", () => {
    expect(Name).toBeDefined();
  });
  describe("when it is created", () => {
    let myName;
    it("then it accepts only a non empty string", () => {
      expect(function () { myName = new Name(2); }).toThrowError("Name must be a string");
      expect(function () { myName = new Name(""); }).toThrowError("Name is empty");
    });
    beforeEach(function () {
      myName = new Name("Test");
    });
    it("then it has a valid name", () => {
      expect(myName.name).toBe("Test");
      myName.name = "changed name";
      expect(myName.name).toBe("changed name");
      expect(function () { myName.name = 2; }).toThrowError("Name must be a string");
      expect(function () { myName.name = ""; }).toThrowError("Name is empty");
    });
  });
});