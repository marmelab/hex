import fetch from "isomorphic-unfetch";
import { baseUrlSingleton } from ".";
import { getToken } from "../../engine/player";

const GAMES_URI = "/api/games";

/**
 * Get all games.
 */
export const getGames = async () => {
  const res = await fetch(`${baseUrlSingleton()}${GAMES_URI}`);
  return res.json();
};

/**
 * Fetch API to get a game based on UUID provided as parameter.
 *
 * @param {string} uuid
 */
export const getGame = async (uuid) => {
  const res = await fetch(`${baseUrlSingleton()}${GAMES_URI}${uuid}`);
  return res.json();
};

/**
 * Partial update (patch) of a game state.
 * Set the token player in headers.
 *
 * @param {string} uuid
 * @param {Object} payload
 */
export const updateGame = async (uuid, payload) => {
  const res = await fetch(`${baseUrlSingleton()}${GAMES_URI}${uuid}`, {
    method: "PATCH",
    headers: {
      token: getToken(uuid),
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
