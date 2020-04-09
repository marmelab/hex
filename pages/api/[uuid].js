export default (req, res) => {
  const method = req.method;

  switch (method) {
    case "PUT":
      return put(req, res);
    case "PATCH":
      return patch(req, res);
  }
};

function put(req, res) {
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

function patch(req, res) {
  const {
    query: { uuid },
  } = req;

  const { player2Nickname } = JSON.parse(req.body);

  getGameRepository()
    .update(
      { player2Nickname },
      {
        where: {
          uuid: uuid,
        },
      }
    )
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}
