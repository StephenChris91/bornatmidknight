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
  const { title, summary, category, _id, content } = postData;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Center py={6}>
        <Box
          maxW={'445px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          // boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Box
            h={'210px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
          >
            <Image
              src={
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
              layout={'fill'}
            />
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
              Boost your conversion rate
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
