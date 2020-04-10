import { Button, FormLabel, Select } from "@chakra-ui/core";
import { Formik } from "formik";
import Router from "next/router";

export default function OnlineRejoinForm({ games, ...props }) {
  const firstGameId = games ? _.first(games).uuid : "0";

  const options = games
    ? () => {
        return games.map((game, index) => {
          const size = JSON.parse(game.grid).length;

          return (
            <option value={game.uuid}>
              Play with {game.player1_nickname} - size {size}x{size}
            </option>
          );
        });
      }
    : () => {
        return <option value="0">No game available</option>;
      };
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
          <FormLabel htmlFor="load-game-select">Rejoin online game</FormLabel>
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
            Rejoign
          </Button>
        </form>
      )}
    </Formik>
  );
}
