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
import { Flex, Text } from "@chakra-ui/core";

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

function Hud({ player, winner }) {
  const { color, colorFont } = switchColor(player, winner);

  return (
    <Flex
      alignItems="center"
      bg={color}
      borderRadius="md"
      justifyItems="center"
      p="0.5vw"
      width="95%"
    >
      <Text
        name="current-player"
        color={colorFont}
        fontSize="1em"
        fontWeight="bold"
        p="1vw"
      >
        {winner === NO_PLAYER_VALUE
          ? `Player ${player}, it's your turn.`
          : `Won by player ${winner}`}
      </Text>
    </Flex>
  );
}

export default Hud;
