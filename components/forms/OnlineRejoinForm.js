import { Button, FormLabel, Input, Select } from "@chakra-ui/core";
import { Formik } from "formik";
import _ from "lodash";
import Router from "next/router";
import { ONLINE_PATHNAME, GAME_URI } from "../../pages/board/online";

export default function OnlineRejoinForm({ games, ...props }) {
  const firstGameId = games && games.length > 0 ? _.first(games).uuid : "0";
  const nickname = undefined;

  const options = getOptions(games);
  return (
    <Formik
      initialValues={{ gameId: firstGameId, nickname }}
      onSubmit={(values) => {
        addSecondPlayer(values.secondPlayerNickname, values.gameId).then(
          function () {
            Router.push({
              pathname: ONLINE_PATHNAME,
              query: {
                id: values.gameId,
              },
            });
          }
        )
        .catch(function(message){
          throw ("Error in form:", message);
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="secondPlayerNickname">Your nickname</FormLabel>
          <Input
            id="secondPlayerNickname"
            onChange={handleChange}
            value={values.nickname}
            tabIndex="0"
          ></Input>

          <FormLabel htmlFor="load-game-select">Choose a game</FormLabel>
          <Select
            onChange={handleChange}
            value={values.gameId}
            tabIndex="0"
            name="gameId"
            id="load-game-select"
          >
            {options()}
          </Select>
          <Button
            mt={4}
            variantColor="teal"
            type="submit"
            disabled={firstGameId === "0"}
          >
            Rejoin
          </Button>
        </form>
      )}
    </Formik>
  );
}

/**
 * Updates selected game to add the second player.
 *
 * @param {Object} secondPlayer
 * @param {string} id
 */
function addSecondPlayer({ secondPlayer }, id) {
  return fetch(`${GAME_URI}/${id}`, {
    method: "patch",
    body: JSON.stringify(secondPlayer),
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      return error;
    });
}

/**
 * Generates options based on the array of games provided.
 *
 *
 * @param {Array} games
 */
function getOptions(games) {

  console.log(games);
  return games
    ? () => {
        return games.map((game, index) => {
          const size = Math.sqrt(JSON.parse(game.grid).length);

          return (
            <option key={index} value={game.uuid}>
              Play with {game.firstPlayerNickname} - size {size}x{size}
            </option>
          );
        });
      }
    : () => {
        return <option value="0">No game available</option>;
      };
}
