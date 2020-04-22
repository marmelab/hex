import { Box, Flex, Heading } from "@chakra-ui/core";
import { DARK_COLOR_100, LIGHT_COLOR_100 } from "../../theme/colors";
import OnlineRejoinModal from "../modals/OnlineRejoinModal";
import SavedGameModal from "../modals/SavedGameModal";
import StartGameModal from "../modals/StartGameModal";

export default function MainMenu({ games, baseUrl, ...props }) {
  return (
    <Flex name="mainMenu" {...props}>
      <Box rounded="10px" background={LIGHT_COLOR_100} margin="auto">
        <Flex>
          <Heading
            fontFamily="Orbitron"
            paddingTop="10"
            margin="auto"
            color={DARK_COLOR_100}
          >
            HEX
          </Heading>
        </Flex>
        <StartGameModal m="10" p="2" tabindex="0" baseUrl={baseUrl} />
        <SavedGameModal m="10" p="2" tabindex="0" />
        <OnlineRejoinModal
          m="10"
          p="2"
          games={games}
          baseUrl={baseUrl}
          tabindex="0"
        />
      </Box>
    </Flex>
  );
}
