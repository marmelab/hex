import { Button } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/core";

import LocalPlayForm from "../forms/LocalPlayForm";

export function LocalPlayModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
    </>
  );
}
