import { Flex } from "@chakra-ui/core";
import LocalPlayModal from "../modals/LocalPlayModal";
import OnlinePlayModal from "../modals/OnlinePlayModal";
import OnlineRejoinModal from "../modals/OnlineRejoinModal";
import SavedGameModal from "../modals/SavedGameModal";

export default function MainMenu({ games, ...props }) {
  return (
    <Flex name="mainMenu" {...props}>
      <LocalPlayModal width="100%" m="2%" tabindex="0" />
      <SavedGameModal width="100%" m="2%" />
      <OnlinePlayModal width="100%" m="2%" />
      <OnlineRejoinModal width="100%" m="2%" games={games} />
    </Flex>
  );
}
