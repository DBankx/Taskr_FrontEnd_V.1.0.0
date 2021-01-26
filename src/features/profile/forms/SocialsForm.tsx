import { Formik } from "formik";
import React from "react";
import {Button, HStack, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon} from "../../../infrastructure/icons/Icons";

interface IProps{
    cancelEditing: any;
}

const SocialsForm : React.FC<IProps> = ({cancelEditing}) => {
    return (
        <Formik initialValues={{twitter: "", instagram: "", facebook: "", pinterest: ""}} onSubmit={values => console.log(values)}>
            {({
                  values,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  handleChange,
                  errors,
                  touched
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
                        <Button className="btn btn__primary btn__long" isLoading={isSubmitting}>Update</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(SocialsForm);