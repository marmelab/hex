import { Button } from "@chakra-ui/core";
import { LIGHT_COLOR_500 } from "../../theme/colors";

export function MenuButton({ text, ...props }) {
  return (
    <Button variantColor="green" variantColor={LIGHT_COLOR_500} size="lg" {...props}>
      {text}
    </Button>
  );
}

export default MenuButton;
