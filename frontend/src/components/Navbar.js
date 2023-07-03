import { Center, Flex, Box, HStack, Text, Link } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Navbar = () => {
  return (
    <>
      <Box p={4}>
        <Center>
          <HStack spacing="70vw" direction="row">
            <Link
              color="gray.400"
              href="/"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              BORNATMIDKNIGHT
            </Link>
            <Box>
              <HStack spacing={2}>
                <Box>All Posts</Box>
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
