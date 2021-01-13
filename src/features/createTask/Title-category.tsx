import {Button, Select, Textarea } from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Category } from "../../infrastructure/enums/category";
import SoftAlert from "../../application/common/SoftAlert";
import {IdeaIcon} from "../../infrastructure/icons/Icons";
import {history} from "../../index";
import SEO from "../../application/appLayout/SEO";
import * as yup from "yup";

const TitleCategory = () =>{
        const validationSchema = yup.object().shape({
            title: yup.string().required("Descriptive title for your task is required").max(50, "Task title is too long").min(3, "Task title is too short"),
            category: yup.string().required("Task category is required")
        })
    return (
        <div>
            <SEO title="Select a category" />
            <div className="middle_position changing__middle__box">
                <div style={{margin: "1em 0"}}>
                    <h1 className="text__primary text__lg text__middle">Tell us what you need done?</h1>
                </div>
                
                <Formik validationSchema={validationSchema} initialValues={{title: "", category: ""}} onSubmit={values => history.push(`/post-task?title=${values.title}&category=${values.category}`)}>
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
                                
                                <small className="form__textarea__counter text__silent">{values.title.length}/50</small>
                                {errors.title && touched.title && (
                                    <small className="form__error">{errors.title}</small>
                                )}
                            </div>
                             
                            <div className="form__field">
                                <label htmlFor="category" className="text__darker text__bigger__md">Category</label>
                                <Select isInvalid={!!errors.category && touched.category} name="category" onChange={handleChange} onBlur={handleBlur} value={values.category} size="lg" className="form__select" variant="filled" placeholder="Please select a category">
                                    {Object.values(Category).map((category, i) => (
                                        <option key={i} value={category}>
                                            {category}
                                        </option>
                                    ))} 
                                </Select>
                                {errors.category && touched.category && (
                                    <small className="form__error">{errors.category}</small>
                                )}
                            </div>
                            
                            
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
    )
}

export default observer(TitleCategory);