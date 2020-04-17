import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { canPlayMove } from "../../engine/game";
import { getToken } from "../../engine/player";

/* export const GAME_URI = "https://hex.chroq.now.sh/api/games"; */
export const GAME_URI = "http://localhost:3000/api/games";
export const ONLINE_PATHNAME = "/board/online";

export default function OnlineBoardPage({ initialGame }) {
  const [game, setGame] = useState(initialGame);

  const onMovePlayed = ({ cellIndex }) => {
    if (canPlayMove(cellIndex, game)) {
      fetch(`${GAME_URI}/${game.uuid}`, {
        method: "PATCH",
        headers: {
          token: getToken(game.uuid),
        },
        body: JSON.stringify({ cellIndex, player: game.player }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (game) {
          setGame(game);
        })
        .catch(function (message) {
          throw `Error during moving : ${message}`;
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getGame(game.uuid).then(function (game) {
        setGame(game);
      });
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

export async function getServerSideProps(context) {
  const res = await fetch(`${GAME_URI}/${context.query.id}`);
  const game = await res.json();
  return { props: { initialGame: game } };
}

/**
 * Fetch API to get a game based on UUID provided as parameter.
 *
 * @param {string} uuid
 */
async function getGame(uuid) {
  const res = await fetch(`${GAME_URI}/${uuid}`);
  return await res.json();
}
