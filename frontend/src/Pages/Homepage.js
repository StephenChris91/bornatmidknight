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
  Flex,
  Stack,
  useBreakpointValue,
  Badge,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://bornatmidknight.vercel.app/posts'
        );
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
            <Flex
              w="full"
              h={index === 0 ? '100%' : '100%'}
              backgroundImage={post.image}
              backgroundSize="cover"
              backgroundPosition="center center"
            >
              <VStack
                w="full"
                justify="center"
                px={breakpointValue}
                bgGradient="linear(to-t, blackAlpha.600, transparent)"
                h={index === 0 ? '100%' : 'auto'} // Updated height for mobile
              >
                <Stack
                  align="flex-start"
                  spacing={6}
                  position="absolute"
                  // top={index === 0 ? '50%' : '30%'}
                  top={{
                    base: index === 0 ? '30%' : '40%',
                    md: index === 0 ? '30%' : '30%',
                    lg: index === 0 ? '50%' : '30%',
                  }}
                  left={30}
                  maxW={index === 0 ? '800px' : '600px'}
                  zIndex={2}
                >
                  {index === 0 && (
                    <span>
                      <Badge variant="solid" colorScheme="yellow" mb={-28}>
                        Latest Post
                      </Badge>
                    </span>
                  )}
                  <span>
                    <Badge variant="subtle" colorScheme="green" mt={10}>
                      {post.category}
                    </Badge>
                  </span>
                  <Text
                    fontWeight={700}
                    as="b"
                    fontSize={{
                      base: '3xl',
                      md: index === 0 ? '5xl' : '3xl',
                      lg: index === 0 ? '6xl' : '4xl',
                    }}
                    textAlign="left"
                    lineHeight={index === 0 ? '1' : '2'}
                    color="white"
                    mb={index === 0 ? 4 : -6}
                    mt={-6}
                  >
                    {post.title}
                  </Text>
                  <Stack direction="row">
                    <Button
                      bg="transparent"
                      color="white"
                      variant="outline"
                      onClick={() => navigate(`/all-posts/${post._id}`)}
                      _hover={{ bg: 'green.500' }}
                      size={breakpointValue === 8 ? 'lg' : 'md'} // Adjust button size for mobile
                    >
                      Read More
                    </Button>
                  </Stack>
                </Stack>
              </VStack>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Homepage;
