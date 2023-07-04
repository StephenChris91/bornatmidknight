import { Center, Flex, Box, HStack, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <Box>
        <Center>
          <HStack spacing="70vw" direction="row">
            <Link
              color="gray.400"
              to="/"
              fontSize="3xl"
              // target="_blank"
              rel="noopener noreferrer"
            >
              BORNATMIDKNIGHT
            </Link>
            <Box>
              <HStack spacing={2}>
                <Link to="/all-posts">All Posts</Link>
                <ColorModeSwitcher />
              </HStack>
            </Box>
          </HStack>
        </Center>
      </Box>
    </>
  );
};

export default Navbar;
