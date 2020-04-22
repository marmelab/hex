import {
  getAdvice,
  getAllPossibleGrids,
  getWinningPathForGrid,
  minimax,
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
  /*
  it("should get all grids possible for a grid configuration", () => {
    const grid = [1, 1, 0, 2, 2, 2, 1, 0, 0];
    const player = 1;
    const expectedGrids = [
      { grid: [1, 1, 1, 2, 2, 2, 1, 0, 0], index: 2 },
      { grid: [1, 1, 0, 2, 2, 2, 1, 1, 0], index: 7 },
      { grid: [1, 1, 0, 2, 2, 2, 1, 0, 1], index: 8 },
    ];

    const allPossibleGrids = getAllPossibleGrids(grid, player);

    expect(allPossibleGrids).toEqual(expectedGrids);
  });

  it("should returns the next best move as grid (maximized)", () => {
    const grid = [0, 0, 0, 1, 1, 0, 2, 2, 0];
    const expectedAdvice = [0, 0, 4, 1, 1, 0, 2, 2, 0];

    const advice = getAdvice(grid, 1);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should returns the next best move as grid (minimized)", () => {
    const grid = [0, 0, 0, 1, 1, 2, 0, 0, 0];
    const expectedAdvice = [0, 0, 4, 1, 1, 2, 0, 0, 0];

    const advice = getAdvice(grid, 2, 2);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should returns the next best move as grid (level 3)", () => {
    const initialSituation = [0, 2, 0, 0, 1, 0, 0, 0, 0];
    const expectedAdvice = [0, 2, 4, 0, 1, 0, 0, 0, 0];

    const advice = getAdvice(initialSituation, 1, 3);

    expect(advice).toEqual(expectedAdvice);
  }); */

  it("should returns the next best move as grid (level 3) - Second move", () => {
    const initialSituation = [0, 2, 1, 0, 1, 0, 0, 2, 0];
    const expectedAdvice = [0, 2, 1, 4, 1, 0, 0, 2, 0];

    const advice = getAdvice(initialSituation, 1, 3);

    expect(advice).toEqual(expectedAdvice);
  });
});
