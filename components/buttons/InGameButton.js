import { Button } from "@chakra-ui/core";
import { DARK_COLOR_100 } from "../../theme/colors";

const InGameButton = ({ text, ...props }) => {
  return (
    <Button
      color={DARK_COLOR_100}
      borderColor={DARK_COLOR_100}
      fontSize="1.2em"
      fontWeight="bold"
      tabIndex="0"
      {...props}
    >
      {text}
    </Button>
  );
};

export default InGameButton;
