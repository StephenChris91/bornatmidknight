// import Image from '@chakra-ui/react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useDisclosure,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

import { FiEdit } from 'react-icons/fi';
import UpdatePostModal from '../../components/UpdatePostModal';

export default function AdminPost({ postData }) {
  const { title, summary, category, _id, content, image } = postData;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Center py={6}>
        <Box
          maxW={'500px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          // boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Box
            h={'full'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
          >
            <Image src={`${image}`} layout={'fill'} />
          </Box>
          <Stack>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {category}
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {title}
            </Heading>
            <Text color={'gray.500'}>{summary}</Text>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <FiEdit onClick={onOpen} />
          </Stack>
        </Box>
      </Center>
      <UpdatePostModal isOpen={isOpen} onClose={onClose} id={_id} />
    </>
  );
}
