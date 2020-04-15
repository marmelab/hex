import fetch from "isomorphic-unfetch";
import { useState } from "react";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { NO_PLAYER_VALUE } from "../../engine/player";

export const GAME_URI = "http://localhost:3000/api/games";
export const ONLINE_PATHNAME = "/board/online";

export default function OnlineBoardPage({ initialGame }) {
  const [game, setGame] = useState(initialGame);

  const onMovePlayed = ({ cellIndex }) => {
    if (canPlayMove(cellIndex, game)) {
      fetch(`${GAME_URI}/${game.uuid}`, {
        method: "PATCH",
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
 * Check if the move is legal.
 *
 * @param {integer} index
 * @param {Object} game
 */
function canPlayMove(index, game) {
  return game.grid[index] === NO_PLAYER_VALUE && !game.winner;
}
