import {
  getAllPossibleGrids,
  getWinningPathForGrids,
  getAdvice,
  getAdviceIndex,
} from "./minimax";
import {
  FIRST_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
  ADVISE_VALUE,
} from "./player";

describe("Minimax implementation", () => {
  it("should get all grids possible for a grid configuration", () => {
    const grid = [1, 1, 0, 2, 2, 2, 1, 0, 0];

    const allPossibleGrids = getAllPossibleGrids(grid, FIRST_PLAYER_VALUE);

    const expectedGrids = [
      { grid: [1, 1, 1, 2, 2, 2, 1, 0, 0], index: 2 },
      { grid: [1, 1, 0, 2, 2, 2, 1, 1, 0], index: 7 },
      { grid: [1, 1, 0, 2, 2, 2, 1, 0, 1], index: 8 },
    ];

    expect(allPossibleGrids).toEqual(expectedGrids);
  });

  it("should get all scores for a grid configuration", () => {
    const grids = [
      { grid: [1, 1, 1, 2, 2, 2, 1, 0, 0], index: 2 },
      { grid: [1, 1, 0, 2, 2, 2, 1, 1, 0], index: 7 },
      { grid: [1, 1, 0, 2, 2, 2, 1, 0, 1], index: 8 },
    ];

    const scores = getWinningPathForGrids(grids, FIRST_PLAYER_VALUE);
    const expectedScores = [
      {
        index: 2,
        path: ["0", "1", "2", "3", 10],
        grid: [1, 1, 1, 2, 2, 2, 1, 0, 0],
      },
      {
        index: 7,
        path: undefined,
        grid: [1, 1, 0, 2, 2, 2, 1, 1, 0],
      },
      {
        index: 8,
        path: undefined,
        grid: [1, 1, 0, 2, 2, 2, 1, 0, 1],
      },
    ];

    expect(scores).toEqual(expectedScores);
  });

  it("should returns the next best move as grid (maximized)", () => {
    const grid = [1, 1, 0, 2, 2, 2, 1, 0, 0];

    const advice = getAdvice(grid, FIRST_PLAYER_VALUE);
    const expectedAdvice = [1, 1, ADVISE_VALUE, 2, 2, 2, 1, 0, 0];

    expect(advice).toEqual(expectedAdvice);
  });

  it("should returns the next best move as grid (minimized)", () => {
    const grid = [0, 0, 0, 1, 1, 2, 0, 0, 0];

    const advice = getAdvice(grid, SECOND_PLAYER_VALUE);
    const expectedAdvice = [0, 0, ADVISE_VALUE, 1, 1, 2, 0, 0, 0];

    expect(advice).toEqual(expectedAdvice);
  });
});
