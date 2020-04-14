import { getGameRepository } from "../../../models/games/gameRepository";
import { getCurrentPlayer } from "../../../engine/player";

export default (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      return get(req, res);
    case "PUT":
      return put(req, res);
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

      return res.status(200).json(game.dataValues);
    });
}

function put(req, res) {
  const { firstPlayerNickname, grid } = JSON.parse(req.body);

  getGameRepository()
    .create({ firstPlayerNickname, grid })
    .then((game) => {
      game.currentPlayer = getCurrentPlayer(grid);
      return res.status(200).json(game);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

function patch(req, res) {
  const {
    query: { uuid },
  } = req;

  const { secondPlayerNickname } = JSON.parse(req.body);

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
          return res.status(200).json(game);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}
