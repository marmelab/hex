import { getGameRepository } from "../../models/games/gameRepository";
import { NO_PLAYER_VALUE } from "../../engine/player";

export default (req, res) => {
  const method = req.method;

  switch (method) {
    case "POST":
      return post(req, res);

    case "GET":
      return get(res);
  }
};

function get(res) {
  getGameRepository()
    .findAll({ where: { secondPlayerNickname: null } })
    .then((game) => {
      res.status(200).json(game);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

function post(req, res) {
  const { firstPlayerNickname, grid } = JSON.parse(req.body);

  if (firstPlayerNickname && grid) {
    createGame(grid, firstPlayerNickname, res);
  }
}

/**
 * Initialize a new game in BDD.
 *
 * @param {Object} grid
 * @param {string} firstPlayerNickname
 * @param {Object} res
 */
function createGame(grid, firstPlayerNickname, res) {
  getGameRepository()
    .create({
      grid,
      firstPlayerNickname,
      secondPlayerNickname: null,
      winner: NO_PLAYER_VALUE,
    })
    .then((game) => {
      game.currentPlayer = getCurrentPlayer(grid);
      res.status(201).json(game);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}
