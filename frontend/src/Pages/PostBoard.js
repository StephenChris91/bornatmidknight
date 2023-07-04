import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { HStack } from '@chakra-ui/react';

const PostBoard = () => {
  return (
    <>
      <Navbar />
      <HStack p={8} flexWrap="wrap">
        <Post />
        {[1, 2, 3, 4, 5].map(post => (
          <Post />
        ))}
      </HStack>
    </>
  );
};

export default PostBoard;
