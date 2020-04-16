import { applyMoveOnGame } from "../../../engine/game";
import { generateToken, getCurrentPlayer } from "../../../engine/player";
import {
  getGameByUuid,
  getGameRepository,
} from "../../../models/games/gameRepository";

export default (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      return get(req, res);
    case "PATCH":
      return patch(req, res);
  }
};

const get = async (req, res) => {
  const {
    query: { uuid },
  } = req;

  try {
    const game = await getGameRepository().findOne({ where: { uuid: uuid } });
    const grid = JSON.parse(game.grid);

    game.dataValues.player = getCurrentPlayer(grid, game.winner);
    game.dataValues.grid = grid;

    res.status(200).json(game.dataValues);
  } catch (error) {
    res.status(404).json(error);
  }
};

const patch = (req, res) => {
  const {
    query: { uuid },
    headers: { token },
  } = req;

  const { secondPlayerNickname, cellIndex, player } = JSON.parse(req.body);

  if (secondPlayerNickname) {
    updateSecondPlayerNickname(secondPlayerNickname, uuid, res);
  }

  if (token === generateToken(player, uuid)) {
    if (cellIndex >= 0 && player) {
      playMove(player, cellIndex, uuid, res);
    }
    res.status(401);
  }
};

/**
 * This function will update a game state, save it and return it into a JSON response.
 *
 * @param {integer} currentPlayer
 * @param {integer} cellIndex
 * @param {uuid} uuid
 * @param {Object} res
 */
const playMove = async (currentPlayer, cellIndex, uuid, res) => {
  try {
    const game = await getGameByUuid(uuid);

    game.grid = JSON.parse(game.grid);
    const updatedGame = applyMoveOnGame(
      game.dataValues,
      currentPlayer,
      cellIndex
    );
    updatedGame.grid = JSON.stringify(updatedGame.grid);

    const { grid, player, winner } = updatedGame;

    await getGameRepository().update(
      { grid, player, winner },
      { where: { uuid: uuid } }
    );

    updatedGame.grid = JSON.parse(updatedGame.grid);
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(404).json(error);
  }
};

/**
 *
 * @param {string} secondPlayerNickname
 * @param {string} uuid
 * @param {Object} res
 */
const updateSecondPlayerNickname = async (secondPlayerNickname, uuid, res) => {
  try {
    await getGameRepository().update(
      { secondPlayerNickname },
      { where: { uuid: uuid } }
    );
    const game = await getGameByUuid(uuid);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json(error);
  }
};
