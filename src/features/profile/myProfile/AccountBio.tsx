import {Box, Divider, HStack} from "@chakra-ui/react";
import React, {lazy, Suspense, useState} from "react";
import {IPrivateProfile} from "../../../infrastructure/models/profile";
import {observer} from "mobx-react-lite";
import InlineLoader from "../../../application/appLayout/InlineLoader";
import {EditIcon, FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon} from "../../../infrastructure/icons/Icons";
import {ExperienceLevel} from "../../../infrastructure/enums/skill";
const DescriptionForm = lazy(() => import("./forms/DescriptionForm"));
const SkillsForm = lazy(() => import("./forms/SkillsForm"));
const SocialsForm = lazy(() => import("./forms/SocialsForm"));
const LanguageForm = lazy(() => import("./forms/LanguageForm"));

interface IProps{
    profile: IPrivateProfile;
}

// TODO - add existing items

const AccountBio : React.FC<IProps> = ({profile}) => {
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingSocials, setIsEditingSocials] = useState(false);
    const [isEditingLanguage, setIsEditingLanguage] = useState(false);
    return (
        <div className="task__bid__form__card">
            <Box>
                <HStack justifyContent="space-between">
                    <p className="text__bold">Description</p>
                    <span style={{cursor: "pointer"}} className="text__blue" onClick={() => setIsEditingDescription(!isEditingDescription)}>{isEditingDescription ? <span>&#8722;</span> : <EditIcon boxSize={5} /> } Edit Description</span>
                </HStack>
                <Divider />
                {isEditingDescription ? 
                    <Suspense fallback={<InlineLoader />}>
                    <DescriptionForm cancelEditing={setIsEditingDescription} description={profile.bio} />
                    </Suspense>
                    : <Box mt={4} mb={4}><p className="text__darker text__sm">{profile.bio ? profile.bio : "Tell your taskr about you"}</p></Box>}
            </Box>
            <Box mt={3} mb={3}>
                <HStack justifyContent="space-between">
                    <p className="text__bold">Skills</p>
                    <span style={{cursor: "pointer"}} className="text__blue" onClick={() => setIsEditingSkills(!isEditingSkills)}>{isEditingSkills ? <span>&#8722;</span> : <EditIcon boxSize={5} />} Add New</span>
                </HStack>
                <Divider />
                {isEditingSkills ? (
                    <Suspense fallback={<InlineLoader />}>
                        <SkillsForm cancelEditing={setIsEditingSkills} />
                    </Suspense>
                ) : profile.skillSet.length == 0 ? <p className="text__light__grey text__sm text__bold" style={{margin: "1em 0"}}>Add your skills</p> : (
                    <Box mt={4} mb={4}>
                        {profile.skillSet.map((skill, i) => (
                            <p className="text__darker" key={i}>{skill.skillName} - <span className="text__light">{ExperienceLevel[skill.experienceLevel]}</span></p>
                        ))}
                    </Box>
                )}
            </Box>
            
            <Box mt={3} mb={3}>
                <HStack justifyContent="space-between">
                    <p className="text__bold">Languages</p>
                    <span style={{cursor: "pointer"}} className="text__blue" onClick={() => setIsEditingLanguage(!isEditingLanguage)}>{isEditingLanguage ? <span>&#8722;</span> : <EditIcon boxSize={5} />} Add New</span>
                </HStack>
                <Divider />
                {isEditingLanguage ? (
                    <Suspense fallback={<InlineLoader />}>
                        <LanguageForm cancelEditing={setIsEditingLanguage} />
                    </Suspense>
                ) : profile.languages.length === 0 ? <p className="text__light__grey text__sm text__bold" style={{margin: "1em 0"}}>Add a language</p> : (
                    <Box mt={4} mb={4}>
                        {profile.languages.map((language, i) => (
                            <p className="text__darker" key={i}>{language.languageName} - <span className="text__light">{ExperienceLevel[language.experienceLevel]}</span></p>
                        ))}
                    </Box>
                )}
            </Box>
            <Box mt={3} mb={3}>
                <HStack justifyContent="space-between">
                    <p className="text__bold">Socials</p>
                    <span style={{cursor: "pointer"}} className="text__blue" onClick={() => setIsEditingSocials(!isEditingSocials)}>{isEditingSocials ? <span>&#8722;</span> : <EditIcon boxSize={5} />} Add Social links</span>
                </HStack>
                <Divider />
                {isEditingSocials ?  (
                    <Suspense fallback={<InlineLoader />}>
                        <SocialsForm socials={profile.socials} cancelEditing={setIsEditingSocials} />
                    </Suspense>
                ) : <div style={{margin: "1em 0"}}>
                    <Box mb={8}>
                        <div>
                            <HStack spacing="10px">
                                <FacebookIcon />
                                <span className="text__blue cursor">{profile.socials !== null && profile.socials.facebook ? <a href={profile.socials.facebook} target="_blank" rel="noreferrer noopener">{profile.socials.facebook}</a>  : "--"}</span>
                            </HStack>
                        </div>
                    </Box>
                    <Box mb={8}>
                        <div>
                            <HStack spacing="10px">
                                <TwitterIcon />
                                <span className="text__blue cursor">{profile.socials !== null && profile.socials.twitter ? <a href={profile.socials.twitter} target="_blank" rel="noreferrer noopener">{profile.socials.twitter}</a>  : "--"}</span>
                            </HStack>
                        </div>
                    </Box>
                    <Box mb={8}>
                        <div>
                            <HStack spacing="10px">
                                <InstagramIcon/>
                                <span className="text__blue cursor">{profile.socials !== null && profile.socials.instagram ? <a href={profile.socials.instagram} target="_blank" rel="noreferrer noopener">{profile.socials.instagram}</a> : "--"}</span>
                            </HStack>
                        </div>
                    </Box>
                    <Box mb={8}>
                        <div>
                            <HStack spacing="10px">
                                <PinterestIcon />
                                <span className="text__blue cursor">{profile.socials !== null && profile.socials.pinterest ? <a href={profile.socials.pinterest} target="_blank" rel="noreferrer noopener">{profile.socials.pinterest}</a> : "--"}</span>
                            </HStack>
                        </div>
                    </Box>
                </div>}
            </Box>
        </div>
    )
}

export default observer(AccountBio);