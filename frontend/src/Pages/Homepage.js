import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  VStack,
  theme,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import bg from '../components/images/bg.jpg';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts');
        const data = await response.json();
        console.log(data);
        const sortedPosts = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        // Set the top 3 most recent posts
        setPosts(sortedPosts.slice(0, 3));
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Box textAlign="center" fontSize="xl">
        <Navbar />
        <Grid
          minH="100vh"
          p={3}
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          {posts.map((post, index) => (
            <GridItem
              key={post._id}
              colSpan={index === 0 ? 2 : 1} // Use colSpan of 2 for the first post, 1 for the rest
              rowSpan={index === 0 ? 2 : 1} // Use colSpan of 2 for the first post, 1 for the rest
              bg={`url('${post.image}')`}
              backgroundSize="cover"
              backgroundPosition="center"
              borderRadius="md"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top={index === 0 ? 350 : 200}
                left={30}
                maxW={index === 0 ? '800px' : '600px'}
                // fontSize={index === 0 ? '200px' : '3xl'}
              >
                <VStack textAlign="left" alignItems="start">
                  <Text
                    as="b"
                    fontSize={index === 0 ? '8xl' : '3xl'}
                    textAlign="left"
                    lineHeight={index === 0 ? '1' : '2'}
                  >
                    {post.title}
                  </Text>
                  <Button
                    colorScheme="white"
                    variant="outline"
                    onClick={() => navigate(`/all-posts/${post._id}`)}
                  >
                    Read More...
                  </Button>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Homepage;
