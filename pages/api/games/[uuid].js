import { getGameRepository } from "../../../models/games/gameRepository";
import {
  getCurrentPlayer,
  WINNER_LINE_VALUE,
  NO_PLAYER_VALUE,
  FIRST_PLAYER_VALUE,
  SECOND_PLAYER_VALUE,
} from "../../../engine/player";
import { getWinningPath } from "../../../engine/game";

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
  } = req;

  const { secondPlayerNickname, cellIndex, player } = JSON.parse(req.body);

  if (secondPlayerNickname) {
    updateSecondPlayerNickname(secondPlayerNickname, uuid, res);
  }

  if (cellIndex && player) {
    playMove(player, cellIndex, uuid, res);
  }
}

/**
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
      const grid = JSON.parse(game.grid);

      if (game.secondPlayerNickname && player === getCurrentPlayer(grid)) {
        const updatedGrid = grid.map((hexagon, index) =>
          cellIndex === index ? player : hexagon
        );

        const winningPath = getWinningPath(updatedGrid, player);
        if (winningPath) {
          game = getWonGame(game, grid, player);
        } else {
          game.player = getNextPlayer(player);
          game.grid = JSON.stringify(updatedGrid);
        }

        game.save().then(function (updatedGame) {
          updatedGame.grid = JSON.parse(updatedGame.grid);

          res.status(200).json(updatedGame);
        });
      } else {
        res.status(400).json({ error: "NO_SECOND_PLAYER_OR_NOT_YOUR_TURN" });
      }
    })
    .catch((message) => {
      res.status(404).json({ error: `Game not found or ${message}` });
    });
}

/**
 * This function returns the Game object with an updated winning grid.
 * Also set the current player as "no player" and the winner as current player
 *
 * @param {Object} game
 * @param {Array} grid
 */
function getWonGame(game, grid, player) {
  game.grid = JSON.stringify(
    grid.map(function (value, index) {
      return hexagonIndexIsInPath(winningPath, index)
        ? WINNER_LINE_VALUE
        : value;
    })
  );

  game.player = NO_PLAYER_VALUE;
  game.winner = player;

  return game;
}

/**
 * Check if the index of an hexagon is in the winning path.
 *
 * @param {[]} winningPath
 * @param {int} index
 */
function hexagonIndexIsInPath(winningPath, index) {
  return _.indexOf(winningPath, (index + 1).toString(10)) >= 0;
}

/**
 * Determines who will play next.
 *
 * @param {*} player
 */
function getNextPlayer(player) {
  return player === FIRST_PLAYER_VALUE
    ? SECOND_PLAYER_VALUE
    : FIRST_PLAYER_VALUE;
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
