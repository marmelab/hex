import React from "react";
import {
  FIRST_PLAYER_COLOR,
  SECOND_PLAYER_COLOR,
  DARK_COLOR_100,
  LIGHT_COLOR_500,
  LIGHT_COLOR_100
} from "../../theme/colors";
import { FIRST_PLAYER_VALUE, SECOND_PLAYER_VALUE } from "../../engine/player";

function switchColor(player, winner) {
  const colorSetFirstPlayer = {
    color: FIRST_PLAYER_COLOR,
    colorFont: LIGHT_COLOR_100
  };
  const colorSetSecondPlayer = {
    color: SECOND_PLAYER_COLOR,
    colorFont: DARK_COLOR_100
  };

  if (winner === SECOND_PLAYER_VALUE) {
    return colorSetSecondPlayer;
  } else if (winner === FIRST_PLAYER_VALUE) {
    return colorSetFirstPlayer;
  }

  if (player === FIRST_PLAYER_VALUE) {
    return colorSetFirstPlayer;
  } else if (player === SECOND_PLAYER_VALUE) {
    return colorSetSecondPlayer;
  }
}

function Hud({ player, winner }) {
  const { color, colorFont } = switchColor(player, winner);

  return (
    <div className="hud">
      <p name="current-player" className="hud-current-player">
        {winner === 0
          ? `Player ${player}, it's your turn.`
          : `Won by player ${winner}`}
      </p>
      <style jsx>{`
        .hud {
          background: ${color};
          border-radius: 5%;
          display: flex;
          flex-wrap: wrap;
          padding: 20%;
        }

        .hud-current-player {
          font-size: 1vw;
          color: ${colorFont};
          width: 100%;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Hud;
