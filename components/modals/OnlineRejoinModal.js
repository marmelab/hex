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
import OnlineRejoinForm from "../forms/OnlineRejoinForm";

export default function OnlineRejoinModal({ ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex {...props}>
      <MenuButton
        variantColor="teal"
        text="Rejoin online game"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rejoin online game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OnlineRejoinForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
