import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Stack, SimpleGrid } from "@chakra-ui/react";
import ProfileBox from "./ProfileBox";
import rootStoreContext from "../../../application/stores/rootstore";
import Loader from "../../../application/appLayout/FullPageSpinner";
import AccountBio from "./AccountBio";
import TagLine from "./TagLine";
import SEO from "../../../application/appLayout/SEO";
import ProfileReviews from "../../publicProfile/ProfileReviews/ProfileReviews";

const MyProfile = () => {
    const {loadingInitial, privateProfile, getPrivateProfile} = useContext(rootStoreContext).profileStore;
    useEffect(() => {
        privateProfile == null && getPrivateProfile();
    }, [privateProfile, getPrivateProfile])
    
    if(loadingInitial || privateProfile === null) return <Loader />
    return (
        <div className="container">
            <SEO title="My private profile" />
            <div className="main">
                <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr", sm: "1fr"}} spacing="20px">
                    <div>
                        <ProfileBox profile={privateProfile} />                        
                        <AccountBio profile={privateProfile} />
                    </div>      
                    <div>
                        <Stack direction={["column", "row"]} spacing="1em" justifyContent={["start", "space-between"]}>
                            <TagLine tagline={privateProfile.tagline} />
                        </Stack>
                        <ProfileReviews userId={privateProfile.id} user={privateProfile}/>
                    </div>
                </SimpleGrid>
            </div>
        </div>
    )
}

export default observer(MyProfile);