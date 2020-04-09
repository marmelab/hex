import { getGameRepository } from "../../models/games/gameRepository";

export default (req, res) => {
  if (req.method === "POST") {
    const { player1_nickname, grid } = req.body;

    getGameRepository()
      .create({
        player1_nickname,
        grid,
      })
      .then((game) => {
        res.status(200).json(game);
      });
  } else if (req.method === "GET") {
    getGameRepository()
      .findAll({
        where: {
          player2_nickname: null,
        },
      })
      .then((game) => {
        res.status(200).json(game);
      });
  }
};
