import React from "react";
import { FIRST_PLAYER_COLOR, SECOND_PLAYER_COLOR } from "../../theme/colors";

function getTotalWidth(hexagonWidth, size) {
  return (size - 0.25) * hexagonWidth;
}

function getBoardOffset(hexagonWidth, size) {
  return (size - 0.25) * (hexagonWidth / 2);
}

function getVerticalGutter(hexagonHeight) {
  return -0.5 * hexagonHeight;
}

function getHorizontalGutter(hexagonWidth) {
  return -1.5 * hexagonWidth;
}

function BottomBoard({ size, hexagonHeight, hexagonWidth }) {
  const topLeftCorner = "0 0";
  const topRightCorner = `${getTotalWidth(hexagonWidth, size)}% 0`;
  const bottomRightCorner = "100% 100%";
  const bottomLeftCorner = `${getBoardOffset(hexagonWidth, size)}% 100%`;

  return (
    <div className="bottom-board">
      <div className="playerSide top"></div>
      <div className="playerSide right"></div>
      <div className="playerSide bottom"></div>
      <div className="playerSide left"></div>

      <style jsx>{`
          .bottom-board{
              position: absolute;
              top: ${getVerticalGutter(hexagonHeight)}%;
              right: ${getHorizontalGutter(hexagonWidth)}%;
              bottom: ${getVerticalGutter(hexagonHeight)}%;
              left: ${getHorizontalGutter(hexagonWidth)}%;
            }}
          }
          .playerSide {
            height: 100%;
            width: 100%;
            position: absolute;
          }
          .playerSide.top {
            background-color: ${FIRST_PLAYER_COLOR};
            shape-outside: polygon(${topLeftCorner}, ${topRightCorner}, 50% 50%);
            clip-path: polygon(${topLeftCorner}, ${topRightCorner}, 50% 50%);
          }
          .playerSide.bottom {
            background-color: ${FIRST_PLAYER_COLOR};
            shape-outside: polygon(
              ${bottomLeftCorner},
              ${bottomRightCorner},
              50% 50%
            );
            clip-path: polygon(
              ${bottomLeftCorner},
              ${bottomRightCorner},
              50% 50%
            );
          }
          .playerSide.left {
            background-color: ${SECOND_PLAYER_COLOR};
            shape-outside: polygon(
              ${topLeftCorner},
              ${bottomLeftCorner},
              50% 50%
            );
            clip-path: polygon(${topLeftCorner}, ${bottomLeftCorner}, 50% 50%);
          }
          .playerSide.right {
            background-color: ${SECOND_PLAYER_COLOR};
            shape-outside: polygon(
              ${topRightCorner},
              ${bottomRightCorner},
              50% 50%
            );
            clip-path: polygon(${topRightCorner}, ${bottomRightCorner}, 50% 50%);
          }`}</style>
    </div>
  );
}

export default BottomBoard;
