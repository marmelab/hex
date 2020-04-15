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

import MenuButton from "../buttons/MenuButton";
import LoadGameForm from "../forms/LoadGameForm";

export default function SavedGameModal({ ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex alignItems="center" justify="center" {...props}>
      <MenuButton
        variantColor="teal"
        text="Resume local game"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Load local game</ModalHeader>
          <ModalCloseButton aria-label="Close" tabIndex="-1"/>
          <ModalBody>
            <LoadGameForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
