import React from "react";
import Hexagon from "./Hexagon";
import ButtomBoard from "./BottomBoard";
import {
  getBoardRatio,
  getHexagonHeight,
  getHexagonWidth,
  calculateLeftPosition,
  calculateTopPosition
} from "./tools.js";

function Playboard(props) {
  const size = props.size;

  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const hexagons = () => {
    const board = [...Array(size)];

    return (
      <div
        className="container"
        style={{
          width: "60vw",
          position: "relative"
        }}
      >
        <ButtomBoard
          style={{
            position: "absolute",
            top: "-6.1%",
            right: "-5%",
            bottom: "-6.1%",
            left: "-5%"
          }}
        ></ButtomBoard>
        <div name="grid" style={{ position: "absolute", width: "100%", height: "100%" }}>
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
          .container:after {
            content: "";
            display: block;
            padding-bottom: ${boardRatio * 100}%;
          }
        `}</style>
      </div>
    );
  };

  return hexagons();
}

export default Playboard;
