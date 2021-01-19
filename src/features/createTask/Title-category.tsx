import {Button, RadioGroup, Select, Textarea, Radio, SimpleGrid } from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Category } from "../../infrastructure/enums/category";
import SoftAlert from "../../application/common/SoftAlert";
import {IdeaIcon, LocationIcon, WebIcon} from "../../infrastructure/icons/Icons";
import {history} from "../../index";
import SEO from "../../application/appLayout/SEO";
import * as yup from "yup";
import {DeliveryTypes} from "../../infrastructure/enums/deliveryTypes";

const TitleCategory = () =>{
        const validationSchema = yup.object().shape({
            title: yup.string().required("Descriptive title for your task is required").max(50, "Task title is too long").min(3, "Task title is too short"),
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
                
                <Formik validationSchema={validationSchema} initialValues={{title: "", category: "", deliveryType: DeliveryTypes.InPerson}} onSubmit={values => history.push(`/post-task?title=${values.title}&category=${values.category}&deliveryType=${values.deliveryType}`)}>
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
                            
                            <div className="form__field">
                                <RadioGroup value={values.deliveryType} name="deliveryType" onChange={handleChange} onBlur={handleBlur}>
                                    <SimpleGrid spacing="10px" templateColumns={{xl: "1fr 1fr", lg: "1fr 1fr", md: "1fr 1fr", sm: "1fr"}}>
                                        
                                        <div className="form__location__picker">
                                            <p className="bold__label">Delivery type</p>
                                        <Radio defaultChecked className="form__radio__bg" colorScheme="green" value={DeliveryTypes.InPerson}>
                                            <p className="form__radio__bg__label">In Person</p>
                                        </Radio>
                                            <p className="text__darker">Select this option if a tasker is needed in person to respond to your needs.</p>
                                            <LocationIcon boxSize={8} color="#3D3373" />
                                        </div>
                                        
                                        <div className="form__location__picker">
                                            <p className="bold__label">Delivery type</p>
                                        <Radio className="form__radio__bg" colorScheme="green" value={DeliveryTypes.Online}>
                                            <p className="form__radio__bg__label">Online</p>
                                        </Radio>
                                            <p className="text__darker">Select this option if your needs can be met if the tasker works remotley.</p>
                                            <WebIcon boxSize={8} color="#3D3373" />
                                        </div>
                                    </SimpleGrid>
                                </RadioGroup>
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
        </div>
    )
}

export default React.memo(observer(TitleCategory));