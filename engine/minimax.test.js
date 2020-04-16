import { getAllPossibleGrids, getPathForGrids, getAdvice } from "./minimax";
import { FIRST_PLAYER_VALUE } from "./player";

describe("Minimax implementation", () => {
  it("should get all grids possible for a grid configuration", () => {
    const grid = [1, 1, 0, 2, 2, 2, 1, 0, 0];

    const allPossibleGrids = getAllPossibleGrids(grid, FIRST_PLAYER_VALUE);

    const expectedGrids = [
      [1, 1, 1, 2, 2, 2, 1, 0, 0],
      [1, 1, 0, 2, 2, 2, 1, 1, 0],
      [1, 1, 0, 2, 2, 2, 1, 0, 1],
    ];

    expect(allPossibleGrids).toEqual(expectedGrids);
  });

  it("should get all scores for a grid configuration", () => {
    const grids = [
      [1, 1, 1, 2, 2, 2, 1, 0, 0],
      [1, 1, 0, 2, 2, 2, 1, 1, 0],
      [1, 1, 0, 2, 2, 2, 1, 0, 1],
    ];

    const scores = getPathForGrids(grids, FIRST_PLAYER_VALUE);
    const expectedScores = [
      { 0: ["0", "1", "2", "3", 10] },
      { 1: undefined },
      { 2: undefined },
    ];

    expect(scores).toEqual(expectedScores);
  });

  it("should returns the next best move as grid", () => {
    const grid = [1, 1, 0, 2, 2, 2, 1, 0, 0];

    const advice = getAdvice(grid, FIRST_PLAYER_VALUE);
    const expectedAdvice = [1, 1, 1, 2, 2, 2, 1, 0, 0];

    expect(advice).toEqual(expectedAdvice);
  });
});
