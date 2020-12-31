import React, {lazy, Suspense} from 'react';
import {extendTheme, ChakraProvider} from "@chakra-ui/react";
import customTheme from "../../../assets/css/chakra-ui-theme";
import Navbar from "../../../features/nav/Navbar";
import { Switch, Route } from 'react-router-dom';
import FullPageSpinner from '../FullPageSpinner';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SEO from "../SEO";
import { observer } from 'mobx-react-lite';

const HomePage = lazy(() => import("../../../features/home/HomePage"));
const QueryPage = lazy(() => import("../../../features/search/QueryPage"));

// Chakra ui theme
const theme = extendTheme(customTheme);

function App() {
  return (
      <ChakraProvider theme={theme}>
    <div className="App">
      <SEO title="The No 1 online market place for delegating tasks" />
      <Navbar />
      <Suspense fallback={<FullPageSpinner />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tasks" component={QueryPage} />
        </Switch>
      </Suspense>
    </div>
      </ChakraProvider>
  );
}

export default observer(App);
