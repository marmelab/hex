import { Flex } from "@chakra-ui/core";
import ReplayButton from "../buttons/ReplayButton";
import Hud from "../huds/Hud";
import InGameButton from "../buttons/InGameButton";

function SidePanel({
  player,
  winner,
  onReplayOnPress,
  onHintOnPress,
  ...props
}) {
  return (
    <Flex name="sidePanel" {...props}>
      <Hud player={player} winner={winner} width="95%" />

      <Flex
        alignItems="flex-end"
        justify="center"
        flexWrap="wrap"
        marginTop="50%"
        width="100%"
      >
        {!winner ? (
          <InGameButton width="75%" text="Hint" onClick={onHintOnPress} />
        ) : null}

        {winner ? <ReplayButton width="75%" onClick={onReplayOnPress} /> : null}
      </Flex>
    </Flex>
  );
}

export default SidePanel;
