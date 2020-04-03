var dijkstra = require("../node_modules/dijkstrajs/dijkstra.js");
var find_path = dijkstra.find_path;

import { isWon } from "./game.js";
import { FIRST_PLAYER_VALUE } from "./player.js";

describe("isWon function", function() {
  it("should determine is a game is won", function() {
    const grid = [1, 1, 1, 0, 0, 0, 0, 0, 0];
    const won = isWon(grid, FIRST_PLAYER_VALUE);
    const expectedIsWon = true;

    expect(won).toEqual(expectedIsWon);
  });

  it("should determine is a game is not won", function() {
    const grid = [1, 1, 0, 0, 0, 0, 0, 0, 0];
    const won = isWon(grid, FIRST_PLAYER_VALUE);
    const expectedIsWon = false;

    expect(won).toEqual(expectedIsWon);
  });
});
