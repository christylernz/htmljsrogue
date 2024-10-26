//test/spec/entityspec.js
import { Player } from "../../entity.js";
import { Name, DisplayChar, Position} from "../../property.js";

describe("Given Player", () => {
   it("is defined", () => {
     expect(Player).toBeDefined();
   });
   describe("when it is created", () => {
     let render = new DisplayChar("@");
     let position = new Position([0, 0]);
     let player;
     beforeEach(function() {
       player = new Player(position, render);
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