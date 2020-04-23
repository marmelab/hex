import { getHint } from "../../engine/minimax";

export default (req, res) => {
  const method = req.method;

  switch (method) {
    case "POST":
      return post(req, res);
  }
};

/**
 * Based on the grid and the player provided, an hint will be sent.
 *
 * @param {Object} req
 * @param {Object} res
 */
function post(req, res) {
  const { grid, player } = JSON.parse(req.body);

  res.status(200).json({ grid: getHint(grid, player) });
}
