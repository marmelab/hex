import { Flex, Text } from "@chakra-ui/core";
import React from "react";
import {
  FIRST_PLAYER_VALUE,
  NO_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
} from "../../engine/player";
import {
  DARK_COLOR_100,
  FIRST_PLAYER_COLOR,
  LIGHT_COLOR_100,
  SECOND_PLAYER_COLOR,
} from "../../theme/colors";

function Hud({ player, winner, ...props }) {
  if (!player || !winner) {
    return null;
  }

  const { color, colorFont } = switchColor(player, winner);

  return (
    <Flex borderRadius="md" justifyContent="center" height="8vh" {...props}>
      <Text
        bg={color}
        color={colorFont}
        fontSize="1em"
        fontWeight="bold"
        display="flex"
        p="5%"
        textAlign="center"
      >
        {winner === NO_PLAYER_VALUE
          ? `Player ${player}, it's your turn.`
          : `Won by player ${winner}`}
      </Text>
    </Flex>
  );
}

export default Hud;

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
