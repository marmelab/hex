import LocalPlayModal from "../modals/LocalPlayModal";
import SavedGameModal from "../modals/SavedGameModal";
import { Flex } from "@chakra-ui/core";
import styled from "@emotion/styled";

export default function MainMenu({ ...props }) {
  const styles = { width: "100%", alignItems: "center", justify: "center" };

  return (
    <Flex name="mainMenu" {...props}>
      <LocalPlayModal {...styles} />
      <SavedGameModal {...styles} />
    </Flex>
  );
}
