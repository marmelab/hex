import fetch from "isomorphic-unfetch";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { useState } from "react";

export const GAME_URI = "http://localhost:3000/api/games";
export const ONLINE_PATHNAME = "/board/online";

export default function OnlineBoardPage({ initialGame }) {
  const [game, setGame] = useState(initialGame);

  const apply = ({ type, payload }) => {
    manageActions(type, payload, game)
      .then(function (updatedGame) {
        setGame(updatedGame);
      })
      .catch(function (message) {
        throw `Error during game actions : ${message}`;
      });
  };

  return (
    <Layout
      content={
        <Playboard
          apply={apply}
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
 *
 * @param {integer} cellIndex
 * @param {Object} game
 * @@returns {Promise}
 */
function playMove(cellIndex, game) {
  const { grid, player, winner, uuid } = game;

  if (grid[cellIndex] !== 0 || winner) {
    return game;
  }

  return fetch(`${GAME_URI}/${uuid}`, {
    method: "PATCH",
    body: JSON.stringify({ cellIndex, player }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (game) {
      return game;
    })
    .catch(function (error) {
      return error;
    });
}

/**
 * This function deals with each available actions.
 *
 * @param {string} type
 * @param {Object} payload
 */
function manageActions(type, payload, game) {
  switch (type) {
    case "PlayMove":
      return playMove(payload, game);
  }
}
