import { useRouter } from "next/router";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { getGameById } from "../../components/forms/storage";
import { NO_PLAYER_VALUE, getCurrentPlayer } from "../../engine/player";


export const OFFLINE_PATHNAME = "/board/offline";

export default function OfflineBoardPage() {
  const router = useRouter();
  const id = router.query.id;

  if (!id) {
    return null;
  }
  const savedGame = getGameById(id);

  const grid = JSON.parse(savedGame.grid);
  const size = Math.sqrt(grid.length);
  const winner = NO_PLAYER_VALUE;
  const player = getCurrentPlayer(grid, winner);

  const game = { grid, size, player, winner };

  return (
    <Layout
      content={
        <Playboard game={game} w="100vw" marginTop="15vh" marginBottom="15vh" />
      }
    />
  );
}
