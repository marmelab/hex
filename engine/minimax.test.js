import { getAdvice, getAllPossibleGrids } from "./minimax";
import {
  ADVISE_VALUE,
  FIRST_PLAYER_VALUE,
  NO_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
} from "./player";

/**
 * Reminder
 *
 * NO_PLAYER_VALUE = NO_PLAYER_VALUE
 * FIRST_PLAYER_VALUE = FIRST_PLAYER_VALUE
 * SECOND_PLAYER_VALUE = SECOND_PLAYER_VALUE
 * WINNER_LINE_VALUE = 3
 * ADVISE_VALUE = ADVISE_VALUE
 */

describe("Minimax implementation", () => {
  it("should get all grids possible for a grid configuration", () => {
    const grid = [
      FIRST_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];
    const player = FIRST_PLAYER_VALUE;
    const expectedGrids = [
      {
        grid: [
          FIRST_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          NO_PLAYER_VALUE,
          NO_PLAYER_VALUE,
        ],
        index: SECOND_PLAYER_VALUE,
      },
      {
        grid: [
          FIRST_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          NO_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          NO_PLAYER_VALUE,
        ],
        index: 7,
      },
      {
        grid: [
          FIRST_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          NO_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          SECOND_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
          NO_PLAYER_VALUE,
          FIRST_PLAYER_VALUE,
        ],
        index: 8,
      },
    ];

    const allPossibleGrids = getAllPossibleGrids(grid, player);

    expect(allPossibleGrids).toEqual(expectedGrids);
  });

  it("should seize the opportunity to defeat the opponent", () => {
    const grid = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];
    const expectedAdvice = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      ADVISE_VALUE,
      FIRST_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];

    const advice = getAdvice(grid, FIRST_PLAYER_VALUE);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should not let the player 1 wins the next turn", () => {
    const grid = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];
    const expectedAdvice = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      ADVISE_VALUE,
      FIRST_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];

    const advice = getAdvice(grid, SECOND_PLAYER_VALUE);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should plays a move with the purpose to win", () => {
    const situation = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];
    const expectedAdvice = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      ADVISE_VALUE,
      NO_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];

    const advice = getAdvice(situation, FIRST_PLAYER_VALUE);

    expect(advice).toEqual(expectedAdvice);
  });

  it("should returns the next best move as grid", () => {
    const situation = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];
    const expectedAdvice = [
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      ADVISE_VALUE,
      FIRST_PLAYER_VALUE,
      FIRST_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      SECOND_PLAYER_VALUE,
      NO_PLAYER_VALUE,
      NO_PLAYER_VALUE,
    ];

    const advice = getAdvice(situation, FIRST_PLAYER_VALUE);

    expect(advice).toEqual(expectedAdvice);
  });
});
