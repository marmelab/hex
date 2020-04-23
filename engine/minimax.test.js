import { ADVISE_VALUE, getAdvice, getAllPossibleGrids } from "./minimax";
import {
  SECOND_PLAYER_VALUE,
  FIRST_PLAYER_VALUE,
  NO_PLAYER_VALUE,
} from "./player";

const X = FIRST_PLAYER_VALUE;
const O = SECOND_PLAYER_VALUE;
const _ = NO_PLAYER_VALUE;
const A = ADVISE_VALUE;

/**
 * Reminder
 *
 * _ = 0
 * X = 1
 * O = 2
 * A = 4
 */
describe("Minimax implementation", () => {
  it("should get all possible grids for a grid configuration", () => {
    const grid = [X, X, _, O, O, O, X, _, _];
    const player = X;
    const expectedGrids = [
      {
        grid: [X, X, X, O, O, O, X, _, _],
        index: O,
      },
      {
        grid: [X, X, _, O, O, O, X, X, _],
        index: 7,
      },
      {
        grid: [X, X, _, O, O, O, X, _, X],
        index: 8,
      },
    ];

    const allPossibleGrids = getAllPossibleGrids(grid, player);

    expect(allPossibleGrids).toEqual(expectedGrids);
  });

  it("should seize the opportunity to defeat the opponent", () => {
    const grid = [_, _, _, X, X, _, O, O, _];
    const expectedAdvice = [_, _, A, X, X, _, O, O, _];

    const advice = getAdvice(grid, X);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should not let the player 1 win the next turn", () => {
    const grid = [_, _, _, X, X, O, _, _, _];
    const expectedAdvice = [_, _, A, X, X, O, _, _, _];

    const advice = getAdvice(grid, O);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should play a move with the purpose to win", () => {
    const situation = [_, _, _, _, X, O, _, _, _];
    const expectedAdvice = [_, _, A, _, X, O, _, _, _];

    const advice = getAdvice(situation, X);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should return the next best move as grid", () => {
    const situation = [_, _, _, X, X, O, O, _, _];
    const expectedAdvice = [_, _, A, X, X, O, O, _, _];

    const advice = getAdvice(situation, X);

    expect(advice).toEqual(expectedAdvice);
  });
});
