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
import OnlinePlayForm from "../forms/OnlinePlayForm";

export default function OnlinePlayModal({ ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex {...props}>
      <MenuButton
        variantColor="teal"
        size="lg"
        text="Play online game"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Play online game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OnlinePlayForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
