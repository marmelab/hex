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
import {
  FIRST_PLAYER_VALUE,
  NO_PLAYER_VALUE,
  writeToken,
} from "../../engine/player";
import { createGame } from "../../pages/api/gameCalls";
import { OFFLINE_PATHNAME } from "../../pages/board/offline";
import { ONLINE_PATHNAME } from "../../pages/board/online";
import { getGamesFromLocalStorage, setGamesInLocalStorage } from "./storage";

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
            <option value="13">13</option>
            <option value="15">15</option>
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
const initializeGame = async (values, baseUrl) => {
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
      try {
        const { uuid } = await createGame(grid, values.firstPlayerNickname);

        writeToken(FIRST_PLAYER_VALUE, uuid);
        Router.push({ pathname, query: { id: uuid } });
      } catch (message) {
        throw message;
      }
      break;
  }
};

/**
 * Initialize a local game by storing initial value into Local Storage.
 * Game ID generation based on : https://gist.github.com/gordonbrander/2230317
 *
 * @param {Array} grid
 */
const initializeLocalGame = (grid) => {
  const gameId = Math.random().toString(36).substr(2, 9);
  const games = getGamesFromLocalStorage();

  games.push({
    id: gameId,
    grid: grid,
    winner: NO_PLAYER_VALUE,
    firstPlayerNickname: "noValue",
    secondPlayerNickname: "noValue",
  });
  setGamesInLocalStorage(games);

  return gameId;
};
