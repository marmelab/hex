import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import { getBaseUrl } from "..";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { canPlayMove, cleanHints } from "../../engine/game";
import { getToken, NO_PLAYER_VALUE } from "../../engine/player";

export const ONLINE_PATHNAME = "/board/online";

export default function OnlineBoardPage({ initialGame, baseUrl }) {
  const [game, setGame] = useState(initialGame);
  const [hint, setHint] = useState(null);

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

        const updatedGame = await response.json();
        setGame(updatedGame);
      } catch (message) {
        throw `Error during moving : ${message}`;
      }
    }
  };

  const onHintAsked = async () => {
    if (game.winner === NO_PLAYER_VALUE) {
      const hint = game;
      hint.grid = cleanHints(game.grid);

      try {
        const res = await fetch(`${baseUrl}/api/hints`, {
          method: "POST",
          body: JSON.stringify({ grid: hint.grid, player: hint.player }),
        });

        const { grid } = await res.json();
        hint.grid = grid;
      } catch (error) {
        throw "Unable to get hint.";
      }

      setHint(hint);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (hint !== null) {
          setGame(hint);
          setHint(null);
        } else {
          const updatedGame = await getGame(baseUrl, game.uuid);
          setGame(updatedGame);
        }
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
          onHintAsked={onHintAsked}
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
