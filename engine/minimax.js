import { getNextPlayer, getWinningPath } from "./game";
import { ADVISE_VALUE, NO_PLAYER_VALUE } from "./player";

const BASE_VALUE = 0;
const WINNING_VALUE = 100;
const LOOSING_VALUE = -100;

/**
 * Declines all possible grids for the next movement of the player in parameter.
 *
 * @param {Array} grid
 * @param {integer} player
 */
export const getAllPossibleGrids = (grid, player) => {
  return grid
    .map((value, index) => {
      if (value === NO_PLAYER_VALUE) {
        const possibleGrid = [...grid];
        possibleGrid[index] = player;
        return { grid: possibleGrid, index };
      }
    })
    .filter((grid) => grid !== undefined);
};

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
  const { grid, path, index } = winningPath;

  const isWinningPath = path !== undefined;

  if (isWinningPath) {
    if (maximized) {
      return makeScore(grid, index, level, WINNING_VALUE);
    } else if (!maximized) {
      return makeScore(grid, index, level, LOOSING_VALUE);
    }
  }

  return makeScore(grid, index, level, BASE_VALUE);
}

export const makeScore = (grid, index, level, value) => {
  return { grid, score: value + level, index };
};

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

  /* return getBestScore(bestMaxScore, bestMinScore, maxScores, minScores); */

  /// Level 2
  const level2 = getNextLevel(level);
  const nextPlayer = getNextPlayer(player);

  const l2MaxScore = maxScores.map((score) => {
    const maxScores = getScores(score.grid, nextPlayer, level2, true);
    const bestMaxScore = Math.max.apply(
      Math,
      maxScores.map((maximizedScore) => {
        return maximizedScore.score;
      })
    );
  });

  const l2Adversary = getNextPlayer(player);
  const l2minScores = getScores(grid, l2Adversary, level2, false);
  maxScores.map((score) => {
    const maxScores = getScores(score.grid, nextPlayer, level2, true);
    const bestMaxScore = Math.max.apply(
      Math,
      maxScores.map((maximizedScore) => {
        return maximizedScore.score;
      })
    );
  });

  return getBestScore(bestMaxScore, bestMinScore, maxScores, l2minScores);
}

/**
 * Decrements level.
 *
 * @param {int} level
 */
const getNextLevel = (level = 0) => level--;

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
