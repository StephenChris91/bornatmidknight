import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin/Admin';
import Homepage from './Pages/Homepage';
import PostBoard from './Pages/PostBoard';
import SinglePost from './Pages/SinglePost';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/all-posts" element={<PostBoard />}></Route>
        <Route exact path="/all-posts/:id" element={<SinglePost />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
