import React, { useState, useEffect } from "react";
import Hexagon from "./Hexagon";
import BottomBoard from "./BottomBoard";
import {
  getBoardRatio,
  getHexagonHeight,
  getHexagonWidth,
  calculateLeftPosition,
  calculateTopPosition
} from "./position.js";
import Hud from "../huds/Hud";

export const FIRST_PLAYER_VALUE = 1;
export const SECOND_PLAYER_VALUE = 2;

function Playboard(props) {
  const size = props.size;

  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const [grid, setGrid] = useState(Array(props.size * props.size).fill(0));
  const [player, setPlayer] = useState(FIRST_PLAYER_VALUE);

  const handleCellOnPress = (id, player) => {
    if (grid[id] !== 0) {
      return;
    }
    const updatedGrid = grid.map((hexagon, index) =>
      id === index ? player : hexagon
    );
    setGrid(updatedGrid);
    setPlayer(player === 1 ? 2 : 1);
  };

  useEffect(() => {}, [grid]);

  return (
    <>
      <div className="container">
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
                  width: `${hexagonWidth}%`,
                  height: `${hexagonHeight}%`
                }}
                name={`hexagon_${index}`}
                value={value}
              />
            );
          })}
        </div>

        <div className="side">
          {<Hud player={player} />}
        </div>

        <style jsx>{`
          .container {
            width: 62vw;
            position: relative;
          }

          .container:after {
            content: "";
            display: block;
            padding-bottom: ${boardRatio * 100}%;
          }

          .hexagons-grid {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .side {
            display: flex;
            align-items: right;
            justify-content: right;
            heigth: 100%;
          }
        `}</style>
      </div>
    </>
  );
}

export default Playboard;
