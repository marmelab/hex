import { getWinningPath, getNextPlayer } from "./game";
import { ADVISE_VALUE, NO_PLAYER_VALUE } from "./player";

const BASE_VALUE = 0;
const MAX_VALUE = 100;
const MIN_VALUE = -100;

const ADVICE_DEPTH = 1;

/**
 * Returns the grid containing the best next move for a given player.
 *
 * @param {Array} grid
 * @param {Array} initialSituation.grid
 * @param {integer} initialSituation.index
 * @param {integer} player
 */
export const getAdvice = (grid, player, depth = ADVICE_DEPTH) => {
  const situation = { grid, index: -1 };

  const bestNextSituation = minimax(situation, depth, true, player);

  const advice = [...situation.grid];
  advice[bestNextSituation.childIndex] = ADVISE_VALUE;
  return advice;
};

/**
 * @param {Object} situation
 * @param {Array} situation.grid
 * @param {integer} situation.index
 * @param {integer} depth
 * @param {boolean} maximize
 * @param {integer} player
 */
export const minimax = (situation, depth, maximize, player, baseDepth) => {
  const currentScore = calculateScore(
    situation,
    player,
    depth,
    maximize,
    baseDepth
  );

  if (
    depth === 0 ||
    (maximize && currentScore && currentScore.score === MAX_VALUE)
  ) {
    return currentScore;
  }

  if (maximize) {
    let maxScore = { score: MIN_VALUE };

    getAllPossibleGrids(situation.grid, player).forEach((child) => {
      const currentScore = minimax(child, depth - 1, false, player, depth);

      currentScore.childIndex = child.index;

      maxScore =
        Math.max(maxScore.score, currentScore.score) === maxScore.score
          ? maxScore
          : currentScore;
    });

    console.log(maxScore, depth, "MAX");

    return maxScore;
  } else {
    let minScore = { score: MAX_VALUE };

    getAllPossibleGrids(situation.grid, getNextPlayer(player)).forEach(
      (child) => {
        const currentScore = minimax(child, depth - 1, true, player, depth);

        currentScore.childIndex = child.index;
        minScore =
          Math.min(minScore.score, currentScore.score) === minScore.score
            ? minScore
            : currentScore;
      }
    );

    console.log(minScore, depth, "MIN");

    return minScore;
  }
};

/**
 *
 * @param {*} score
 */
export const isTerminal = (score) => {
  score && (score.score === MAX_VALUE || score.score === MIN_VALUE);
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
 * @param {boolean} maximize
 */
function getScore(winningPath, depth, maximize) {
  const { grid, path, index } = winningPath;

  const isWinningPath = path !== undefined;

  if (isWinningPath) {
    if (maximize) {
      return makeScore(grid, index, depth, MAX_VALUE);
    } else {
      return makeScore(grid, index, depth, MIN_VALUE);
    }
  }

  return makeScore(grid, index, depth, BASE_VALUE);
}

/**
 *
 *
 * @param {Array} grid
 * @param {integer} index
 * @param {integer} depth
 * @param {integer} value
 */
export const makeScore = (grid, index, depth, value) => {
  return { grid, score: value - depth, index };
};

/**
 * Calculate the score for a configuration.
 *
 * @param {Array} situation
 * @param {integer} player
 * @param {integer} depth
 * @param {boolean} maximise
 */
export const calculateScore = (situation, player, depth, maximise) => {
  const { grid, index } = situation;

  // -1 index indicates initial situation.
  // We don't calculate the score for her.
  if (index === -1) {
    return;
  }

  const forPlayer = maximise ? getNextPlayer(player) : player;

  // Winning path contains the path to win.
  // If no path are found, the path will be undefined.
  const winningPath = {
    grid,
    path: getWinningPath(situation.grid, forPlayer),
    index,
  };

  return getScore(winningPath, depth, !maximise);
};
