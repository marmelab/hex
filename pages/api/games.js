import { getGameRepository } from "../../models/games/gameRepository";

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
    .findAll({ where: { player2_nickname: null } })
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

function post(req, res) {
  const { player1Nickname, grid } = JSON.parse(req.body);
  getGameRepository()
    .create({ player1Nickname, grid })
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}
