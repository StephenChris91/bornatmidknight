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
            position="relative"
            overflow="hidden"
            borderRadius="md"
          >
            <Box
              bgImage={`url("http://localhost:4000/uploads/${post.image}")`}
              backgroundSize="cover"
              backgroundPosition="center"
              height="100%"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 1,
              }}
            >
              <Box
                position="absolute"
                top={index === 0 ? 350 : 150}
                left={30}
                maxW={index === 0 ? '800px' : '600px'}
                zIndex={2}
              >
                <VStack textAlign="left" alignItems="start" p={4} spacing={4}>
                  <Text
                    backgroundColor="green"
                    p={1}
                    color="#fff"
                    fontWeight="bold"
                    textTransform="uppercase"
                    borderRadius="sm"
                    mb="-5px"
                  >
                    {post.category}
                  </Text>
                  <Text
                    as="b"
                    fontSize={index === 0 ? '8xl' : '3xl'}
                    textAlign="left"
                    lineHeight={index === 0 ? '1' : '2'}
                    color="white"
                    mb={index === 0 ? 4 : -6}
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
