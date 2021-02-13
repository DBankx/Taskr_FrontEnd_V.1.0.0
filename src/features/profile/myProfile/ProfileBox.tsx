import React from "react";
import {observer} from "mobx-react-lite";
import {IPrivateProfile} from "../../../infrastructure/models/profile";
import {Divider, HStack, Image, Link} from "@chakra-ui/react";
import {EditIcon, LocationIcon, UserIcon} from "../../../infrastructure/icons/Icons";
import {Link as Linker} from "react-router-dom";
import dayjs from "dayjs";
import {history} from "../../../index";

interface IProps{
    profile: IPrivateProfile
}

const ProfileBox : React.FC<IProps> = ({profile}) => {
    return (
        <div className="task__bid__form__card">
            <div className="text__middle">
                <Image borderRadius="full" style={{margin: "0 auto"}} src={profile.avatar} alt="avatar" boxSize="150px" />
                <p className="text__main text__lg">{profile.firstName} {profile.lastName}</p>
                <p className="text__bold text__silent">{profile.username}</p>
                <Link className="text__blue" as={Linker} to="/manage-profile"><EditIcon /> Edit Profile</Link>
                <button className="btn btn__sm btn__grey" onClick={() => history.push(`/public-profile/${profile.id}`)}>View public profile</button>
            </div>
            <Divider mt={3} mb={3} />
            <div>
                <HStack justifyContent="space-between">
                    <div >
                    
                    <p className="text__bold text__light__grey"><LocationIcon mr={2} color="#62646A" />From</p>
                    </div>
                    <p className="text__darker">{profile.city ? profile.city : "--"}</p>
                </HStack>
                <HStack justifyContent="space-between">
                    <div >

                        <p className="text__bold text__light__grey"><UserIcon mr={2} color="#62646A" />Joined Since</p>
                    </div>
                    <p className="text__darker">{dayjs(profile.createdAt).format("MMM YYYY")}</p>
                </HStack>
            </div>
        </div>
    )
}

export default observer(ProfileBox);