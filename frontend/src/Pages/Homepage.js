import React from 'react';
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
          <GridItem
            rowSpan={2}
            colSpan={2}
            bg={`url(${bg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="md"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={300}
              left={50}
              maxW="600px"
              fontSize="5xl"
            >
              <VStack textAlign="left" alignItems="start">
                <Text as="b" fontSize="6xl" textAlign="left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                  quod pariatur.
                </Text>
                <Button colorScheme="white" variant="outline">
                  Read More...
                </Button>
              </VStack>
            </Box>
          </GridItem>
          <GridItem
            colSpan={1}
            bg={`url(${bg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="md"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={170}
              left={30}
              maxW="600px"
              fontSize="3xl"
            >
              <VStack textAlign="left" alignItems="start">
                <Text as="b" fontSize="3xl" textAlign="left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                  quod pariatur.
                </Text>
                <Button colorScheme="white" variant="outline">
                  Read More...
                </Button>
              </VStack>
            </Box>
          </GridItem>
          <GridItem
            colSpan={1}
            bg={`url(${bg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="md"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={170}
              left={30}
              maxW="600px"
              fontSize="3xl"
            >
              <VStack textAlign="left" alignItems="start">
                <Text as="b" fontSize="3xl" textAlign="left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                  quod pariatur.
                </Text>
                <Button colorScheme="white" variant="outline">
                  Read More...
                </Button>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Homepage;
