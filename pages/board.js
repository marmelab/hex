import { useRouter } from "next/router";
import { Badge, Heading, Text } from "@chakra-ui/core";

import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";
import { lighterColor, lightColor } from "../theme/colors";

const player1 = 1;
const player2 = 2;

const Board = props => {
  const { query } = useRouter();

  if (!query.size) {
    return null;
  }

  const currentPlayer = player1;

  return (
    <>
      <Layout
        content={<Playboard size={parseInt(query.size, 10)} />}
        aside={
          <div className="hud">
            <Text
              name="current-player"
              className="hud-current-player"
              fontSize={20}
            >
              Player {currentPlayer}
            </Text>

            <style jsx>{`
              .hud {
                background: ${lighterColor};
                border-radius: 5%;
                display: flex;
                align-items: left;
                padding: 5%;
              }

              .hud-current-player {
                color: ${lightColor};
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
