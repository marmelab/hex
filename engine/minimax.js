import { getNextPlayer, getWinningPath } from "./game";
import { ADVISE_VALUE, NO_PLAYER_VALUE } from "./player";

const BASE_VALUE = 0;
const MAX_VALUE = 100;
const MIN_VALUE = -100;
const INFINITY_VALUE = 10000;

const INITIAL_SITUATION_INDEX = -1;

const ADVICE_DEPTH = 3;

/**
 * Returns the grid containing the best move for a given player.
 *
 * @param {Array} grid
 * @param {Array} initialSituation.grid
 * @param {integer} initialSituation.index
 * @param {integer} player
 */
export const getAdvice = (grid, player, depth = ADVICE_DEPTH) => {
  const situation = { grid, index: INITIAL_SITUATION_INDEX };

  const proposition = minimax(situation, depth, true, player, depth);

  const advice = [...situation.grid];

  if (proposition.path.length === 0) {
    throw "Unable to determine the order of played indexes";
  }
  advice[proposition.path[0]] = ADVISE_VALUE;

  return advice;
};

/**
 * Minimax function.
 * Based on
 *  https://en.wikipedia.org/wiki/Minimax
 *  https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa
 *
 * @param {Object} situation
 * @param {Array} situation.grid
 * @param {integer} situation.index
 * @param {integer} depth
 * @param {boolean} maximize
 * @param {integer} player
 */
export const minimax = (situation, depth, maximize, player, baseDepth) => {
  // Used to ponderate the score.
  // The lower the depth, the higher the penalty.
  const penalty = baseDepth - depth;

  const leaf = calculateScore(situation, player, maximize, penalty);

  if (depth === 0 || isTerminal(leaf, penalty, maximize)) {
    return leaf;
  }

  if (maximize) {
    let maxScore = { score: -INFINITY_VALUE };

    getAllPossibleGrids(situation.grid, player).forEach((leaf) => {
      const currentLeaf = minimax(leaf, depth - 1, false, player, baseDepth);

      addIndexToPath(currentLeaf, leaf.index);

      maxScore =
        Math.max(maxScore.score, currentLeaf.score) === maxScore.score
          ? maxScore
          : currentLeaf;
    });

    return maxScore;
  } else {
    let minScore = { score: INFINITY_VALUE };

    getAllPossibleGrids(situation.grid, getNextPlayer(player)).forEach(
      (leaf) => {
        const currentLeaf = minimax(leaf, depth - 1, true, player, baseDepth);

        addIndexToPath(currentLeaf, leaf.index);

        minScore =
          Math.min(minScore.score, currentLeaf.score) === minScore.score
            ? minScore
            : currentLeaf;
      }
    );

    return minScore;
  }
};

/**
 * Add an index into the path. First value represents the first simulated move.
 *
 * @param {Object} currentLeaf
 * @param {integer} index
 */
export const addIndexToPath = (currentLeaf, index) => {
  if (!currentLeaf.path) {
    currentLeaf.path = [];
  }
  currentLeaf.path.push(index);

  return currentLeaf;
};

/**
 * Checks if the node is terminal.
 * For each level, returns the expected value of a max success.
 * Because penalty is a negative value, we do an addition for checking
 * the min value.
 *
 * @param {integer} leaf
 */
export const isTerminal = (leaf, penalty, maximize) => {
  leaf &&
    ((!maximize && leaf.score === MAX_VALUE - penalty) ||
      (maximize && leaf.score === MIN_VALUE + penalty));
};

/**
 * Calculate the score for a configuration.
 *
 * @param {Array} situation
 * @param {integer} player
 * @param {integer} depth
 * @param {boolean} maximize
 * @param {integer} penalty
 */
export const calculateScore = (situation, player, maximize, penalty) => {
  const { grid, index } = situation;

  // INITIAL_SITUATION_INDEX indicates that it will not be processed.
  if (index === INITIAL_SITUATION_INDEX) {
    return;
  }

  const forPlayer = getNextPlayer(player);

  // Winning path contains the path to win.
  // If no path are found, the path will be undefined.
  const winningPath = {
    grid,
    path: getWinningPath(situation.grid, forPlayer),
    index,
  };

  return getScore(winningPath, !maximize, penalty);
};

/**
 * Returns the score based on maximising/minimizing parameter.
 *
 * @param {Array} winningPath
 * @param {integer} depth
 * @param {boolean} maximize
 */
export const getScore = (winningPath, maximize, penalty) => {
  const { grid, path, index } = winningPath;

  const isWinningPath = path !== undefined;

  if (isWinningPath) {
    if (maximize) {
      return { grid, index, score: MAX_VALUE - penalty };
    } else {
      return { grid, index, score: MIN_VALUE + penalty };
    }
  }

  return { grid, index, score: BASE_VALUE - penalty };
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
