import {Button, RadioGroup, Select, Textarea, Radio, FormControl, FormLabel, HStack, FormHelperText, Box } from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Category } from "../../infrastructure/enums/category";
import SoftAlert from "../../application/common/SoftAlert";
import {IdeaIcon} from "../../infrastructure/icons/Icons";
import {history} from "../../index";
import SEO from "../../application/appLayout/SEO";
import * as yup from "yup";
import {getAllEnumKeys} from "../../infrastructure/enums/enumFunctions";

const TitleCategory = () =>{
        const validationSchema = yup.object().shape({
            title: yup.string().required("Descriptive title for your task is required").max(140, "Task title is too long").min(3, "Task title is too short"),
            category: yup.string().required("Task category is required")
        })
    return (
        <div className="container">
            <SEO title="Select a category" />
            <div className="main">
                <div className="changing__middle__box middle__item">
                <div style={{margin: "1em 0"}}>
                    <h1 className="text__primary text__lg text__middle">Tell us what you need done?</h1>
                </div>
                
                <Formik validationSchema={validationSchema} initialValues={{title: "", category: undefined, deliveryType: "0"}} onSubmit={values => history.push(`/post-task?title=${values.title}&category=${values.category}&deliveryType=${values.deliveryType}`)}>
                    {({
                        handleSubmit,
                        handleBlur,
                        handleChange,
                        values,
                        errors,
                        touched,
                        isValid,
                        dirty
                      }) => (
                        <form  onSubmit={handleSubmit}>
                            <div className="form__field">
                                <label data-testid="label" className="text__darker text__bigger__md" id="message-Your Message" htmlFor="title">Task title</label>
                                <Textarea isInvalid={!!errors.title && touched.title} data-testid="input" value={values.title} onChange={handleChange} onBlur={handleBlur} className="form__textarea form__textarea__no__label" id="title" rows={3} name="title" />
                                
                                <small className="form__textarea__counter text__silent">{values.title.length}/140</small>
                                {errors.title && touched.title && (
                                    <small className="form__error">{errors.title}</small>
                                )}
                            </div>
                             
                            <div className="form__field">
                                <label htmlFor="category" className="text__darker text__bigger__md">Category</label>
                                <Select isInvalid={!!errors.category && touched.category} name="category" onChange={handleChange} onBlur={handleBlur} value={values.category} size="lg" className="form__select" variant="filled" placeholder="Please select a category">
                                    {getAllEnumKeys(Category).map((category: string, i) => (
                                        <option key={category} value={i}>
                                            {category}
                                        </option>
                                    ))} 
                                </Select>
                                {errors.category && touched.category && (
                                    <small className="form__error">{errors.category}</small>
                                )}
                            </div>
                            
                            <Box mt="1.5em" className="form__field em">
                                <FormControl as="fieldset">
                                    <FormLabel as="legend">Delivery type</FormLabel>
                                    <RadioGroup name="deliveryType" value={values.deliveryType}  defaultValue="0">
                                        <HStack spacing="24px">
                                            <Radio colorScheme="green" onChange={handleChange} onBlur={handleBlur} className="form__radio__bg" value="0"><p  className="text__nm text__darker">In person (Physical)</p></Radio>
                                            <Radio colorScheme="green" onChange={handleChange} onBlur={handleBlur} className="form__radio__bg" value="1"><p className="text__nm text__darker">Online (Remote)</p></Radio>
                                        </HStack>
                                    </RadioGroup>
                                    <FormHelperText>Select the best location type for your task</FormHelperText>
                                </FormControl> 
                            </Box>
                            
                            
                            <div style={{margin: "2em 0"}}>
                                <Button disabled={!isValid || !dirty} type="submit" className="btn btn__bg btn__full-width btn__primary">Continue</Button>
                            </div>
                            
                            <div style={{margin: "2em 0"}}>
                                <SoftAlert icon={<IdeaIcon color="#719FF1" boxSize={10} />} message="Descriptive title help taskers find your task easily" />
                            </div>
                            
                        </form>
                    )}
                </Formik>
            </div>
        </div>
        </div>
    )
}

export default React.memo(observer(TitleCategory));