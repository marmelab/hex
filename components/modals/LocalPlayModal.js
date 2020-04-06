import { Button, Flex } from "@chakra-ui/core";
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

export default function LocalPlayModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex width="100%" alignItems="center" justify="center">
      <Button onClick={onOpen} variantColor="teal" size="lg">
        Play
      </Button>

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
