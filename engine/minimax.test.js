import {
  getAdvice,
  getAllPossibleGrids,
  getWinningPathForGrids,
} from "./minimax";

/**
 * Reminder
 *
 * NO_PLAYER_VALUE = 0
 * FIRST_PLAYER_VALUE = 1
 * SECOND_PLAYER_VALUE = 2
 * WINNER_LINE_VALUE = 3
 * ADVISE_VALUE = 4
 */

describe("Minimax implementation", () => {
  it("should get all grids possible for a grid configuration", () => {
    const grid = [1, 1, 0, 2, 2, 2, 1, 0, 0];
    const player = 1;

    const allPossibleGrids = getAllPossibleGrids(grid, player);

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

    const scores = getWinningPathForGrids(grids, 1);
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

    const advice = getAdvice(grid, 1);
    const expectedAdvice = [1, 1, 4, 2, 2, 2, 1, 0, 0];

    expect(advice).toEqual(expectedAdvice);
  });

  it("should returns the next best move as grid (minimized)", () => {
    const grid = [0, 0, 0, 1, 1, 2, 0, 0, 0];

    const advice = getAdvice(grid, 2);
    const expectedAdvice = [0, 0, 4, 1, 1, 2, 0, 0, 0];

    expect(advice).toEqual(expectedAdvice);
  });

  /*   it("should returns the next best move as grid (level 1)", () => {
    const grid = [0, 0, 0, 1, 0, 2, 0, 0, 0];

    const advice = getAdvice(grid, FIRST_PLAYER_VALUE);
    const expectedAdvice = [ADVISE_VALUE, 0, 0, 1, 0, 2, 0, 0, 0];

    expect(advice).toEqual(expectedAdvice);
  }); */
});
