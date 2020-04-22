import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import { getBaseUrl } from "..";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { canPlayMove } from "../../engine/game";
import { getToken } from "../../engine/player";

export const ONLINE_PATHNAME = "/board/online";

export default function OnlineBoardPage({ initialGame, baseUrl }) {
  const [game, setGame] = useState(initialGame);

  const onMovePlayed = async ({ cellIndex }) => {
    if (canPlayMove(cellIndex, game)) {
      try {
        const response = await fetch(`${baseUrl}/api/games/${game.uuid}`, {
          method: "PATCH",
          headers: {
            token: getToken(game.uuid),
          },
          body: JSON.stringify({ cellIndex, player: game.player }),
        });

        console.log(response);

        const updatedGame = await response.json();
        setGame(updatedGame);
      } catch (message) {
        throw `Error during moving : ${message}`;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedGame = await getGame(baseUrl, game.uuid);

        setGame(updatedGame);
      } catch (error) {
        throw error;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [game]);

  if (!game) {
    return null;
  }

  return (
    <Layout
      content={
        <Playboard
          onMovePlayed={onMovePlayed}
          game={game}
          w="100vw"
          marginTop="15vh"
          marginBottom="15vh"
        />
      }
    />
  );
}

export async function getServerSideProps({ req, ...context }) {
  const baseUrl = getBaseUrl(req);
  const uri = `${baseUrl}/api/games/${context.query.id}`;

  const res = await fetch(uri);
  const game = await res.json();
  return { props: { initialGame: game, baseUrl } };
}

/**
 * Fetch API to get a game based on UUID provided as parameter.
 *
 * @param {string} uuid
 */
const getGame = async (baseUrl, uuid) => {
  const res = await fetch(`${baseUrl}/api/games/${uuid}`);
  return res.json();
};
