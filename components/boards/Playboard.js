import React, { useState, useCallback, useReducer, initialState } from "react";
import Hexagon from "./Hexagon";
import BottomBoard from "./BottomBoard";
import {
  getBoardRatio,
  getHexagonHeight,
  getHexagonWidth,
  calculateLeftPosition,
  calculateTopPosition,
} from "./position.js";
import Hud from "../huds/Hud";
import { generateEmptyGrid } from "../../engine/grid";
import {
  FIRST_PLAYER_VALUE,
  WINNER_LINE_VALUE,
  NO_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
} from "../../engine/player";
import { getWinningPath } from "../../engine/game";
import { Flex, Box } from "@chakra-ui/core";
import ReplayButton from "../buttons/ReplayButton";

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
 * @param {int} size
 */
function init(size) {
  return {
    winner: NO_PLAYER_VALUE,
    player: FIRST_PLAYER_VALUE,
    grid: generateEmptyGrid(size),
  };
}

function updateGrid(id, state) {
  if (state.grid[id] !== 0 || state.winner) {
    return;
  }
  const updatedGrid = state.grid.map((hexagon, index) =>
    id === index ? state.player : hexagon
  );

  const winningPath = getWinningPath(updatedGrid, state.player);

  if (winningPath) {
    const winningGrid = state.grid.map(function (value, index) {
      if (hexagonIndexIsInPath(winningPath, index)) {
        return WINNER_LINE_VALUE;
      }

      return { player, grid: winningGrid, winner };
    });
  }

  const player = FIRST_PLAYER_VALUE ? SECOND_PLAYER_VALUE : FIRST_PLAYER_VALUE;

  return { player, grid: updatedGrid, winner: state.winner };
}

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return init(action.payload);
    case "updateGrid":
      return updateGrid(action.payload, state);
    default:
      throw new Error();
  }
}

function Playboard({ size }) {
  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const [state, dispatch] = useReducer(reducer, size, init);

  const handleReplayOnPress = useCallback(() => {
    if (winner) {
      dispatch({ type: "reset", payload: size });
    }
  }, [size, state.winner]);

  const handleCellOnPress = (id) => {
    dispatch({ type: "updateGrid", payload: id });
  };

  return (
    <>
      <Flex
        className="container"
        align="center"
        justify="center"
        position="relative"
        h="75vh"
        m="10vw"
        w="65vw"
        _after={{
          content: "",
          display: "block",
          paddingBottom: `${boardRatio} * 100%`,
        }}
      >
        <BottomBoard
          size={size}
          hexagonHeight={hexagonHeight}
          hexagonWidth={hexagonWidth}
        />

        <Box name="grid" position="absolute" width="100%" height="100%">
          {state.grid.map((value, index) => {
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
                onClick={() => handleCellOnPress(index, state.player)}
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

      <Flex w="25vw" className="side">
        <Hud player={state.player} winner={state.winner} />

        {state.winner ? (
          <Flex
            align="center"
            justify="center"
            flexWrap="wrap"
            p="1vw"
            w="100%"
          >
            <ReplayButton onClick={handleReplayOnPress} />
          </Flex>
        ) : null}
      </Flex>
    </>
  );
}

export default Playboard;
