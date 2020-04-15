import { Button, FormLabel, Select } from "@chakra-ui/core";
import { Formik } from "formik";
import _ from "lodash";
import Router from "next/router";
import { getGamesFromLocalStorage } from "./storage";
import { OFFLINE_PATHNAME } from "../../pages/board/offline";

export default function LoadGameForm() {
  const games = getGames();
  const firstGameId = games.length > 0 ? _.first(games).id : "0";
  const options = generateOptions(games);

  return (
    <Formik
      initialValues={{ gameId: firstGameId }}
      onSubmit={(values) => {
        Router.push({
          pathname: OFFLINE_PATHNAME,
          query: { id: values.gameId },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="load-game-select">Load game</FormLabel>
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
            Start
          </Button>
        </form>
      )}
    </Formik>
  );
}

/**
 * Generates options.
 * If games array is empty, "No game saved" is displayed.
 *
 * @param {Array} games
 */
function generateOptions(games) {
  return games.length > 0
    ? () => {
        return games.map((game, index) => {
          return (
            <option key={index} value={game.id}>
              Game #{index + 1}
            </option>
          );
        });
      }
    : () => {
        return (
          <option title={`Game number 0`} value="0">
            No game saved
          </option>
        );
      };
}

/**
 * Get all games stored in Local Storage.
 *
 * @returns Array
 */
function getGames() {
  try {
    return getGamesFromLocalStorage();
  } catch (error) {
    if (error.message.includes("Local Storage is unavailable.")) {
      return undefined;
    }
  }
}
