import { Flex } from "@chakra-ui/core";
import StartGameModal from "../modals/StartGameModal";
import OnlineRejoinModal from "../modals/OnlineRejoinModal";
import SavedGameModal from "../modals/SavedGameModal";

export default function MainMenu({ games, ...props }) {
  return (
    <Flex name="mainMenu" {...props}>
      <StartGameModal width="100%" m="2%" tabindex="0" />
      <SavedGameModal width="100%" m="2%" />
      <OnlineRejoinModal width="100%" m="2%" games={games} />
    </Flex>
  );
}
