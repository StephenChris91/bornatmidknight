import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import bg from './components/images/bg.jpg';
import { Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin/Admin';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
