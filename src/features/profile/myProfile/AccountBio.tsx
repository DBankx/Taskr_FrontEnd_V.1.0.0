import {Box, Divider, HStack, VStack } from "@chakra-ui/react";
import React, {lazy, Suspense, useState} from "react";
import {IPrivateProfile} from "../../../infrastructure/models/profile";
import {observer} from "mobx-react-lite";
import InlineLoader from "../../../application/appLayout/InlineLoader";
import {FacebookIcon} from "../../../infrastructure/icons/Icons";
const DescriptionForm = lazy(() => import("../forms/DescriptionForm"));
const SkillsForm = lazy(() => import("../forms/SkillsForm"));

interface IProps{
    profile: IPrivateProfile;
}

const AccountBio : React.FC<IProps> = ({profile}) => {
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    return (
        <div className="task__bid__form__card">
            <Box>
                <HStack justifyContent="space-between">
                    <p className="text__bold">Description</p>
                    <span style={{cursor: "pointer"}} className="text__blue" onClick={() => setIsEditingDescription(!isEditingDescription)}>Edit Description</span>
                </HStack>
                <Divider />
                {isEditingDescription ? 
                    <Suspense fallback={<InlineLoader />}>
                    <DescriptionForm cancelEditing={setIsEditingDescription} description={profile.bio} />
                    </Suspense>
                    : <p className="text__darker text__sm">{profile.bio ? profile.bio : "Tell your taskr about you"}</p>}
            </Box>
            <Box mt={3} mb={3}>
                <HStack justifyContent="space-between">
                    <p className="text__bold">Skills</p>
                    <span style={{cursor: "pointer"}} className="text__blue" onClick={() => setIsEditingSkills(!isEditingSkills)}>Add New</span>
                </HStack>
                <Divider />
                {isEditingSkills ? (
                    <Suspense fallback={<InlineLoader />}>
                        <SkillsForm cancelEditing={setIsEditingSkills} />
                    </Suspense>
                ) : <p className="text__light__grey text__sm text__bold" style={{margin: "1em 0"}}>Add your skills</p>}
            </Box>
            <Box mt={3} mb={3}>
                <HStack justifyContent="space-between">
                    <p className="text__bold">Socials</p>
                </HStack>
                <Divider />
                <div style={{margin: "1em 0"}}>
                    <VStack spacing="10px">
                        <div>
                        <HStack spacing="10px">
                            <FacebookIcon />
                            <span className="text__blue cursor">Add Facebook</span>
                        </HStack>
                        </div>
                    </VStack>
                </div>
            </Box>
        </div>
    )
}

export default observer(AccountBio);