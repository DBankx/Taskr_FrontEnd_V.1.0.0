import {Box, SimpleGrid} from "@chakra-ui/react";
import React, {useContext, useEffect} from "react";
import rootStoreContext from "../../application/stores/rootstore";
import {RouteComponentProps} from "react-router-dom";
import SEO from "../../application/appLayout/SEO";
import ProfileDetailsTop from "./profileDetails/ProfileDetailsTop";
import {observer} from "mobx-react-lite";
import ProfileDetailsTopPlaceholder from "./profileDetails/ProfileDetailsTopPlaceholder";
import ProfileDetailsBottom from "./profileDetails/ProfileDetailsBottom";
import ProfileDetailsBottomPlaceholder from "./profileDetails/ProfileDetailsBottomPlaceholder";
import ProfileTaskSection from "./profileTasks/ProfileTaskSection";
import ProfileTaskPlaceholder from "./profileTasks/ProfileTaskPlaceholder";
import ProfileReviews from "./ProfileReviews/ProfileReviews";

const PublicProfilePage : React.FC<RouteComponentProps<{userId: string}>> = ({match}) => {
    const {getPublicProfileDetails, loadingProfileDetails, publicProfileDetails, getPublicProfileTasks, loadingProfileTasks, publicProfileTasks} = useContext(rootStoreContext).publicProfileStore;
    
    useEffect(() => {
        getPublicProfileDetails(match.params.userId);
        getPublicProfileTasks(match.params.userId);
    }, [match.params.userId, getPublicProfileDetails, getPublicProfileTasks])
    
    return (
        <Box className="container">
            <SEO title={publicProfileDetails ? `${publicProfileDetails.username}'s profile` : "Loading profile"} />
            <Box className="main">
                <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr", sm: "1fr"}} spacing="20px">
                    <Box>
                        {publicProfileDetails === null || loadingProfileDetails ? <ProfileDetailsTopPlaceholder /> : <ProfileDetailsTop profileDetails={publicProfileDetails} />}
                        {publicProfileDetails === null || loadingProfileDetails ? <ProfileDetailsBottomPlaceholder /> : <ProfileDetailsBottom publicProfile={publicProfileDetails} /> }
                    </Box>
                    <Box>
                        {publicProfileTasks === null || loadingProfileTasks ? <ProfileTaskPlaceholder /> : <ProfileTaskSection profileTasks={publicProfileTasks} /> }
                        <ProfileReviews userId={match.params.userId} />
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    )
}

export default observer(PublicProfilePage);