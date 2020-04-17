import { applyMoveOnGame } from "../../../engine/game";
import { generateToken, getCurrentPlayer } from "../../../engine/player";
import { getGameRepository } from "../../../models/games/gameRepository";

export default (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      return get(req, res);
    case "PATCH":
      return patch(req, res);
  }
};

function get(req, res) {
  const {
    query: { uuid },
  } = req;

  getGameRepository()
    .findOne({
      where: {
        uuid: uuid,
      },
    })
    .then((game) => {
      const grid = JSON.parse(game.grid);

      game.dataValues.player = getCurrentPlayer(grid, game.winner);
      game.dataValues.grid = grid;

      res.status(200).json(game.dataValues);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
}

function patch(req, res) {
  const {
    query: { uuid },
    headers: { token },
  } = req;

  const { secondPlayerNickname, cellIndex, player } = JSON.parse(req.body);

  if (secondPlayerNickname) {
    updateSecondPlayerNickname(secondPlayerNickname, uuid, res);
  }

  if (token === generateToken(player, uuid)) {
    if (cellIndex && player) {
      playMove(player, cellIndex, uuid, res);
    }
    res.status(401);
  }
}

/**
 * This function will update a game state, save it and return it into a JSON response.
 *
 * @param {integer} player
 * @param {integer} cellIndex
 * @param {uuid} uuid
 * @param {Object} res
 */
function playMove(player, cellIndex, uuid, res) {
  getGameRepository()
    .findOne({
      where: {
        uuid: uuid,
      },
    })
    .then((game) => {
      game.grid = JSON.parse(game.grid);

      const updatedGame = applyMoveOnGame(game, player, cellIndex);
      updatedGame.grid = JSON.stringify(updatedGame.grid);

      updatedGame.save().then(function (updatedGame) {
        const game = updatedGame.dataValues;
        game.grid = JSON.parse(updatedGame.grid);
        game.player = updatedGame.player;

        res.status(200).json(game);
      });
    })
    .catch((message) => {
      res.status(404).json({ error: `Game not found or ${message}` });
    });
}

/**
 *
 * @param {string} secondPlayerNickname
 * @param {string} uuid
 * @param {Object} res
 */
function updateSecondPlayerNickname(secondPlayerNickname, uuid, res) {
  getGameRepository()
    .update(
      { secondPlayerNickname },
      {
        where: {
          uuid: uuid,
        },
      }
    )
    .then(() => {
      getGameRepository()
        .findOne({
          where: {
            uuid: uuid,
          },
        })
        .then((game) => {
          res.status(200).json(game);
        })
        .catch((error) => {
          res.status(404).json(error);
        });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}
