import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  //   Lorem,
  useDisclosure,
  input,
} from '@chakra-ui/react';

const CreatePostModal = ({ isOpen, onClose }) => {
  //   const { isOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            soluta ratione illo nulla iusto, odit recusandae exercitationem
            quaerat voluptates dicta sequi inventore laborum quas quasi saepe
            possimus earum minus adipisci suscipit? Laudantium dignissimos
            explicabo sequi, necessitatibus eaque, aut beatae deserunt sed
            possimus dolorem quisquam pariatur nihil est, atque eum id.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
