import { Box, Flex, PseudoBox } from "@chakra-ui/core";
import React, { useCallback, useReducer } from "react";
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
  getGamesFromLocalStorage,
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
const DEFAULT_SIZE = 11;

function init({ game }) {
  return {
    grid: game.grid,
    size: Math.sqrt(game.grid.length),
    player: game.player,
    winner: game.winner,
  };
}

function Playboard({ game, ...props }) {

  const [{ grid, player, winner, size }, dispatch] = useReducer(
    reducer,
    { game },
    init
  );

  const boardRatio = getBoardRatio(size);
  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const handleReplayOnPress = useCallback(() => {
    if (winner) {
      dispatch({
        type: "reset",
        payload: { sizeParameter: size },
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
 * @param {boolean} onlineParameter
 * @param {string} player1NicknameParameter
 */
function reset({
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
  };
}

/**
 *
 * @param {*} player2NicknameParameter
 * @param {*} onlineParameter
 */
async function loadExistingGame(player2NicknameParameter, onlineParameter) {
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
 * Save the current game and add it to the current pool of saved games.
 *
 * @param {String} gameId
 * @param {Array} grid
 * @param {int} player
 */
function saveCurrentGame(gameId, grid, player) {
  const games = getGamesFromLocalStorage();

  const currentGame = games.find(function (game) {
    return game.id === gameId;
  });

  currentGame.grid = grid;
  currentGame.player = player;

  setGamesInLocalStorage(games);
}

/**
 * Save the current game and add it to the current pool of saved games.
 *
 * @param {string} gameId
 */
function cleanCurrentGame(gameId) {
  const games = getGamesFromLocalStorage();

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
