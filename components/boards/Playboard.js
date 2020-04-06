import React, { useState } from "react";
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
} from "../../engine/player";
import { getWinningPath } from "../../engine/game";
import { Flex } from "@chakra-ui/core";

/**
 * Check if the index of an hexagon is in the winning path.
 *
 * @param {[]} winningPath
 * @param {int} index
 */
function hexagonIndexIsInPath(winningPath, index) {
  return _.indexOf(winningPath, (index + 1).toString(10)) >= 0;
}

function Playboard(props) {
  function reset(size) {
    setWinner(NO_PLAYER_VALUE);
    setPlayer(FIRST_PLAYER_VALUE);
    setGrid(generateEmptyGrid(size));
  }

  const size = props.size;

  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const [grid, setGrid] = useState(generateEmptyGrid(size));
  const [player, setPlayer] = useState(FIRST_PLAYER_VALUE);
  const [winner, setWinner] = useState(NO_PLAYER_VALUE);

  const handleReplayOnPress = (size, winner) => {
    if (winner) {
      reset(size);
    }
  };

  const handleCellOnPress = (id, player) => {
    if (grid[id] !== 0 || winner) {
      return;
    }
    const updatedGrid = grid.map((hexagon, index) =>
      id === index ? player : hexagon
    );
    setGrid(updatedGrid);

    const winningPath = getWinningPath(updatedGrid, player);

    if (winningPath) {
      setWinner(player);

      const winningGrid = grid.map(function (value, index) {
        if (hexagonIndexIsInPath(winningPath, index)) {
          return WINNER_LINE_VALUE;
        }

        return value;
      });

      setGrid(winningGrid);
    }

    setPlayer(player === 1 ? 2 : 1);
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

        <div name="grid" className="hexagons-grid">
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
                onClick={() => handleCellOnPress(index, player)}
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
        </div>
      </Flex>

      <Flex w="25vw" className="side">
        <Hud
          player={player}
          winner={winner}
          onReplayOnPress={() => handleReplayOnPress(size, winner)}
        />
      </Flex>

      <style jsx>{`
        .hexagons-grid {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}

export default Playboard;
