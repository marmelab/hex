import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Playboard from "../../components/boards/Playboard";
import {
  getGameById,
  getGamesFromLocalStorage,
  setGamesInLocalStorage,
} from "../../components/forms/storage";
import Layout from "../../components/layouts/Layout";
import { applyMoveOnGame, canPlayMove } from "../../engine/game";
import { getCurrentPlayer, NO_PLAYER_VALUE } from "../../engine/player";

export const OFFLINE_PATHNAME = "/board/offline";

export default function OfflineBoardPage() {
  const id = useRouter().query.id;

  const [game, setGame] = useState(null);

  useEffect(
    function () {
      if (id && game === null) {
        setGame(getGameById(id));
      }
    },
    [id, game, setGame, getGameById]
  );

  const onMovePlayed = ({ cellIndex }) => {
    if (canPlayMove(cellIndex, game)) {
      const player = getCurrentPlayer(game.grid, game.winner);
      const updatedGame = applyMoveOnGame(game, player, cellIndex);
      saveCurrentGame(
        id,
        updatedGame.grid,
        updatedGame.player,
        updatedGame.winner
      );
      setGame(updatedGame);
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

/**
 * Save the current game and add it to the current pool of saved games.
 *
 * @param {String} gameId
 * @param {Array} grid
 * @param {int} player
 */
function saveCurrentGame(gameId, grid, player, winner) {
  const games = getGamesFromLocalStorage();

  const currentGame = games.find(function (game) {
    return game.id === gameId;
  });

  if (!currentGame) {
    const newSave = {
      id: gameId,
      grid: JSON.stringify(grid),
      player,
      winner: NO_PLAYER_VALUE,
    };
    games.push(newSave);
  } else {
    currentGame.grid = JSON.stringify(grid);
    currentGame.player = player;
    currentGame.winner = winner;
  }

  setGamesInLocalStorage(games);
}
