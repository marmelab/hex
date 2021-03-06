import { getGraphFromCoordinates } from "./graph";
import { getCoordinatesFromGrid } from "./coordinates";
import {
  getCurrentPlayer,
  NO_PLAYER_VALUE,
  WINNER_LINE_VALUE,
  FIRST_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
} from "./player";

import _ from "lodash";
import { HINT_VALUE } from "./minimax";

export const START_ID = "0";

var dijkstra = require("dijkstrajs");
var find_path = dijkstra.find_path;

/**
 * Remove all hint values presents in the grid.
 *
 * @param {Array} grid
 */
export const cleanHints = (grid) => {
  return grid.map((value) => {
    return value === HINT_VALUE ? NO_PLAYER_VALUE : value;
  });
};

/**
 * This function try to apply a move on the current state of the game.
 *
 * @param {Object} game
 * @param {integer} player
 * @param {integer} cellIndex
 */
export function applyMoveOnGame(game, player, cellIndex) {
  const { grid, ...updatedGame } = game;

  if (updatedGame.secondPlayerNickname && player === getCurrentPlayer(grid)) {
    const updatedGrid = grid.map((hexagon, index) =>
      cellIndex === index ? player : hexagon
    );

    const winningPath = getWinningPath(updatedGrid, player);

    if (winningPath) {
      return getWonGame(game, grid, player, winningPath);
    }

    updatedGame.grid = updatedGrid;
    updatedGame.player = getNextPlayer(player);

    return updatedGame;
  }

  throw "NO_SECOND_PLAYER_OR_NOT_YOUR_TURN";
}

/**
 * This function looks for a path into the graph generated from a grid.
 *
 * @param {[]} grid
 * @param {int} player
 */
export function getWinningPath(grid, player) {
  const coordinates = getCoordinatesFromGrid(grid);
  const graph = getGraphFromCoordinates(coordinates, player);
  const endId = coordinates.length + 1;

  try {
    return find_path(graph, START_ID, endId);
  } catch (error) {
    if (error.message.includes("Could not find a path from")) {
      return undefined;
    }
  }
}

/**
 * This function returns the Game object with an updated winning grid.
 * Also set the current player as "no player" and the winner as current player
 *
 * @param {Object} game
 * @param {Array} grid
 * @param {integer} player
 * @param {Array} winningPath
 */
function getWonGame(game, grid, player, winningPath) {
  game.grid = grid.map(function (value, index) {
    return hexagonIndexIsInPath(winningPath, index) ? WINNER_LINE_VALUE : value;
  });

  game.player = NO_PLAYER_VALUE;
  game.winner = player;

  return game;
}

/**
 * Check if the index of an hexagon is in the winning path.
 *
 * @param {[]} winningPath
 * @param {int} index
 */
function hexagonIndexIsInPath(winningPath, index) {
  return _.indexOf(winningPath, (index + 1).toString(10)) >= 0;
}

/**
 * Determines who will play next.
 *
 * @param {*} player
 */
export function getNextPlayer(player) {
  return player === FIRST_PLAYER_VALUE
    ? SECOND_PLAYER_VALUE
    : FIRST_PLAYER_VALUE;
}

/**
 * Check if the move is legal.
 *
 * @param {integer} index
 * @param {Object} game
 */
export function canPlayMove(index, game) {
  return (
    (game.grid[index] === NO_PLAYER_VALUE || game.grid[index] === HINT_VALUE) &&
    !game.winner
  );
}
