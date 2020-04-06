import { Flex } from "@chakra-ui/core";
import ReplayButton from "../buttons/ReplayButton";
import Hud from "../huds/Hud";

function SidePanel({ player, winner, onReplayOnPress }) {
  return (
    <Flex name="sidePanel" w="25%" flexWrap="wrap">
      <Hud player={player} winner={winner} />

      {winner ? (
        <Flex
          alignItems="flex-end"
          justify="center"
          flexWrap="wrap"
          marginTop="50%"
          width="100%"
        >
          <ReplayButton onClick={onReplayOnPress} />
        </Flex>
      ) : null}
    </Flex>
  );
}

export default SidePanel;
