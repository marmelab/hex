import { Flex } from "@chakra-ui/core";
import ReplayButton from "../buttons/ReplayButton";
import Hud from "../huds/Hud";

function SidePanel({ player, winner, onReplayOnPress, ...props }) {
  return (
    <Flex name="sidePanel" {...props}>
      <Hud player={player} winner={winner} width="95%" />

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
