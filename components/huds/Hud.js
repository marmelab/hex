import React from "react";
import {
  FIRST_PLAYER_COLOR,
  SECOND_PLAYER_COLOR,
  DARK_COLOR_100,
  LIGHT_COLOR_500,
  LIGHT_COLOR_100
} from "../../theme/colors";
import { FIRST_PLAYER_VALUE } from "../../engine/player";

function Hud({ player, winner }) {
  const color =
    player == FIRST_PLAYER_VALUE || winner == FIRST_PLAYER_VALUE
      ? FIRST_PLAYER_COLOR
      : SECOND_PLAYER_COLOR;

  const colorFont =
    player == FIRST_PLAYER_VALUE || winner ? LIGHT_COLOR_100 : DARK_COLOR_100;

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
          color: ${colorFont};
          width: 100%;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Hud;
