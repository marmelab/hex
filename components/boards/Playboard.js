import { Box, Flex, PseudoBox } from "@chakra-ui/core";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { getWinningPath } from "../../engine/game";
import { generateEmptyGrid } from "../../engine/grid";
import {
  FIRST_PLAYER_VALUE,
  NO_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
  WINNER_LINE_VALUE,
} from "../../engine/player";
import {
  getGameById,
  getGamesInLocalStorage,
  setGamesInLocalStorage,
} from "../forms/storage";
import SidePanel from "../panels/SidePanel";
import BottomBoard from "./BottomBoard";
import Hexagon from "./Hexagon";
import {
  calculateLeftPosition,
  calculateTopPosition,
  getBoardRatio,
  getHexagonHeight,
  getHexagonWidth,
} from "./position.js";

const ERROR_NOT_FOUND_GAME = `Can't find the game with ID`;
const GAME_URI = "http://localhost:3000/api/games";
const DEFAULT_SIZE = 11;

const useGame = (
  onlineParameter,
  sizeParameter,
  idParameter,
  player1NicknameParameter,
  player2NicknameParameter
) => {
  const [game, setGame] = useState();

  useEffect(() => {
    if (sizeParameter) {
      setGame(
        createNewGame(sizeParameter, onlineParameter, player1NicknameParameter)
      );
    } else if (idParameter) {
      loadExistingGame(
        idParameter,
        player2NicknameParameter,
        onlineParameter
      ).then(function (game) {
        setGame(game);
      });
    }
  }, [
    onlineParameter,
    sizeParameter,
    idParameter,
    player1NicknameParameter,
    player2NicknameParameter,
  ]);

  return game;
};

function Playboard({
  sizeParameter,
  idParameter,
  onlineParameter,
  player1NicknameParameter,
  player2NicknameParameter,
  ...props
}) {
  const game = useGame(
    onlineParameter,
    sizeParameter,
    idParameter,
    player1NicknameParameter,
    player2NicknameParameter
  );

  const [
    {
      grid,
      player,
      winner,
      size,
      online,
      player1Nickname,
      player2Nickname,
      gameId,
    },
    dispatch,
  ] = useReducer(reducer, { game }, reset);

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
    <Flex {...props}>
      <Flex flexGrow="1" alignItems="center" justifyContent="center">
        <PseudoBox
          position="relative"
          width="80%"
          _after={{
            content: `""`,
            display: "block",
            paddingBottom: `${boardRatio * 100}%`,
          }}
        >
          <BottomBoard
            size={size}
            hexagonHeight={hexagonHeight}
            hexagonWidth={hexagonWidth}
          />
          <Box
            data-testid="grid"
            position="absolute"
            width="100%"
            height="100%"
          >
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCellOnPress(index);
                    }
                  }}
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `calc(${hexagonWidth}% + 1px)`,
                    height: `${hexagonHeight}%`,
                  }}
                  name={`hexagon_${index}`}
                  key={index}
                  value={value}
                  aria-label={`Hexagon at row ${rowIndex} and column ${columnIndex}`}
                  role="button"
                />
              );
            })}
          </Box>
        </PseudoBox>
      </Flex>

      <SidePanel
        player={player}
        winner={winner}
        onReplayOnPress={handleReplayOnPress}
        w="25%"
        flexWrap="wrap"
      />
    </Flex>
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
 * @param {int} sizeParameter
 * @param {int} idParameter
 * @param {boolean} onlineParameter
 * @param {string} player1NicknameParameter
 */
function reset({
  idParameter,
  onlineParameter,
  player1NicknameParameter,
  player2NicknameParameter,
}) {
  return {
    grid: generateEmptyGrid(DEFAULT_SIZE),
    player: FIRST_PLAYER_VALUE,
    winner: NO_PLAYER_VALUE,
    size: DEFAULT_SIZE,
    online: onlineParameter,
    player1Nickname: player1NicknameParameter,
    player2Nickname: player2NicknameParameter,
    gameId: idParameter,
  };
}

/**
 *
 * @param {*} idParameter
 * @param {*} player2NicknameParameter
 * @param {*} onlineParameter
 */
async function loadExistingGame(
  idParameter,
  player2NicknameParameter,
  onlineParameter
) {
  const { grid, player, size } = onlineParameter
    ? updateServerGame(idParameter, player2NicknameParameter)
    : loadLocalGame();

  return {
    winner: NO_PLAYER_VALUE,
    player: player,
    grid: grid,
    size: size,
    gameId: idParameter,
    online: onlineParameter,
  };
}

function loadLocalGame() {
  if (getGameById(idParameter)) {
    const nextPlayer = getNextPlayer(game.player);
    const size = Math.sqrt(game.grid.length);

    return { player: nextPlayer, grid: game.grid, size: size };
  }
  throw new Error(`${ERROR_NOT_FOUND_GAME} ${id}`);
}

/**
 *
 *
 * @param {int} size
 * @param {boolean} isOnline
 */
function createNewGame(size, isOnline, player1Nickname) {
  const grid = generateEmptyGrid(size);
  const gameId = getGameId(isOnline, grid, player1Nickname);

  return {
    winner: NO_PLAYER_VALUE,
    player: FIRST_PLAYER_VALUE,
    grid: grid,
    size: size,
    gameId: gameId,
    online: isOnline,
    player1Nickname: player1Nickname,
  };
}

/**
 * Get the game ID.
 *
 * If local, we generate it. For online games, we get it back from API.
 *
 * @param {boolean} isOnline
 */
function getGameId(isOnline, grid, player1Nickname) {
  if (isOnline) {
    return initializeServerGame({
      grid: JSON.stringify(grid),
      player1Nickname: player1Nickname,
    });
  }

  return generateGameId();
}

/**
 * Initialize a new game on API.
 *
 * @param {*} game
 */
async function initializeServerGame(game) {
  fetch(GAME_URI, {
    method: "post",
    body: JSON.stringify(game),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (game) {
      return game.uuid;
    })
    .catch(function (error) {
      return error;
    });
}

/**
 * To rejoin a game, we need to update the player2Nickname
 *
 * @param {int} id
 * @param {string} player2Nickname
 */
function updateServerGame(id, player2Nickname) {
  return fetch(`${GAME_URI}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ player2Nickname: player2Nickname }),
  })
    .then(function (response) {
      return response.json().then(function (game) {
        const grid = JSON.parse(game.grid);
        return {
          player: FIRST_PLAYER_VALUE,
          grid: grid,
          size: Math.sqrt(grid.length),
          player1Nickname: player1Nickname,
        };
      });
    })
    .catch(function (error) {
      return error;
    });
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
