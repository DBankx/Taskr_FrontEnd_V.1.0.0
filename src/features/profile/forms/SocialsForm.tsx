import { Formik } from "formik";
import React, {useContext} from "react";
import {Button, HStack, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon} from "../../../infrastructure/icons/Icons";
import {ISocials} from "../../../infrastructure/models/profile";
import * as yup from "yup";
import rootStoreContext from "../../../application/stores/rootstore";

interface IProps{
    cancelEditing: any;
    socials: ISocials;
}

const SocialsForm : React.FC<IProps> = ({cancelEditing, socials}) => {
    const validationSchema = yup.object().shape({
        twitter: yup.string().url("Please use a full twitter url e.g https://twitter.com/you"),
        instagram: yup.string().url("Please use a full instagram url e.g https://instagram.com/you"),
        facebook: yup.string().url("Please use a full facebook url e.g https://facebook.com/you"),
        pinterest: yup.string().url("Please use a full pinterest url e.g https://pinterest.com/you")
    });
    
    const {updateProfile} = useContext(rootStoreContext).profileStore;
    
    return (
        <Formik validationSchema={validationSchema} initialValues={{twitter: socials !== null && socials.twitter ? socials.twitter : "", instagram:socials !== null && socials.instagram ? socials.instagram : "", facebook:socials !== null && socials.facebook ? socials.facebook : "", pinterest:socials !== null && socials.pinterest ? socials.pinterest : ""}} onSubmit={(values, action) => updateProfile(values).then(() => action.setSubmitting(false)).then(() => cancelEditing(false))}>
            {({
                  values,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  handleChange,
                  errors,
                  touched,
                isValid,
                dirty
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form__field">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" className={errors.facebook && touched.facebook ? "form__input__icon form__input__icon__error" : "form__input__icon"}>
                                <FacebookIcon boxSize={7} />
                            </InputLeftElement>
                            <div style={{width: "100%"}}>
                                <Input isInvalid={!!errors.facebook && !!touched.facebook} errorBorderColor="#E12120" className="form__input form__input_w_icon" placeholder="https://facebook.com/taskr" value={values.facebook} name="facebook" onChange={handleChange} onBlur={handleBlur} />
                                {errors.facebook && touched.facebook && (
                                    <small className="form__error">{errors.facebook}</small>
                                )}
                            </div>
                        </InputGroup>
                    </div>
                    <div className="form__field">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" className={errors.twitter && touched.twitter? "form__input__icon form__input__icon__error" : "form__input__icon"}>
                                <TwitterIcon boxSize={7} />
                            </InputLeftElement>
                            <div style={{width: "100%"}}>
                                <Input isInvalid={!!errors.twitter && !!touched.twitter} errorBorderColor="#E12120" className="form__input form__input_w_icon" placeholder="https://twitter.com/taskr"  value={values.twitter} name="twitter" onChange={handleChange} onBlur={handleBlur} />
                                {errors.twitter && touched.twitter && (
                                    <small className="form__error">{errors.twitter}</small>
                                )}
                            </div>
                        </InputGroup>
                    </div>
                    <div className="form__field">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" className={errors.instagram && touched.instagram ? "form__input__icon form__input__icon__error" : "form__input__icon"}>
                                <InstagramIcon boxSize={7} />
                            </InputLeftElement>
                            <div style={{width: "100%"}}>
                                <Input isInvalid={!!errors.instagram && !!touched.instagram} errorBorderColor="#E12120" className="form__input form__input_w_icon" placeholder="https://instagram.com/taskr"  value={values.instagram} name="instagram" onChange={handleChange} onBlur={handleBlur} />
                                {errors.instagram && touched.instagram && (
                                    <small className="form__error">{errors.instagram}</small>
                                )}
                            </div>
                        </InputGroup>
                    </div>
                    <div className="form__field">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" className={errors.pinterest && touched.pinterest ? "form__input__icon form__input__icon__error" : "form__input__icon"}>
                                <PinterestIcon boxSize={7} />
                            </InputLeftElement>
                            <div style={{width: "100%"}}>
                                <Input isInvalid={!!errors.pinterest && !!touched.pinterest} errorBorderColor="#E12120" className="form__input form__input_w_icon" placeholder="https://pinterest.com/taskr"  value={values.pinterest} name="pinterest" onChange={handleChange} onBlur={handleBlur} />
                                {errors.instagram && touched.instagram && (
                                    <small className="form__error">{errors.pinterest}</small>
                                )}
                            </div>
                        </InputGroup>
                    </div>
                    <HStack justifyContent="space-between">
                        <Button onClick={() => cancelEditing(false)} className="btn btn__long" type="button">Cancel</Button>
                        <Button type="submit" disabled={isSubmitting || !isValid || !dirty} className="btn btn__primary btn__long" isLoading={isSubmitting}>Update</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(SocialsForm);