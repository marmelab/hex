import { getWinningPath } from "./game";
import { NO_PLAYER_VALUE } from "./player";

/**
 * Declines all possible grids for the next movement of the player in parameter.
 *
 * @param {Array} grid
 * @param {integer} player
 */
export function getAllPossibleGrids(grid, player) {
  return grid
    .map(function (value, index) {
      if (value === NO_PLAYER_VALUE) {
        const possibleGrid = [...grid];
        possibleGrid[index] = player;
        return possibleGrid;
      }
    })
    .filter(function (value) {
      return value !== undefined;
    });
}

/**
 * Returns all paths for a player according to a selection of grids.
 *
 * @param {Array} grids
 * @param {integer} player
 */
export function getPathForGrids(grids, player) {
  return grids.map(function (grid, index) {
    return { [index]: getWinningPath(grid, player) };
  });
}

/**
 * Returns the grid containing the best next move for a given player.
 *
 * @param {Array} grid
 * @param {integer} player
 */
export function getAdvice(grid, player) {
  const possibleGrids = getAllPossibleGrids(grid, player);
  const paths = getPathForGrids(possibleGrids, player);
  const winningPaths = paths.filter(function (path, index) {
    return path[index] !== undefined;
  });

  if (winningPaths.length > 0) {
    const winningIndex = parseInt(Object.keys(winningPaths[0]));
    return possibleGrids[winningIndex];
  }
}
