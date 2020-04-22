import { Flex } from "@chakra-ui/core";
import StartGameModal from "../modals/StartGameModal";
import OnlineRejoinModal from "../modals/OnlineRejoinModal";
import SavedGameModal from "../modals/SavedGameModal";

export default function MainMenu({ games, baseUrl, ...props }) {
  return (
    <Flex name="mainMenu" {...props}>
      <StartGameModal width="100%" m="2%" tabindex="0" baseUrl={baseUrl} />
      <SavedGameModal width="100%" m="2%" tabindex="0" />
      <OnlineRejoinModal
        width="100%"
        m="2%"
        games={games}
        baseUrl={baseUrl}
        tabindex="0"
      />
    </Flex>
  );
}
