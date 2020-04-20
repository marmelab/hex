import { getNextPlayer, getWinningPath } from "./game";
import { ADVISE_VALUE, NO_PLAYER_VALUE } from "./player";

const BASE_VALUE = 0;
const WINNING_VALUE = 100;
const LOSING_VALUE = -100;

/**
 * Declines all possible grids for the next movement of the player in parameter.
 *
 * @param {Array} grid
 * @param {integer} player
 */
export function getAllPossibleGrids(grid, player) {
  return grid
    .map((value, index) => {
      if (value === NO_PLAYER_VALUE) {
        const possibleGrid = [...grid];
        possibleGrid[index] = player;
        return { grid: possibleGrid, index };
      }
    })
    .filter((grid) => {
      return grid !== undefined;
    });
}

/**
 * Returns all paths for a player according to a selection of grids.
 *
 * @param {Array} grids
 * @param {integer} player
 * @param {integer} level
 * @param {boolean} maximizing
 */
export function getWinningPathForGrids(grids, player) {
  return grids.map((grid) => {
    return {
      grid: grid.grid,
      path: getWinningPath(grid.grid, player),
      index: grid.index,
    };
  });
}

/**
 * Returns the score based on maximising/minimizing parameter.
 *
 * @param {Array} winningPath
 * @param {integer} level
 * @param {boolean} maximized
 */
function getScore(winningPath, level, maximized) {
  const { grid, path } = winningPath;

  const isWinningPath = path !== undefined;

  if (maximized && isWinningPath) {
    const score = WINNING_VALUE + level;

    return { grid, score, index: winningPath.index };
  } else if (!maximized && isWinningPath) {
    const score = LOSING_VALUE + level;

    return { grid, score, index: winningPath.index };
  }

  const score = BASE_VALUE + level;
  return { grid, score, index: winningPath.index };
}

export function getScores(grid, player, level, maximise) {
  const possibleGrids = getAllPossibleGrids(grid, player);
  const winningPaths = getWinningPathForGrids(possibleGrids, player);
  return winningPaths.map((winningPath) => {
    return getScore(winningPath, level, maximise);
  });
}

/**
 * Returns the grid containing the best next move for a given player.
 *
 * @param {Array} grid
 * @param {integer} player
 */
export function getAdvice(grid, player) {
  const getNextLevel = (level = 0) => level--;

  const level = getNextLevel();

  // Maximizing
  const maxScores = getScores(grid, player, level, true);
  const bestMaxScore = Math.max.apply(
    Math,
    maxScores.map((maximizedScore) => {
      return maximizedScore.score;
    })
  );

  // Minimazing
  const adversary = getNextPlayer(player);
  const minScores = getScores(grid, adversary, level, false);
  const bestMinScore = Math.min.apply(
    Math,
    minScores.map((minimizedScore) => {
      return minimizedScore.score;
    })
  );

  return getBestScore(bestMaxScore, bestMinScore, maxScores, minScores);
}

/**
 * For a couple of best max and min score, we get back the most valuable score.
 *
 * @param {integer} bestMaxScore
 * @param {integer} bestMinScore
 * @param {Array} maxScores
 * @param {Array} minScores
 */
function getBestScore(bestMaxScore, bestMinScore, maxScores, minScores) {
  if (bestMaxScore > -bestMinScore) {
    return getUpdatedGrid(maxScores, bestMaxScore);
  }

  return getUpdatedGrid(minScores, bestMinScore);
}

/**
 * Returns an updated grid containing ADVISE_VALUE at the index position.
 *
 * @param {Array} scores
 * @param {integer} bestScore
 */
export function getUpdatedGrid(scores, bestScore) {
  const bestGrid = scores.find((score) => {
    return score.score === bestScore;
  });

  bestGrid.grid[bestGrid.index] = ADVISE_VALUE;
  return bestGrid.grid;
}
