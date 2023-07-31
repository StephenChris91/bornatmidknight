import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { HStack } from '@chakra-ui/react';

const PostBoard = () => {
  const [posts, setPosts] = useState([]);
  async function getPosts() {
    const response = await fetch('http://localhost:4000/posts');
    const data = await response.json();
    setPosts(data);
    console.log(data);
  }

  useEffect(() => {
    getPosts();
  }, [posts]);
  return (
    <>
      <Navbar />
      <HStack p={8} flexWrap="wrap">
        {/* <Post /> */}
        {posts && posts.map(post => <Post postData={post} />)}
      </HStack>
    </>
  );
};

export default PostBoard;
