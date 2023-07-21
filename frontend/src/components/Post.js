// import Image from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  Badge,
  Button,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
// import UpdatePostModal from '../../components/UpdatePostModal';

export default function Post({ postData }) {
  const { title, summary, category, _id, content, image } = postData;
  // const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();

  return (
    <>
      <Center p={4}>
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
            <Image
              src={'http://localhost:4000/' + image}
              layout={'fill'}
              h={'300px'}
            />
          </Box>
          <Stack>
            <Badge
              variant="subtle"
              colorScheme="green"
              display={'inline'}
              w={'auto'}
            >
              {category}
            </Badge>
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
            <Button
              bg={'transparent'}
              // rounded={'full'}
              color={useColorModeValue('gray.700', 'white')}
              variant="outline"
              onClick={() => navigate(`/all-posts/${_id}`)}
              _hover={{ bg: 'green.500' }}
            >
              Read More
            </Button>
          </Stack>
        </Box>
      </Center>
      {/* <UpdatePostModal isOpen={isOpen} onClose={onClose} id={_id} /> */}
    </>
  );
}
