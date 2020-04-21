import fetch from "isomorphic-unfetch";
import { baseUrlSingleton } from ".";
import { getToken } from "../../engine/player";

const GAMES_URI = "/api/games";

/**
 * Get complete games URI, with or without UUID.
 *
 * @param {string} uuid
 */
const getGamesUri = (uuid) => {
  const gamesUri = `${baseUrlSingleton()}${GAMES_URI}`;

  if (uuid) {
    return `${gamesUri}${uuid}`;
  }

  return gamesUri;
};

/**
 * Get all games.
 */
export const getGames = async () => {
  const res = await fetch(getGamesUri());
  return res.json();
};

/**
 * Fetch API to get a game based on UUID provided as parameter.
 *
 * @param {string} uuid
 */
export const getGame = async (uuid) => {
  const res = await fetch(getGamesUri(uuid));
  return res.json();
};

/**
 * Create a new game.
 *
 * @param {string} grid
 * @param {string} firstPlayerNickname
 */
export const createGame = async (grid, firstPlayerNickname) => {
  const res = await fetch(getGamesUri(), {
    method: "POST",
    body: JSON.stringify({
      grid,
      firstPlayerNickname,
      winner: NO_PLAYER_VALUE,
    }),
  });
  return res.json();
};

/**
 * Updates a game to add the second player.
 *
 * @param {Object} secondPlayer
 * @param {string} uuid
 */
export const addSecondPlayer = async (uuid, secondPlayerNickname) => {
  const res = await fetch(getGamesUri(uuid), {
    method: "PATCH",
    body: JSON.stringify({ secondPlayerNickname }),
  });
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
  const res = await fetch(getGamesUri(uuid), {
    method: "PATCH",
    headers: { token: getToken(uuid) },
    body: JSON.stringify(payload),
  });
  return res.json();
};
