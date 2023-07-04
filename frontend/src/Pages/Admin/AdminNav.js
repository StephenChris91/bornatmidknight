import { Button, HStack, Text, Box, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import CreatePostModal from '../../components/Modal';
import CreatePostModal from '../../components/Modal';

const AdminNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box py={4} px={8}>
        <HStack space={8} justifyContent="space-between">
          <Link to="/">BORNATMIDKNIGHT</Link>
          <Box>
            <HStack space={4} justifyContent="space-between">
              <Button colorScheme="white" variant="white" onClick={onOpen}>
                Create Post
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Box>
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AdminNav;
