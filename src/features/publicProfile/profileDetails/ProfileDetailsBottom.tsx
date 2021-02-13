import React from "react";
import {IPublicProfile} from "../../../infrastructure/models/profile";
import {observer} from "mobx-react-lite";
import { Box, Divider } from "@chakra-ui/react";
import {ExperienceLevel} from "../../../infrastructure/enums/skill";

interface IProps{
    publicProfile: IPublicProfile
}

const ProfileDetailsBottom : React.FC<IProps> = ({publicProfile}) => {
    return(
        <Box className="task__bid__form__card">
            <Box>
                <h3 className="text__bold text__primary">Description</h3>
                <Box mt={5}>
                    <p className="text__darker">{publicProfile.bio ? publicProfile.bio : "--"}</p>
                </Box>
            </Box>
            
            <Divider mt={6} mb={6} />
            
            <Box>
                <h3 className="text__bold text__primary">Languages</h3>
                <Box mt={5}>
                    {publicProfile.languages.length > 0 ? publicProfile.languages.map((language, i) => (
                        <p className="text__darker" key={i}>{language.languageName}<span style={{margin: "0 1em"}}>-</span><span className="text__light">{ExperienceLevel[language.experienceLevel]}</span></p>
                    )) : "--"}
                </Box>
            </Box>

            <Divider mt={6} mb={6} />
            
            <Box>
                <h3 className="text__bold text__primary">Skills</h3>
                <Box mt={5}>
                    {publicProfile.skillSet.length > 0 ? (
                        <ul className="profile__skill__list">
                            {publicProfile.skillSet.map((skill, i) => (
                            <li key={i} className="profile__skill__label">{skill.skillName}</li>
                        ))}
                        </ul>
                    ) : "--"}
                </Box>
            </Box>
        </Box>
    )
}

export default observer(ProfileDetailsBottom);