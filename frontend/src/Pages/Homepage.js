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

  // Get the breakpoint value outside the callback function
  const breakpointValue = useBreakpointValue({ base: 4, md: 8 });

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
              w={'full'}
              // h={'100vh'}
              h={'100%'}
              backgroundImage={`url(http://localhost:4000/${post.image})`}
              backgroundSize={'cover'}
              backgroundPosition={'center center'}
            >
              <VStack
                w={'full'}
                justify={'center'}
                px={breakpointValue}
                bgGradient={'linear(to-t, blackAlpha.600, transparent)'}
              >
                <Stack
                  // maxW={'2xl'}
                  align={'flex-start'}
                  spacing={6}
                  position="absolute"
                  top={index === 0 ? 350 : 150}
                  left={30}
                  maxW={index === 0 ? '800px' : '600px'}
                  zIndex={2}
                >
                  <Text
                    // color={'white'}
                    fontWeight={700}
                    // lineHeight={1.2}
                    // fontSize={breakpointValue}
                    as="b"
                    fontSize={index === 0 ? '8xl' : '3xl'}
                    textAlign="left"
                    lineHeight={index === 0 ? '1' : '2'}
                    color="white"
                    mb={index === 0 ? 4 : -6}
                  >
                    {post.title}
                  </Text>
                  <Stack direction={'row'}>
                    <Button
                      bg={'transparent'}
                      // rounded={'full'}
                      color={'white'}
                      variant="outline"
                      onClick={() => navigate(`/all-posts/${post._id}`)}
                      _hover={{ bg: 'blue.500' }}
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
