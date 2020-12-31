import React, {lazy, Suspense} from 'react';
import {extendTheme, ChakraProvider} from "@chakra-ui/react";
import customTheme from "../../../assets/css/chakra-ui-theme";
import Navbar from "../../../features/nav/Navbar";
import {Switch, Route, useLocation} from 'react-router-dom';
import FullPageSpinner from '../FullPageSpinner';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SEO from "../SEO";
import { observer } from 'mobx-react-lite';

const HomePage = lazy(() => import("../../../features/home/HomePage"));
const QueryPage = lazy(() => import("../../../features/search/QueryPage"));
const SignInPage = lazy(() => import("../../../features/auth/signin/SignInPage"));

// Chakra ui theme
const theme = extendTheme(customTheme);


function App() {
    const {pathname} = useLocation();
  return (
      <ChakraProvider theme={theme}>
    <div className="App">
      <SEO title="The No 1 online market place for delegating tasks" />
      <Suspense fallback={<FullPageSpinner />}>
        {pathname !== "/signin" && pathname !== "/signup" && <Navbar /> }
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tasks" component={QueryPage} />
          <Route exact path="/signin" component={SignInPage} />
        </Switch>
      </Suspense>
    </div>
      </ChakraProvider>
  );
}

export default observer(App);
