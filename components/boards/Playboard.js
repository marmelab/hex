import React from "react";
import Hexagon from "./Hexagon";
import { Box, Flex } from "@chakra-ui/core";
import ButtomBoard from "./BottomBoard";

function Playboard(props) {
  const size = props.size;
  const proportion = 105 / size;

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
  function calculateTopPosition(columnIndex, proportion) {
    const offset = proportion * 0.75;
    const visualOffset = 10;

    return (visualOffset + columnIndex * offset).toString() + "vh";
  }

  /*
   This function calculate, for each hexagons, the left position value.

   visualOffset is a fixed value (depends of bottomBoard visual)
   offset considers width of hexagon and strokeWidth values
  */
  function calculateLeftPosition(columnIndex, lineIndex, proportion) {
    const offset = proportion * 0.85;
    const visualOffset = 33;
    const lineOffset = (offset * columnIndex) / 2;
    return (visualOffset + lineIndex * offset + lineOffset).toString() + "vh";
  }

  const hexagons = () => {
    const iterator = [...Array(size)];

    return (
      <Flex
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "2%",
          height: "90vh",
          width: "75%"
        }}
      >
          {iterator.map((e, lineIndex) => {
            return iterator.map((x, columnIndex) => {
              const top = calculateTopPosition(columnIndex, proportion, size);
              const left = calculateLeftPosition(
                columnIndex,
                lineIndex,
                proportion,
                size
              );

              return (
                <Hexagon
                  color={"#e2dddf"}
                  left={left}
                  top={top}
                  proportion={proportion + "vh"}
                />
              );
            });
          })}
        <ButtomBoard></ButtomBoard>
      </Flex>
    );
  };

  return hexagons();
}

export default Playboard;
