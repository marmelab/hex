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
import LoadGameForm from "../forms/LoadGameForm";

export default function SavedGameModal({ ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex alignItems="center" justify="center" {...props}>
      <MenuButton text="Resume a solo game" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Load local game</ModalHeader>
          <ModalCloseButton aria-label="Close" tabIndex="-1" />
          <ModalBody>
            <LoadGameForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
