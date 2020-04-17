import { Box, Flex, PseudoBox } from "@chakra-ui/core";
import React, { useCallback } from "react";
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

function Playboard({ game, onMovePlayed, ...props }) {
  const grid = game.grid;
  const size = Math.sqrt(game.grid.length);
  const player = game.player;
  const winner = game.winner;

  const boardRatio = getBoardRatio(size);
  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const handleCellOnPress = (cellIndex) => {
    onMovePlayed({ cellIndex });
  };

  const handleReplayOnPress = useCallback(() => {
    if (winner) {
      dispatch({
        type: "reset",
        payload: { sizeParameter: size },
        winner,
      });
    }
  }, [size, winner]);

  return (
    <Flex {...props}>
      <Flex flexGrow="1" alignItems="center" justifyContent="center">
        <PseudoBox
          position="relative"
          width="70%"
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
        w="10%"
        flexWrap="wrap"
      />
    </Flex>
  );
}

export default Playboard;
