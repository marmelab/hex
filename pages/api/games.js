import { getGameRepository } from "../../models/games/gameRepository";

export const GAME_URI = "http://localhost:3000/api/games";

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
      return res.status(200).json(game);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

function post(req, res) {
  const { firstPlayerNickname, grid, winner } = JSON.parse(req.body);
  getGameRepository()
    .create({ firstPlayerNickname, grid, winner, secondPlayerNickname: null })
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}
