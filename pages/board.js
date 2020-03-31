import { useRouter } from "next/router";
import { Text } from "@chakra-ui/core";

import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";
import { LIGHT_COLOR_100, LIGHT_COLOR_500 } from "../theme/colors";

const PLAYER1 = 1;
const PLAYER2 = 2;

const Board = props => {
  const { query } = useRouter();

  if (!query.size) {
    return null;
  }

  const currentPlayer = PLAYER1;

  return (
    <>
      <Layout
        content={<Playboard size={parseInt(query.size, 10)} />}
        aside={
          <div className="hud">
            <Text
              name="current-player"
              className="hud-current-player"
            >
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
