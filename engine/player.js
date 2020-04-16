import sha256 from "@cryptography/sha256";

export const NO_PLAYER_VALUE = 0;
export const FIRST_PLAYER_VALUE = 1;
export const SECOND_PLAYER_VALUE = 2;

export const WINNER_LINE_VALUE = 3;
export const ADVISE_VALUE = 4;

/**
 * Get the token in Local Storage.
 *
 * @param {string} id
 */
export function getToken(id) {
  return localStorage.getItem(id);
}

/**
 * Store a token in Local Storage.
 * A player can have only one token by game.
 *
 * NB: This token generator should be used only on server side (tradeof here).
 *
 * @param {integer} player
 * @param {string} id
 */
export function writeToken(player, id) {
  if (localStorage.getItem(id) === null) {
    localStorage.setItem(id, generateToken(player, id));
  }
}

/**
 * Create a really basic token to identify first and second player.
 *
 * @param {integer} player
 * @param {string} id
 */
export function generateToken(player, id) {
  return sha256(`${id}${player}`, "hex");
}

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
