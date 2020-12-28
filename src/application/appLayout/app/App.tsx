import React from 'react';
import {extendTheme, ChakraProvider} from "@chakra-ui/react";
import customTheme from "../../../assets/css/chakra-ui-theme";
import Navbar from "../../../features/nav/Navbar";

// Chakra ui theme
const theme = extendTheme(customTheme);

function App() {
  return (
      <ChakraProvider theme={theme}>
    <div className="App">
      <Navbar />
    </div>
      </ChakraProvider>
  );
}

export default App;
