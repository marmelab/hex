import React, { useCallback, useReducer } from "react";
import Hexagon from "./Hexagon";
import BottomBoard from "./BottomBoard";
import {
  getBoardRatio,
  getHexagonHeight,
  getHexagonWidth,
  calculateLeftPosition,
  calculateTopPosition,
} from "./position.js";
import { generateEmptyGrid } from "../../engine/grid";
import {
  FIRST_PLAYER_VALUE,
  WINNER_LINE_VALUE,
  NO_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
} from "../../engine/player";
import { getWinningPath } from "../../engine/game";
import { Flex, Box } from "@chakra-ui/core";
import SidePanel from "../panels/SidePanel";
import {
  getGameById,
  getGamesInLocalStorage,
  setGamesInLocalStorage,
} from "../forms/storage";

const ERROR_NOT_FOUND_GAME = `Can't find the game with ID`;

function Playboard({ sizeParameter, idParameter, ...props }) {
  const [{ grid, player, winner, size, gameId }, dispatch] = useReducer(
    reducer,
    { sizeParameter, idParameter, gameId },
    init
  );

  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const handleReplayOnPress = useCallback(() => {
    if (winner) {
      dispatch({
        type: "reset",
        payload: { sizeParameter: size, idParameter: undefined },
        winner,
      });
    }
  }, [size, winner]);

  const handleCellOnPress = (cellIndex) => {
    dispatch({ type: "playMove", payload: cellIndex });
  };

  return (
    <>
      <Flex
        name="playboard"
        align="center"
        justify="center"
        position="relative"
        _after={{
          content: "",
          display: "block",
          paddingBottom: `${boardRatio} * 100%`,
        }}
        {...props}
      >
        <BottomBoard
          size={size}
          hexagonHeight={hexagonHeight}
          hexagonWidth={hexagonWidth}
        />

        <Box name="grid" position="absolute" width="100%" height="100%">
          {grid.map((value, index) => {
            const rowIndex = index % size;
            const columnIndex = Math.floor(index / size);

            const top = calculateTopPosition(rowIndex, hexagonHeight);
            const left = calculateLeftPosition(
              columnIndex,
              rowIndex,
              hexagonWidth
            );

            return (
              <Hexagon
                onClick={() => handleCellOnPress(index)}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `calc(${hexagonWidth}% + 1px)`,
                  height: `${hexagonHeight}%`,
                }}
                name={`hexagon_${index}`}
                value={value}
              />
            );
          })}
        </Box>
      </Flex>

      <SidePanel
        player={player}
        winner={winner}
        onReplayOnPress={handleReplayOnPress}
        w="25%"
        flexWrap="wrap"
      />
    </>
  );
}

export default Playboard;

/**
 * Available actions :
 *  - reset
 *  - playMove
 *
 * @param {Object} state
 * @param {string} action
 */
function reducer({ grid, player, winner, size, gameId }, action) {
  switch (action.type) {
    case "reset":
      return init(action.payload);
    case "playMove":
      return playMove({
        cellIndex: action.payload,
        grid,
        player,
        winner,
        size,
        gameId,
      });
    default:
      throw new Error();
  }
}

/**
 * Initialize states.
 *
 * @param {*} size
 * @param {*} id
 */
function init({ sizeParameter, idParameter }) {
  if (sizeParameter) {
    return {
      winner: NO_PLAYER_VALUE,
      player: FIRST_PLAYER_VALUE,
      grid: generateEmptyGrid(sizeParameter),
      size: sizeParameter,
      gameId: generateGameId(),
    };
  } else if (idParameter) {
    const { grid, player, size } = loadGame(idParameter);
    return {
      winner: NO_PLAYER_VALUE,
      player: player,
      grid: grid,
      size: size,
      gameId: idParameter,
    };
  }

  throw new Error(`Can't intialize a game.`);
}

/**
 * Play a move based on the id of hexagon clicked.
 * Updates player, grid and winner values.
 * 
 * @param {Object} move
 */
function playMove({ cellIndex, grid, player, winner, size, gameId }) {
  if (grid[cellIndex] !== 0 || winner) {
    return { player: player, grid: grid, winner: winner, size, gameId };
  }

  const updatedGrid = grid.map((hexagon, index) =>
    cellIndex === index ? player : hexagon
  );

  const winningPath = getWinningPath(updatedGrid, player);

  if (winningPath) {
    const winningGrid = grid.map(function (value, index) {
      return hexagonIndexIsInPath(winningPath, index)
        ? WINNER_LINE_VALUE
        : value;
    });

    cleanCurrentGame(gameId);

    return {
      player: player,
      grid: winningGrid,
      winner: player,
      size: size,
      gameId: gameId,
    };
  }

  const nextPlayer = getNextPlayer(player);

  saveCurrentGame(gameId, updatedGrid, player);

  return {
    player: nextPlayer,
    grid: updatedGrid,
    winner: winner,
    size: size,
    gameId: gameId,
  };
}

/**
 * Create a timestamp based game id
 *
 * Based on : https://gist.github.com/gordonbrander/2230317
 * @param {int} parameterId
 */
function generateGameId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Save the current game and add it to the current pool of saved games.
 *
 * @param {String} gameId
 * @param {Array} grid
 * @param {int} player
 */
function saveCurrentGame(gameId, grid, player) {
  const games = getGamesInLocalStorage();

  const currentGame = games.find(function (game) {
    return game.id === gameId;
  });

  if (!currentGame) {
    const newSave = { id: gameId, grid, player };
    games.push(newSave);
  } else {
    currentGame.grid = grid;
    currentGame.player = player;
  }

  setGamesInLocalStorage(games);
}

/**
 * Save the current game and add it to the current pool of saved games.
 *
 * @param {string} gameId
 */
function cleanCurrentGame(gameId) {
  const games = getGamesInLocalStorage();

  _.remove(games, function (game) {
    return game.id === gameId;
  });

  setGamesInLocalStorage(games);
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
function getNextPlayer(player) {
  return player === FIRST_PLAYER_VALUE
    ? SECOND_PLAYER_VALUE
    : FIRST_PLAYER_VALUE;
}

/**
 * Load a game from Local Storage by id.
 *
 * @param {int} id
 */
function loadGame(id) {
  const game = getGameById(id);

  if (game) {
    const nextPlayer = getNextPlayer(game.player);
    const size = Math.sqrt(game.grid.length);

    return { player: nextPlayer, grid: game.grid, size: size };
  }
  throw new Error(`Can't find the game with ID ${id}`);
}
