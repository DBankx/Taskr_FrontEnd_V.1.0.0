import { Formik } from "formik";
import React, {useContext} from "react";
import {Box, Button, Input, SimpleGrid} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import * as yup from "yup";
import rootStoreContext from "../../../../application/stores/rootstore";

const SecurityForm = () => {
    const {changePassword} = useContext(rootStoreContext).authStore;
    
    const validationSchema = yup.object().shape({
        currentPassword: yup.string().required("Your current password is required!"),
        newPassword: yup.string().required("New password is required!").min(8, "New password must not be less than 8 characters").matches(new RegExp("[A-Z]"), "New password must contain 1 uppercase letter").matches(new RegExp("[a-z]"), "New password must have at least 1 lowercase character").matches(new RegExp("[0-9]"), "New password contains at least one number").matches(new RegExp("[^a-zA-Z0-9]"), "New password must contain one Alphanumeric").notOneOf([yup.ref("currentPassword"), undefined], "New password must not be the same as old password"),
        confirmPassword: yup.string().required("Please confirm your new password!").oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    })
    return (
        <Formik validationSchema={validationSchema} initialValues={{currentPassword: "", newPassword: "", confirmPassword: ""}} onSubmit={(values, actions) => {
            changePassword(values).finally(() => actions.setSubmitting(false));
        }}>
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                touched,
                errors,
                dirty,
                isValid,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <p className="text__primary text__bold" style={{marginBottom: "1em"}}>Change password</p>
                    <Box className="form__field">
                        <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                            <label className="text__darker">Current Password</label>
                            <Box>
                            <Input type="password" name="currentPassword" isInvalid={!!errors.currentPassword && touched.currentPassword} className="form__input" value={values.currentPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your current password" />
                            {errors.currentPassword && touched.currentPassword && <small className="form__error">{errors.currentPassword}</small>}
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box className="form__field">
                        <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                            <label className="text__darker">New password</label>
                            <Box>
                            <Input  type="password" name="newPassword" isInvalid={!!errors.newPassword && touched.newPassword} className="form__input" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your new password" />
                            {errors.newPassword && touched.newPassword && <small className="form__error">{errors.newPassword}</small>}
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box className="form__field">
                        <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                            <label className="text__darker">Confirm Password</label>
                            <Box>
                            <Input type="password"  name="confirmPassword" isInvalid={!!errors.confirmPassword && touched.confirmPassword} className="form__input" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm your new password" />
                            {errors.confirmPassword && touched.confirmPassword && <small className="form__error">{errors.confirmPassword}</small>}
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box className="form__field">
                        <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                            <Box />
                        <p className="text__silent">8 characters or longer. Combine upper and lowercase letters and numbers.</p>
                        </SimpleGrid>
                    </Box>
                    <Box className="flex__left">
                        <Button disabled={isSubmitting || !dirty || !isValid} isLoading={isSubmitting} type="submit" className="btn btn__nm btn__primary">Change password</Button>
                    </Box>
                </form>
            )}  
        </Formik>
    )
}

export default observer(SecurityForm);