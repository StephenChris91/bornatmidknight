import { useState, useEffect } from 'react';
import AdminPost from './AdminPagePost';
import { HStack, useDisclosure } from '@chakra-ui/react';
import AdminNav from '../Admin/AdminNav';
import UpdatePostModal from '../../components/UpdatePostModal';

const PostBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminPost, setAdminPost] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); // New state for update trigger

  async function fetchPosts() {
    const response = await fetch('http://localhost:4000/posts');
    const data = await response.json();
    setAdminPost(data);
  }

  useEffect(() => {
    fetchPosts();
  }, [updateTrigger]); // Run the effect whenever updateTrigger changes

  const handlePostAdded = () => {
    // Function to handle post added event
    // Set updateTrigger to true to trigger re-fetching of posts
    setUpdateTrigger(true);
  };

  return (
    <>
      <AdminNav handlePostAdded={handlePostAdded} />
      <HStack p={8} flexWrap="wrap">
        {adminPost &&
          adminPost.map(post => <AdminPost postData={post} key={post._id} />)}
      </HStack>
      {/* Add a component or button to add a new post */}
      {/* <button onClick={handlePostAdded}>Add New Post</button> */}
    </>
  );
};

export default PostBoard;
