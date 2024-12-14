import { Name, DisplayChar, Position, MovePosition, Direction } from "../../property.js";

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
    it("then it renders the string", () => {
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

describe("Given MovePosition", () => {
  it("is defined", () => {
    expect(MovePosition).toBeDefined();
  });
  describe("when it is created", () => {
    let mover;
    beforeEach(function () {
      mover = new MovePosition();
    });
    it("then it provides a move method", () => {
      expect(mover.move).toBeDefined();
      expect(typeof mover.move).toBe('function');
    });
    let startPosition = [0, 0];
    it("then it must move the position", () => {
      expect(mover.move(Direction.UP, startPosition)).toEqual([0, -1]);
      expect(mover.move(Direction.DOWN, startPosition)).toEqual([0, 1]);
      expect(mover.move(Direction.LEFT, startPosition)).toEqual([-1, 0]);
      expect(mover.move(Direction.RIGHT, startPosition)).toEqual([1, 0]);

      startPosition = [10, 10];
      expect(mover.move(Direction.UP, startPosition)).toEqual([10, 9]);
      expect(mover.move(Direction.DOWN, startPosition)).toEqual([10, 11]);
      expect(mover.move(Direction.LEFT, startPosition)).toEqual([9, 10]);
      expect(mover.move(Direction.RIGHT, startPosition)).toEqual([11, 10]);
    });


    it("then it throws error for invalid direction", () => {
      expect(() => {
        mover.move("INVALID", startPosition);
      }).toThrow(new Error("Invalid direction"));
    });
  });
});