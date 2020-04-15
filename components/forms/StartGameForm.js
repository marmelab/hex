import {
  Button,
  Divider,
  Flex,
  FormLabel,
  Input,
  Select,
  Switch,
} from "@chakra-ui/core";
import { Formik } from "formik";
import Router from "next/router";
import { generateEmptyGrid } from "../../engine/grid";
import { NO_PLAYER_VALUE } from "../../engine/player";
import { GAME_URI, ONLINE_PATHNAME } from "../../pages/board/online";
import { getGamesFromLocalStorage, setGamesInLocalStorage } from "./storage";

const OFFLINE_PATHNAME = "/board/offline";

export default function StartGameForm() {
  return (
    <Formik
      initialValues={{ size: "7" }}
      onSubmit={(values) => {
        initializeGame(values);
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="firstPlayerNickname">Your nickname</FormLabel>
          <Input
            id="firstPlayerNickname"
            onChange={handleChange}
            value={values.nickname}
            tabIndex="0"
          ></Input>

          <FormLabel htmlFor="size">Size of the board</FormLabel>
          <Select
            id="size"
            onChange={handleChange}
            value={values.size}
            tabIndex="0"
          >
            <option value="7">7</option>
            <option value="9">9</option>
            <option value="11">11</option>
          </Select>

          <Flex paddingTop="10%">
            <FormLabel flexGrow="1" htmlFor="online">
              Online playing
            </FormLabel>
            <Switch
              onChange={handleChange}
              value="1"
              tabIndex="0"
              id="online"
            />
          </Flex>

          <Divider />

          <Button title="Start" mt={4} variantColor="teal" type="submit">
            Start
          </Button>
        </form>
      )}
    </Formik>
  );
}

/**
 *
 * @param {Object} values
 * @param {int} values.size
 */
function initializeGame(values) {
  const grid = JSON.stringify(generateEmptyGrid(values.size));
  const pathname = values.online ? ONLINE_PATHNAME : OFFLINE_PATHNAME;

  switch (pathname) {
    case OFFLINE_PATHNAME:
      const gameId = initializeLocalGame(grid, OFFLINE_PATHNAME);
      Router.push({
        pathname,
        query: {
          id: gameId,
        },
      });
      break;

    case ONLINE_PATHNAME:
      initializeServerGame({
        grid,
        firstPlayerNickname: values.firstPlayerNickname,
        winner: NO_PLAYER_VALUE,
      })
        .then(function (game) {
          Router.push({
            pathname,
            query: {
              id: game.uuid,
            },
          });
        })
        .catch(function (message) {
          throw ("Error in form:", message);
        });
      break;
  }
}

/**
 * Initialize a local game by storing initial value into Local Storage.
 * Game ID generation based on : https://gist.github.com/gordonbrander/2230317
 *
 * @param {Array} grid
 */
function initializeLocalGame(grid) {
  const gameId = Math.random().toString(36).substr(2, 9);
  const games = getGamesFromLocalStorage();

  games.push({ id: gameId, grid });
  setGamesInLocalStorage(games);

  return gameId;
}

/**
 * Initialize a new game on API.
 *
 * @param {Object} game
 * @param {string} game.grid
 * @param {string} game.firstPlayerNickname
 */
function initializeServerGame(game) {
  return fetch(GAME_URI, {
    method: "post",
    body: JSON.stringify(game),
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      return error;
    });
}
