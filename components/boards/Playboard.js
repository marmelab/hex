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
import { getGameById } from "../forms/storage";

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
 * Initialize states.
 *
 * @param {*} size
 * @param {*} id
 */
function init({ size, id }) {
  if (size) {
    return {
      winner: NO_PLAYER_VALUE,
      player: FIRST_PLAYER_VALUE,
      grid: generateEmptyGrid(params.size),
    };
  } else if (id) {
    const { grid, player, size } = loadGame(params.id);
    return { winner: NO_PLAYER_VALUE, player, grid, size };
  }
}

/**
 * Play a move based on the id of hexagon clicked.
 * Updates player, grid and winner values.
 *
 * @param {int} id
 * @param {*} state
 */
function playMove(id, grid, player, winner) {
  if (grid[id] !== 0 || winner) {
    return { player: player, grid: grid, winner: winner };
  }

  const updatedGrid = grid.map((hexagon, index) =>
    id === index ? player : hexagon
  );

  const winningPath = getWinningPath(updatedGrid, player);

  if (winningPath) {
    const winningGrid = grid.map(function (value, index) {
      return hexagonIndexIsInPath(winningPath, index)
        ? WINNER_LINE_VALUE
        : value;
    });

    return { player: player, grid: winningGrid, winner: player };
  }

  const nextPlayer = getNextPlayer(player);

  return { player: nextPlayer, grid: updatedGrid, winner: winner };
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
  const nextPlayer = getNextPlayer(game.player);
  const size = Math.sqrt(game.grid.length);

  return { player: nextPlayer, grid: game.grid, size };
}

function reducer({ grid, player, winner }, action) {
  switch (action.type) {
    case "reset":
      return init(action.payload);
    case "playMove":
      return playMove(action.payload, grid, player, winner);
    default:
      throw new Error();
  }
}

function Playboard({ sizeParameter, id, ...props }) {
  const [{ grid, player, winner, size }, dispatch] = useReducer(
    reducer,
    { size, id },
    init
  );

  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const handleReplayOnPress = useCallback(() => {
    if (winner) {
      dispatch({ type: "reset", payload: size, winner });
    }
  }, [size, winner]);

  const handleCellOnPress = (id) => {
    dispatch({ type: "playMove", payload: id });
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
