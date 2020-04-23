import { Button } from "@chakra-ui/core";

export function MenuButton({ text, ...props }) {
  return (
    <Button fontFamily="Orbitron"  variantColor={"teal"} size="lg" fontSize="1.1em" {...props}>
      {text}
    </Button>
  );
}

export default MenuButton;
