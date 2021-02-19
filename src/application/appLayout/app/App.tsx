import React, {lazy, Suspense, useContext, useEffect} from 'react';
import {extendTheme, ChakraProvider} from "@chakra-ui/react";
import customTheme from "../../../assets/css/chakra-ui-theme";
import Navbar from "../../../features/nav/Navbar";
import {Switch, Route, useLocation} from 'react-router-dom';
import FullPageSpinner from '../FullPageSpinner';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SEO from "../SEO";
import { observer } from 'mobx-react-lite';
import rootStoreContext from "../../stores/rootstore";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const HomePage = lazy(() => import("../../../features/home/HomePage"));
const QueryPage = lazy(() => import("../../../features/search/QueryPage"));
const SignInPage = lazy(() => import("../../../features/auth/signin/SignInPage"));
const TaskPage = lazy(() => import("../../../features/task/TaskPage"));
const BidHistoryPage = lazy(() => import("../../../features/bid/bidHistory/BidHistoryPage"));
const TitleCategoryPage = lazy(() => import("../../../features/createTask/Title-category"));
const TaskDetailsForm = lazy(() => import ("../../../features/createTask/TaskDetailsForm"));
const ProfilePage = lazy(() => import("../../../features/profile/ProfilePage"));
const PublicProfile = lazy(() => import("../../../features/publicProfile/PublicProfilePage"));
const InboxPage = lazy(() => import("../../../features/Chat/InboxPage"));
const MessagePage = lazy(() => import("../../../features/Chat/messages/MessagePage"));

// Chakra ui theme
const theme = extendTheme(customTheme);


function App() {
  const {getCurrentUser, token} = useContext(rootStoreContext).authStore;
  const {appLoaded, setAppLoaded} = useContext(rootStoreContext).appStore;
  const {pathname} = useLocation();
  
  // get the user details on refresh
  useEffect(() => {
    if(token){
      getCurrentUser().then(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [setAppLoaded, getCurrentUser, token]);
  
  
  if(!appLoaded) return <FullPageSpinner />;
  return (
      <ChakraProvider theme={theme}>
    <div className="App">
      <SEO title="The No 1 online market place for delegating tasks" />
      <ToastContainer position="bottom-right" />
      <Suspense fallback={<FullPageSpinner />}>
        {pathname !== "/signin" && pathname !== "/signup" && <Navbar /> }
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tasks" component={QueryPage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/task/:id" component={TaskPage} />
          <Route exact path="/view-bids/:taskId" component={BidHistoryPage} />
          <Route exact path="/create-task/details" component={TitleCategoryPage} />
          <Route exact path="/post-task" component={TaskDetailsForm} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/public-profile/:userId" component={PublicProfile} />
          <Route exact path="/inbox" component={InboxPage} />
          <Route exact path="/conversation/:chatId" component={MessagePage} />
        </Switch>
      </Suspense>
    </div>
      </ChakraProvider>
  );
}

export default observer(App);
