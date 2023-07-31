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
import Swal from 'sweetalert2';

import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import UpdatePostModal from '../../components/UpdatePostModal';

export default function AdminPost({ postData }) {
  const { title, summary, category, _id, image } = postData;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const confirmDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this post. This action is not reversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        DeletePost(_id);
      }
    });
  };

  const DeletePost = async id => {
    try {
      const response = await fetch(
        `https://bornatmidknight.vercel.app/post/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        Swal.fire('Deleted!', 'The post has been deleted.', 'success');
        // Perform any necessary actions after successful deletion
      } else {
        Swal.fire('Failed!', 'Failed to delete the post.', 'error');
        // Handle the error or show an error message
      }
    } catch (error) {
      Swal('Error!', 'An error occurred while deleting the post.', 'error');
      // Handle the error or show an error message
    }
  };

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
            <Image src={image} layout={'fill'} h={'300px'} />
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
            <Text color={'gray.500'} noOfLines={2}>
              {summary}
            </Text>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <FiEdit onClick={onOpen} cursor={'pointer'} />{' '}
            <FaTrash onClick={confirmDelete} cursor={'pointer'} />
          </Stack>
        </Box>
      </Center>
      <UpdatePostModal isOpen={isOpen} onClose={onClose} id={_id} />
    </>
  );
}
