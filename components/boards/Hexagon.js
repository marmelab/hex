import React from "react";
import { HINT_VALUE } from "../../engine/minimax";
import {
  FIRST_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
  WINNER_LINE_VALUE,
} from "../../engine/player";
import {
  DARK_COLOR_100,
  FIRST_PLAYER_COLOR,
  HINT_COLOR,
  LIGHT_COLOR_100,
  SECOND_PLAYER_COLOR,
  WINNING_COLOR,
} from "../../theme/colors";

function Hexagon(props) {
  return (
    <svg
      tabIndex="0"
      viewBox="0 0 168.77689 194.88675"
      {...props}
      style={{
        position: "absolute",
        cursor: "pointer",
        ...props.style,
      }}
    >
      <polygon
        fill={getColor(props.value)}
        stroke="#2f404d"
        strokeWidth={10}
        points="52,16.861561 148,16.861561 196,100 148,183.13844 52,183.13844 4,100 "
        transform="rotate(-90,90.915907,106.52747)"
      />
    </svg>
  );
}

/**
 * Get color by value.
 *
 * @param {integer} value
 * @param {integer} focus
 */
const getColor = (value, focus) => {
  if (focus) {
    return DARK_COLOR_100;
  }

  switch (value) {
    case FIRST_PLAYER_VALUE:
      return FIRST_PLAYER_COLOR;

    case SECOND_PLAYER_VALUE:
      return SECOND_PLAYER_COLOR;

    case WINNER_LINE_VALUE:
      return WINNING_COLOR;

    case HINT_VALUE:
      return HINT_COLOR;

    default:
      return LIGHT_COLOR_100;
  }
};

export default Hexagon;
