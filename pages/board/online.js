import { useEffect, useState } from "react";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { canPlayMove } from "../../engine/game";
import { getGame } from "../api/gameCalls";

export const ONLINE_PATHNAME = "/board/online";

export default function OnlineBoardPage({ initialGame, baseUrl }) {
  const [game, setGame] = useState(initialGame);

  const onMovePlayed = async ({ cellIndex }) => {
    if (canPlayMove(cellIndex, game)) {
      try {
        const payload = { cellIndex, player: game.player };
        setGame(await updateGame(game.uuid, payload));
      } catch (message) {
        throw `Error during moving : ${message}`;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setGame(await getGame(game.uuid));
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
  return { props: { initialGame: getGame(context.query.id) } };
}
