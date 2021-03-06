import { getAllPossibleGrids, getHint, HINT_VALUE } from "./minimax";
import {
  FIRST_PLAYER_VALUE,
  NO_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
} from "./player";

const X = FIRST_PLAYER_VALUE;
const O = SECOND_PLAYER_VALUE;
const _ = NO_PLAYER_VALUE;
const A = HINT_VALUE;

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

  it("should play the next winning move for second player (size of grid: 5x5) ", () => {
    // prettier-ignore
    const grid = [
        X, X, O, _, _, X, _, O, _, _, X, _, O, _, _, _, _, _, _, _, _, _, _, _, _,                
    ];
    // prettier-ignore
    const expectedHint = [
        X, X, O, _, _, X, _, O, _, _, X, _, O, _, _, _, _, _, _, _, A, _, _, _, _,       
    ];

    const hint = getHint(grid, O);

    expect(hint).toEqual(expectedHint);
  });

  it("should play the next winning move for first player (size of grid: 7x7) ", () => {
    // prettier-ignore
    const grid = [
      _,_,O,X,O,O,X,O,_,_,X,O,X,_,_,X,O,O,X,X,O,_,_,X,_,O,O,_,X,O,O,O,O,O,_,X,X,X,O,X,_,_,O,_,X,X,X,X,_
    ];
    // prettier-ignore
    const expectedHint = [
      _,_,O,X,O,O,X,O,_,_,X,O,X,_,_,X,O,O,X,X,O,_,_,X,_,O,O,_,X,O,O,O,O,O,_,X,X,X,O,X,_,A,O,_,X,X,X,X,_
    ];

    const hint = getHint(grid, X);

    expect(hint).toEqual(expectedHint);
  });

  it("should not let the player X win the next turn", () => {
    const grid = [_, _, _, X, X, _, _, _, O];
    const expectedHint = [_, _, A, X, X, _, _, _, O];

    const hint = getHint(grid, O);

    expect(hint).toEqual(expectedHint);
  });

  it("should play a move with the purpose to win", () => {
    const situation = [_, _, _, X, _, O, _, _, _];
    const expectedHint = [_, A, _, X, _, O, _, _, _];

    const hint = getHint(situation, X);

    expect(hint).toEqual(expectedHint);
  });
});
