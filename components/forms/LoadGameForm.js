import { Formik } from "formik";
import { Button, FormLabel, Select } from "@chakra-ui/core";
import Router from "next/router";
import { getGamesInLocalStorage } from "./storage";
import _ from "lodash";

export default function LoadGameForm() {
  const games = () => {
    try {
      return getGamesInLocalStorage();
    } catch (error) {
      if (error.message.includes("Local Storage is unavailable.")) {
        return undefined;
      }
    }
  };

  const firstGameId = games()[0].id;

  return (
    <Formik
      initialValues={{ gameId: firstGameId }}
      onSubmit={(values) => {
        Router.push({
          pathname: "/board",
          query: { id: values.gameId },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="gameId">Load game :</FormLabel>
          <Select name="gameId" onChange={handleChange} value={values.gameId}>
            {games().map((game, index) => {
              return (
                <option name={`game_${game.id}`} value={game.id}>
                  Partie n°{index + 1}
                </option>
              );
            })}
          </Select>
          <Button mt={4} variantColor="teal" type="submit">
            Start
          </Button>
        </form>
      )}
    </Formik>
  );
}
