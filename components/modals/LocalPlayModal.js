import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import MenuButton from "../buttons/MenuButton";
import LocalPlayForm from "../forms/LocalPlayForm";

export default function LocalPlayModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex alignItems="center" justify="center" {...props}>
      <MenuButton
        variantColor="teal"
        size="lg"
        text="Play local game"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>2 players on the same device</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LocalPlayForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
