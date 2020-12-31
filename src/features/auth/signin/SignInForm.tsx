import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import {ISignInFormValues} from "../../../infrastructure/models/auth";
import * as yup from "yup";
import {Input, InputGroup, InputLeftElement, Button, Flex, Checkbox, Spacer } from "@chakra-ui/react";
import {EmailIcon, PadLockIcon} from "../../../infrastructure/icons/Icons";
import {Link} from "react-router-dom";
import rootStoreContext from "../../../application/stores/rootstore";

const SignInForm = () => {
    const {signInUser} = useContext(rootStoreContext).authStore;
    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required!").email("Valid email is required"),
        password: yup.string().required("Password is required!")
    });
    
    return (
        <Formik validationSchema={validationSchema} initialValues={{email: "", password: ""}} onSubmit={(values: ISignInFormValues, action) => signInUser(values).then(() => alert("Signed in !")).catch(() => action.setSubmitting(false))}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                errors,
                isValid,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit} style={{marginTop: "0.7em"}}>
                    <div className="form__field">
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" className={errors.email && touched.email ? "form__input__icon form__input__icon__error" : "form__input__icon"}>
                            <EmailIcon boxSize={7} color="#777777" />
                        </InputLeftElement>
                        <div style={{width: "100%"}}>
                        <Input isInvalid={!!errors.email && !!touched.email} errorBorderColor="#E12120" className="form__input form__input_w_icon" placeholder="Email address" value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email && (
                            <small className="form__error">{errors.email}</small>
                        )}
                        </div>
                    </InputGroup>
                    </div>
                    <div className="form__field">
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" className={errors.password && touched.password ? "form__input__icon form__input__icon__error" : "form__input__icon"}>
                            <PadLockIcon boxSize={7} color="#777777" />
                        </InputLeftElement>
                        <div style={{width: "100%"}}>
                            <Input isInvalid={!!errors.password && !!touched.password} errorBorderColor="#E12120" className="form__input form__input_w_icon" placeholder="Password" value={values.password} type="password" name="password" onChange={handleChange} onBlur={handleBlur} />
                            {errors.password && touched.password && (
                                <small className="form__error">{errors.password}</small>
                            )}
                        </div>
                    </InputGroup>
                    </div>
                    <div className="form__field">
                        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting || !isValid } className="form__action__button btn__full-width btn__primary">Sign In</Button>
                    </div>
                    <div>
                        <Flex alignItems="center">
                            <Checkbox size="md" defaultIsChecked colorScheme="#3D3373" className="form__checkbox" iconColor="#3D3373">Remember me</Checkbox>
                            <Spacer />
                            <Link to="/" className="text__blue">Forgot password?</Link>
                        </Flex>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default observer(SignInForm);