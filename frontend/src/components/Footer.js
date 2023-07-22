import {
  Box,
  Flex,
  Avatar,
  // Link,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  VisuallyHidden,
  chakra,
  Text,
  Center,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      //   w={8}
      //   h={8}
      fontSize={'20px'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} p={10}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Link to="/">
            <Text fontSize={'6xl'}>Born At Midknight</Text>
          </Link>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={10}>
              {' '}
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />{' '}
              </SocialButton>{' '}
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />{' '}
              </SocialButton>{' '}
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />{' '}
              </SocialButton>{' '}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
