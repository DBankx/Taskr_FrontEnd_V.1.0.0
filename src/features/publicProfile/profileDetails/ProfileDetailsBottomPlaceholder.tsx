import {Box, Divider, Skeleton} from "@chakra-ui/react";
import React from "react";

const ProfileDetailsBottomPlaceholder = () => {
    return (
        <Box className="task__bid__form__card">
            <Box>
                <Skeleton width="100px" height="20px" />
                
                <Box mt={5}>
                <Skeleton mt={5} height="20px" />
                <Skeleton mt={5} height="20px" />
                <Skeleton mt={5} height="20px" />
                </Box>
            </Box>

            <Divider mt={6} mb={6} />
            
            <Box>
                <Skeleton width="100px" height="20px" />

                <Box mt={5}>
                    <Skeleton mt={5} height="20px" />
                    <Skeleton mt={5} height="20px" />
                    <Skeleton mt={5} height="20px" />
                </Box> 
            </Box>

            <Divider mt={6} mb={6} />
            
            <Box>
                <ul className="profile__skill__list">
                    <li className="profile__skill__label"><Skeleton width="70px" height="15px" /></li>
                    <li className="profile__skill__label"><Skeleton width="70px" height="15px" /></li>
                    <li className="profile__skill__label"><Skeleton width="70px" height="15px" /></li>
                    <li className="profile__skill__label"><Skeleton width="70px" height="15px" /></li>
                    <li className="profile__skill__label"><Skeleton width="70px" height="15px" /></li>
                </ul>
            </Box>
        </Box>
    )
}

export default ProfileDetailsBottomPlaceholder;