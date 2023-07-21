import { useState, useEffect } from 'react';

import AdminPost from './AdminPagePost';
import { HStack, useDisclosure } from '@chakra-ui/react';
import AdminNav from '../Admin/AdminNav';
import UpdatePostModal from '../../components/UpdatePostModal';

const PostBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminPost, setAdminPost] = useState([]);
  async function getPosts() {
    const response = await fetch('http://localhost:4000/posts');
    const data = await response.json();
    setAdminPost(data);
    // console.log(data);
  }

  useEffect(() => {
    // const post = fetch('http://localhost:4000/posts')
    getPosts();
  }, []);
  return (
    <>
      <AdminNav />
      <HStack p={8} flexWrap="wrap">
        {/* <Post /> */}
        {adminPost && adminPost.map(post => <AdminPost postData={post} />)}
      </HStack>
    </>
  );
};

export default PostBoard;
