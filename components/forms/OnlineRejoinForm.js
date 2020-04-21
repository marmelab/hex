import { Button, FormLabel, Input, Select } from "@chakra-ui/core";
import { Formik } from "formik";
import Router from "next/router";
import { SECOND_PLAYER_VALUE, writeToken } from "../../engine/player";
import { ONLINE_PATHNAME } from "../../pages/board/online";

export default function OnlineRejoinForm({ games, baseUrl, ...props }) {
  const firstUuid = games && games.length > 0 ? games[0].uuid : "0";
  const secondPlayerNickname = "John Doe";

  return (
    <Formik
      initialValues={{ uuid: firstUuid, secondPlayerNickname }}
      onSubmit={async (values) => {
        try {
          await addSecondPlayer(values.uuid, values.secondPlayerNickname);
          writeToken(SECOND_PLAYER_VALUE, values.uuid);
          goToOnlinePage(values.uuid);
        } catch (message) {
          throw ("Error in form: ", message);
        }
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="secondPlayerNickname">Your nickname</FormLabel>
          <Input
            id="secondPlayerNickname"
            onChange={handleChange}
            value={values.secondPlayerNickname}
            tabIndex="0"
          ></Input>

          <FormLabel htmlFor="load-game-select">Choose a game</FormLabel>
          <Select
            onChange={handleChange}
            value={values.uuid}
            name="uuid"
            tabIndex="0"
            id="load-game-select"
          >
            {games.length >= 1 ? (
              games.map((game, index) => {
                const size = Math.sqrt(JSON.parse(game.grid).length);

                return (
                  <option key={index} value={game.uuid}>
                    Play with {game.firstPlayerNickname} - size {size}x{size}
                  </option>
                );
              })
            ) : (
              <option value="0">No game available</option>
            )}
          </Select>
          <Button
            mt={4}
            variantColor="teal"
            type="submit"
            disabled={firstUuid === "0"}
          >
            Rejoin
          </Button>
        </form>
      )}
    </Formik>
  );
}

const goToOnlinePage = (id) => {
  Router.push({
    pathname: ONLINE_PATHNAME,
    query: {
      id: id,
    },
  });
};
