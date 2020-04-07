import LocalPlayModal from "../modals/LocalPlayModal";
import SavedGameModal from "../modals/SavedGameModal";
import { Flex } from "@chakra-ui/core";

export default function MainMenu(props) {
  return (
    <Flex name="mainMenu" {...props}>
      <LocalPlayModal
        width="100%"
        alignItems="center"
        justify="center"
        m="2%"
      />
      <SavedGameModal
        width="100%"
        alignItems="center"
        justify="center"
        m="2%"
      />
    </Flex>
  );
}
