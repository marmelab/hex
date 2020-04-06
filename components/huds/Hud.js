import React from "react";
import {
  FIRST_PLAYER_COLOR,
  SECOND_PLAYER_COLOR,
  DARK_COLOR_100,
  LIGHT_COLOR_100,
} from "../../theme/colors";
import {
  FIRST_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
  NO_PLAYER_VALUE,
} from "../../engine/player";
import ReplayButton from "./ReplayButton";
import { Flex } from "@chakra-ui/core";

function switchColor(player, winner) {
  const colorSetFirstPlayer = {
    color: FIRST_PLAYER_COLOR,
    colorFont: LIGHT_COLOR_100,
  };
  const colorSetSecondPlayer = {
    color: SECOND_PLAYER_COLOR,
    colorFont: DARK_COLOR_100,
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

function Hud({ player, winner, onReplayOnPress }) {
  const { color, colorFont } = switchColor(player, winner);

  return (
    <div className="hud">
      <p name="current-player" className="hud-current-player">
        {winner === NO_PLAYER_VALUE
          ? `Player ${player}, it's your turn.`
          : `Won by player ${winner}`}
      </p>
      {winner ? (
        <Flex align="center" justify="center" p="25%" w="100%">
          <ReplayButton onClick={handleReplayOnPress()} />
        </Flex>
      ) : null}
      <style jsx>{`
        .hud {
          background: ${color};
          border-radius: 5%;
          display: flex;
          flex-wrap: wrap;
          padding: 10%;
        }

        .hud-current-player {
          font-size: 1.2vw;
          color: ${colorFont};
          width: 100%;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Hud;
