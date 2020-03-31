import { useRouter } from "next/router";
import { Text } from "@chakra-ui/core";

import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";
import { LIGHT_COLOR_100, LIGHT_COLOR_500 } from "../theme/colors";

export const FIRST_PLAYER_VALUE = 1;
export const SECOND_PLAYER_VALUE = 2;

const Board = props => {
  const { query } = useRouter();

  if (!query.size) {
    return null;
  }

  const currentPlayer = FIRST_PLAYER_VALUE;

  return (
    <>
      <Layout
        content={<Playboard size={parseInt(query.size, 10)} color />}
        aside={
          <div className="hud">
            <Text name="current-player" className="hud-current-player">
              Player {currentPlayer}
            </Text>

            <style jsx>{`
              .hud {
                background: ${LIGHT_COLOR_100};
                border-radius: 5%;
                display: flex;
                align-items: left;
                padding: 5%;
              }

              .hud-current-player {
                color: ${LIGHT_COLOR_500};
                width: 100%;
              }
            `}</style>
          </div>
        }
      />
    </>
  );
};

export default Board;
