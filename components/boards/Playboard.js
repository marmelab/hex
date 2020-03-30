import React from "react";
import Hexagon from "./Hexagon";
import BottomBoard from "./BottomBoard";
import {
  getBoardRatio,
  getHexagonHeight,
  getHexagonWidth,
  calculateLeftPosition,
  calculateTopPosition
} from "./position.js";

function Playboard(props) {
  const size = props.size;

  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const board = [...Array(size)];

  return (
    <div className="container">
      <BottomBoard
        size={size}
        hexagonHeight={hexagonHeight}
        hexagonWidth={hexagonWidth}
      />

      <div name="grid" className="hexagons-grid">
        {board.map((e, rowIndex) => {
          return board.map((x, columnIndex) => {
            const top = calculateTopPosition(rowIndex, hexagonHeight);
            const left = calculateLeftPosition(
              columnIndex,
              rowIndex,
              hexagonWidth
            );

            return (
              <Hexagon
                color={"#e2dddf"}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${hexagonWidth}%`,
                  height: `${hexagonHeight}%`
                }}
              />
            );
          });
        })}
      </div>
      <style jsx>{`
        .container {
          width: 60vw;
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
      `}</style>
    </div>
  );
}

export default Playboard;
