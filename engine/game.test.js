var dijkstra = require("../node_modules/dijkstrajs/dijkstra.js");
var find_path = dijkstra.find_path;

import { isWon, getWinningPath } from "./game.js";
import { FIRST_PLAYER_VALUE } from "./player.js";

describe("isWon function", function() {
  it("should determine is a game is won", function() {
    const grid = [1, 1, 1, 0, 0, 0, 0, 0, 0];
    const winningPath = getWinningPath(grid, FIRST_PLAYER_VALUE);
    const expectedIsWon = ["0", "1", "2", "3", 10];

    expect(winningPath).toEqual(expectedIsWon);
  });

  it("should determine is a game is not won", function() {
    const grid = [1, 1, 0, 0, 0, 0, 0, 0, 0];
    const winningPath = getWinningPath(grid, FIRST_PLAYER_VALUE);
    const expectedWinningPath = undefined;

    expect(winningPath).toEqual(expectedWinningPath);
  });
});
