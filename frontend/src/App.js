import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin/Admin';
import Homepage from './Pages/Homepage';
import PostBoard from './Pages/PostBoard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/all-posts" element={<PostBoard />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
