import { Formik } from "formik";
import { Button, FormLabel, Select } from "@chakra-ui/core";
import Router from "next/router";
import { getGamesInLocalStorage } from "./storage";

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

  return (
    <Formik
      initialValues={{ id: "0" }}
      onSubmit={(values) => {
        Router.push({
          pathname: "/board",
          query: { id: values.id },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="load">Load game :</FormLabel>
          <Select name="load" onChange={handleChange} value={values.id}>
            {games().map((game, index) => {
              return (
                <option name="game_${game.id}" value={game.id}>
                  Partie n°{game.id}
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
