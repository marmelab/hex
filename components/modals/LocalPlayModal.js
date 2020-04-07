import { Flex } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";

import LocalPlayForm from "../forms/LocalPlayForm";
import MenuButton from "../buttons/MenuButton";

export default function LocalPlayModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex {...props}>
      <MenuButton
        title="Play local game"
        variantColor="teal"
        size="lg"
        text="Play local game"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader title="2 players on the same device">2 players on the same device</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LocalPlayForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
