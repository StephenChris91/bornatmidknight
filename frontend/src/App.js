import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  HStack,
  Code,
  Grid,
  GridItem,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
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
            bg={`url('/images/bg.jpg')`}
            borderRadius="md"
          />
          <GridItem colSpan={1} bg="papayawhip" borderRadius="md" />
          <GridItem colSpan={1} bg="papayawhip" borderRadius="md" />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
