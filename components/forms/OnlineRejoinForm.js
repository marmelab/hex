import { FormLabel, Select, Button } from "@chakra-ui/core";
import { Formik } from "formik";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

export default function OnlineRejoinForm(props) {
  const firstGameId = 0;

  console.log(props);

  const options = props.games
    ? () => {
        return games.map((game, index) => {
          return <option value={game.uuid}>Game #{index + 1}</option>;
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
            Rejoign
          </Button>
        </form>
      )}
    </Formik>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/games");
  const games = await res.json();

  return { props: { games } };
}
