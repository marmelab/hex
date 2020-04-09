import { Button, FormLabel, Input, Select } from "@chakra-ui/core";
import { Formik } from "formik";
import _ from "lodash";
import Router from "next/router";

export default function OnlineRejoinForm({ games, ...props }) {
  const firstGameId = games ? _.first(games).uuid : "0";
  const nickname = undefined;

  const options = games
    ? () => {
        return games.map((game, index) => {
          const size = Math.sqrt(JSON.parse(game.grid).length);

          return (
            <option value={game.uuid}>
              Play with {game.player1Nickname} - size {size}x{size}
            </option>
          );
        });
      }
    : () => {
        return <option value="0">No game available</option>;
      };
  return (
    <Formik
      initialValues={{ gameId: firstGameId, nickname }}
      onSubmit={(values) => {
        Router.push({
          pathname: "/board",
          query: {
            id: values.gameId,
            player2Nickname: values.player2Nickname,
            online: true,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="player2Nickname">Your nickname</FormLabel>
          <Input
            id="player2Nickname"
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
            Rejoign
          </Button>
        </form>
      )}
    </Formik>
  );
}
