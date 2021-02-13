import {Box, Button, Divider, HStack, Image} from "@chakra-ui/react";
import React from "react";
import {IPublicProfile} from "../../../infrastructure/models/profile";
import {observer} from "mobx-react-lite";
import {
    EditIcon,
    FacebookIcon,
    FlagIcon,
    HeartIcon, InstagramIcon,
    LocationIcon, PinterestIcon,
    TwitterIcon,
    UserIcon
} from "../../../infrastructure/icons/Icons";
import dayjs from "dayjs";
import Rater from "../../../application/common/Rater";
import {Link} from "react-router-dom";

interface IProps {
    profileDetails: IPublicProfile;
}

const ProfileDetailsTop : React.FC<IProps> = ({profileDetails}) => {
    return (
        <Box className="task__bid__form__card" style={{lineHeight: "130%", position: "relative"}}>
            <div className="text__middle">
                <Image borderRadius="full" style={{margin: "0 auto"}} src={profileDetails.avatar} alt="avatar" boxSize="130px" />
                <Box mt={7}>
                <p className="text__main text__heading">{profileDetails.username}</p>
                <p style={{marginTop: "0.5em"}} className="text__silent">{profileDetails.tagline && profileDetails.tagline}</p>
                    <HStack style={{marginTop: "0.5em"}} justifyContent="center" spacing="10px">
                        <Rater justifyContent="flex-start" rating={4} boxSize={6} />
                        <p>4.8</p>
                        <p className="text__light__grey">(&#60;2k reviews)</p>
                    </HStack>
                    <small style={{marginTop: "0.5em", display: "block"}} className="text__silent"><FlagIcon /> Report this member</small>
                    {profileDetails.socials !== null ? <HStack style={{marginTop: "0.5em"}} alignItems="center" justifyContent="center" spacing="20px">
                        {profileDetails.socials.facebook && <a href={profileDetails.socials.facebook} rel="noreferrer noopener" target="_blank" title="connect on facebook"><FacebookIcon boxSize={8} /></a>}
                        {profileDetails.socials.twitter && <a href={profileDetails.socials.twitter} rel="noreferrer noopener" target="_blank" title="connect on twitter"><TwitterIcon  boxSize={8} /></a>}
                        {profileDetails.socials.instagram && <a href={profileDetails.socials.instagram} rel="noreferrer noopener" target="_blank" title="connect on instagram"><InstagramIcon boxSize={8} /></a>}
                        {profileDetails.socials.pinterest && <a href={profileDetails.socials.pinterest} rel="noreferrer noopener" target="_blank" title="connect on pinterest"><PinterestIcon boxSize={8}  /></a>}
                    </HStack> : (
                        <Button className="btn btn__nm btn__primary btn__full-width" style={{marginTop: "0.5em", display: "block"}}>Contact me</Button>
                    )}
                </Box>
            </div>
            <Divider mt={3} mb={3} />
            <div>
                <HStack justifyContent="space-between">
                    <div >
                        <p className="text__bold text__light__grey"><LocationIcon mr={2} color="#62646A" />From</p>
                    </div>
                    <p className="text__darker">{profileDetails.city ? profileDetails.city : "--"}</p>
                </HStack>
                <HStack style={{marginTop: "0.5em"}} justifyContent="space-between">

                        <p className="text__bold text__light__grey"><UserIcon mr={2} color="#62646A" />Joined Since</p>
                    <p style={{marginTop: "0.5em"}} className="text__darker">{dayjs(profileDetails.createdAt).format("MMM YYYY")}</p>
                </HStack>
            </div>
            {!profileDetails.isUser && <div className="profile__report">
                <HeartIcon boxSize={6} color="#B5B6BA" title="Save this user" />
            </div>}
            {profileDetails.isUser && <div className="profile__edit">
                <Link to="/profile?tab=5"><EditIcon boxSize={6} color="#2DA3EB" title="Edit" /></Link>
            </div>}
        </Box>
    )
} 

export default observer(ProfileDetailsTop);