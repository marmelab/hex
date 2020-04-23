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
import StartGameForm from "../forms/StartGameForm";

export default function StartGameModal({ baseUrl, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex alignItems="center" justify="center" {...props}>
      <MenuButton text="Start a new game" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Start a new game</ModalHeader>
          <ModalCloseButton aria-label="Close" tabIndex="-1" />
          <ModalBody>
            <StartGameForm baseUrl={baseUrl} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
