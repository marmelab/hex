import React from "react";
import { LIGHT_COLOR_500, LIGHT_COLOR_100 } from "../../theme/colors";
import { Text } from "@chakra-ui/core";

function Hud({ player }) {
  return (
    <div className="hud">
      <Text name="current-player" className="hud-current-player">
        Player {player}
      </Text>

      <style jsx>{`
        .hud {
          background: ${LIGHT_COLOR_100};
          border-radius: 5%;
          display: flex;
          padding: 5px;
        }

        .hud-current-player {
          color: ${LIGHT_COLOR_500};
        }
      `}</style>
    </div>
  );
}

export default Hud;
