import React from "react";
import Hexagon from "./Hexagon";
import ButtomBoard from "./BottomBoard";

function Playboard(props) {
  const size = props.size;
  const boardRatio =
    (1 + (size - 1) * 0.75) / (size * 0.89 + (size * 0.89 - 0.89) / 2);

  const cellWidth = 100 / (size + (size - 1) / 2);
  const cellHeight = 100 / (1 + (size - 1) * 0.75);
  /*
   This function calculate, for each hexagons, the top position value.
   Use the columnIndex (columns are drawn first).
   eg. 
     1 2 3
     1 2 3 
     1 2 3

    visualOffset is a fixed value (depends of bottomBoard visual)
    offset considers width of hexagon and strokeWidth values
   */
  function calculateTopPosition(rowIndex) {
    const offset = cellHeight * 0.75;
    const visualOffset = 0;

    return (visualOffset + rowIndex * offset).toString() + "%";
  }

  /*
   This function calculate, for each hexagons, the left position value.

   visualOffset is a fixed value (depends of bottomBoard visual)
   offset considers width of hexagon and strokeWidth values
  */
  function calculateLeftPosition(columnIndex, rowIndex) {
    const lineOffset = (rowIndex * cellWidth) / 2;

    return (lineOffset + cellWidth * columnIndex).toString() + "%";
  }

  const hexagons = () => {
    const iterator = [...Array(size)];

    return (
      <div
        className="container"
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "50vw",
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
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          {iterator.map((e, rowIndex) => {
            return iterator.map((x, columnIndex) => {
              const top = calculateTopPosition(rowIndex);
              const left = calculateLeftPosition(
                columnIndex,
                rowIndex,
                cellWidth,
                size
              );

              return (
                <Hexagon
                  color={"#e2dddf"}
                  style={{
                    top,
                    left,
                    width: cellWidth + "%",
                    height: cellHeight + "%"
                  }}
                />
              );
            });
          })}
        </div>

        <style jsx>{`
          .container {
            border: 1px red solid;
          }
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
