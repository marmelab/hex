import { Button } from "@chakra-ui/core";
import { DARK_COLOR_100 } from "../../theme/colors";

export function ReplayButton(props) {
  return (
    <Button
      name="replay-button"
      color={DARK_COLOR_100}
      borderColor={DARK_COLOR_100}
      fontSize="1.2em"
      fontWeight="bold"
      {...props}
    >
      Replay
    </Button>
  );
}

export default ReplayButton;
