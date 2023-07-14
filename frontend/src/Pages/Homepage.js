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
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import bg from '../components/images/bg.jpg';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([]);
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
        // Store the background images in state
        // const images = sortedPosts.map(
        //   post => `http://localhost:4000/${post.image}`
        // );
        // setBackgroundImages(images);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
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
            colSpan={{ base: 3, md: index === 0 ? 2 : 1 }}
            rowSpan={{ base: 1, md: index === 0 ? 2 : 1 }}
          >
            <Box
              bgImage={`url("http://localhost:4000/uploads/${post.image}")`}
              backgroundSize="cover"
              backgroundPosition="center"
              borderRadius="md"
              position="relative"
              overflow="hidden"
              height="100%"
            >
              <Box
                position="absolute"
                top={index === 0 ? 350 : 200}
                left={30}
                maxW={index === 0 ? '800px' : '600px'}
              >
                <VStack textAlign="left" alignItems="start" p={4}>
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
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Homepage;
