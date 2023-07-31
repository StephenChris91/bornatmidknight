import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Center, VStack, Text, Image } from '@chakra-ui/react';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const dateString = post.date;
  const dateObj = new Date(dateString);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        `https://bornatmidknight.vercel.app/post/${id}`
      );
      const data = await response.json();
      setPost(data);
    };

    getPost();
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <Center>
          <VStack spacing={4}>
            <div>
              <Text fontSize="5xl" mb={4} textAlign={'center'}>
                {post.title}
              </Text>
              <Image src={post.image} alt="Blog image" mb={4} />
              <Text textAlign="center" mb={4}>
                {' '}
                Published: {dateObj.toLocaleDateString('en-UK')} |{' '}
                {dateObj.toLocaleTimeString('en-US')}
              </Text>
            </div>
            <Center
              maxW="800px"
              fontSize={'20px'}
              p={{
                base: '10px',
                md: '5px',
                lg: 'none',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </Center>
          </VStack>
        </Center>
      </div>
    </>
  );
};

export default SinglePost;
