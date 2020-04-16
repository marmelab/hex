import { Button, FormLabel, Select } from "@chakra-ui/core";
import { Formik } from "formik";
import _ from "lodash";
import Router from "next/router";
import { getGamesFromLocalStorage } from "./storage";
import { OFFLINE_PATHNAME } from "../../pages/board/offline";

export default function LoadGameForm() {
  const games = getGames();
  const firstGameId = games.length > 0 ? games[0] : "0";

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
            {games.length > 0 ? (
              games.map((game, index) => {
                return (
                  <option key={index} value={game.id}>
                    Game #{index + 1}
                  </option>
                );
              })
            ) : (
              <option title={`Game number 0`} value="0">
                No game saved
              </option>
            )}
            }
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
