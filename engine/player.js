export const NO_PLAYER_VALUE = 0;
export const FIRST_PLAYER_VALUE = 1;
export const SECOND_PLAYER_VALUE = 2;

export const WINNER_LINE_VALUE = 3;

/**
 * 
 * @param {Array} grid 
 * @param {int} winner 
 */
export function getCurrentPlayer(grid, winner) {
  if (winner) {
    return NO_PLAYER_VALUE;
  }

  const size = Math.sqrt(grid.length);
  const isEven = size % 2 === 0;
  const emptyCellCount = grid.filter(function (cell) {
    return cell === NO_PLAYER_VALUE;
  }).length;

  const isFirstMove = emptyCellCount === size;

  if (isFirstMove) {
    return FIRST_PLAYER_VALUE;
  }

  if (isEven && emptyCellCount % 2 === 0) {
    return FIRST_PLAYER_VALUE;
  } else if (!isEven && emptyCellCount % 2 === 1) {
    return FIRST_PLAYER_VALUE;
  } else {
    return SECOND_PLAYER_VALUE;
  }
}
