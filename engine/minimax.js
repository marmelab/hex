import { getWinningPath, getNextPlayer } from "./game";
import { ADVISE_VALUE, NO_PLAYER_VALUE } from "./player";

const BASE_VALUE = 0;
const MAX_VALUE = 100;
const MIN_VALUE = -100;

const ADVICE_DEPTH = 2;

/**
 * Returns the grid containing the best next move for a given player.
 *
 * @param {Array} grid
 * @param {Array} initialSituation.grid
 * @param {integer} initialSituation.index
 * @param {integer} player
 */
export const getAdvice = (grid, player) => {
  const situation = { grid, index: -1 };

  const bestNextSituation = minimax(situation, ADVICE_DEPTH, true, player);

  const advice = [...bestNextSituation.grid];
  advice[bestNextSituation.index] = ADVISE_VALUE;
  return advice;
};

/**
 * @param {Object} situation
 * @param {Array} situation.grid
 * @param {integer} initialSituation.index
 * @param {integer} depth
 * @param {boolean} maximizing
 */
export const minimax = (situation, depth, maximizing, player) => {
  const currentScore = calculateScore(
    situation,
    getNextPlayer(player),
    depth,
    !maximizing
  );

  if (depth === 0 || isTerminal(currentScore)) {
    console.log(currentScore);

    return currentScore;
  }

  if (maximizing) {
    let maxScore = { score: MIN_VALUE };

    getAllPossibleGrids(situation.grid, player).map((child) => {
      const currentScore = minimax(
        child,
        depth - 1,
        false,
        getNextPlayer(player)
      );

      maxScore =
        Math.max(maxScore.score, currentScore.score) == maxScore.score
          ? maxScore
          : currentScore;
    });
    return maxScore;
  } else {
    let minScore = { score: MAX_VALUE };

    getAllPossibleGrids(situation.grid, player).map((child) => {
      const currentScore = minimax(
        child,
        depth - 1,
        true,
        getNextPlayer(player)
      );

      minScore =
        Math.min(minScore.score, currentScore.score) == minScore.score
          ? minScore
          : currentScore;
    });

    return minScore;
  }
};

/**
 *
 * @param {*} score
 */
export const isTerminal = (score) => {
  
};

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
 * Returns the score based on maximising/minimizing parameter.
 *
 * @param {Array} winningPath
 * @param {integer} depth
 * @param {boolean} maximized
 */
function getScore(winningPath, depth, maximized) {
  const { grid, path, index } = winningPath;

  const isWinningPath = path !== undefined;

  if (isWinningPath) {
    if (maximized) {
      return makeScore(grid, index, depth, MAX_VALUE);
    } else if (!maximized) {
      return makeScore(grid, index, depth, MIN_VALUE);
    }
  }

  return makeScore(grid, index, depth, BASE_VALUE);
}

export const makeScore = (grid, index, depth, value) => {
  return { grid, score: value - depth, index };
};

/**
 *
 * @param {Array} grid
 * @param {integer} player
 * @param {integer} depth
 * @param {boolean} maximise
 */
export const calculateScore = (grid, player, depth, maximise) => {
  if (situation.index !== -1) {
    return;
  }

  const winningPath = {
    grid: grid.grid,
    path: getWinningPath(grid.grid, player),
    index: grid.index,
  };

  return getScore(winningPath, depth, maximise);
};
