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

export default function OnlineRejoinModal({ games, baseUrl, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex {...props} alignItems="center" justify="center">
      <MenuButton
        variantColor="teal"
        text="Rejoin online game"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rejoin online game</ModalHeader>
          <ModalCloseButton aria-label="Close" tabIndex="-1"/>
          <ModalBody>
            <OnlineRejoinForm games={games} baseUrl={baseUrl} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
