import React from "react";
import {
  FIRST_PLAYER_COLOR,
  SECOND_PLAYER_COLOR,
  LIGHT_COLOR_100,
  WINNING_COLOR,
  DARK_COLOR_100,
} from "../../theme/colors";
import {
  FIRST_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
  WINNER_LINE_VALUE,
} from "../../engine/player";

function getColor(value, focus) {
  if (focus) {
    return DARK_COLOR_100;
  }

  if (value === FIRST_PLAYER_VALUE) {
    return FIRST_PLAYER_COLOR;
  } else if (value === SECOND_PLAYER_VALUE) {
    return SECOND_PLAYER_COLOR;
  } else if (value === WINNER_LINE_VALUE) {
    return WINNING_COLOR;
  } else {
    return LIGHT_COLOR_100;
  }
}

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

export default Hexagon;
