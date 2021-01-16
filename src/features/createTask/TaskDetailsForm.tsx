import {Button, Checkbox, Divider, Input, SimpleGrid, Stack, Textarea } from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import {StringParam, useQueryParams} from "use-query-params";
import SEO from "../../application/appLayout/SEO";
import {InfoIcon} from "../../infrastructure/icons/Icons";
import TaskFormImageUploader from "./TaskFormImageUploader";
import TaskFormUploadedImagesPreview from "./TaskFormUploadedImagesPreview";

const TaskDetailsForm = () => {
    const [taskDetails] = useQueryParams({
        title: StringParam,
        category: StringParam
    }) 
    
    return (
        <div className="container">
            <SEO title={`${taskDetails.title} for ${taskDetails.category}`} />
            <div className="main">
                <div style={{margin: "1em 0"}}>
                    <h1 className="text__darker text__bigger__md">Post your task it&apos;s <span className="text__primary">Fast</span> & <span className="text__primary">Easy</span></h1>
                </div>
                
                <Formik initialValues={{title: taskDetails.title!, description: "", urgent: false, imageFiles: []}} onSubmit={values => console.log(values)}>
                    {({
                       handleChange,
                       handleBlur, 
                       handleSubmit,
                       values,
                       errors,
                       touched,
                        setFieldValue
                    }) => (
                        
                    
                <form onSubmit={handleSubmit}>
                    
                <div className="form__box">
                  <div className="form__box__description">
                      <div className="numbered__box">1</div>
                      Task Details
                  </div>
                  <Divider mt={4} mb={4} />  
                  <div className="form__field form__task">
                      <Stack direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "15px", sm: "8px"}}>
                          <p className="form__detail">Task title:</p>
                          <div style={{width: "100%"}}>
                          <Textarea name="title" className="form__textarea form__textarea__no__label" id="title" rows={3} onChange={handleChange} onBlur={handleBlur} value={values.title} />
                          {errors.title && touched.title && (
                              <small className="form__error">{errors.title}</small>
                          )}
                          </div>
                      </Stack>
                  </div>
                    <div className="form__field form__task">
                        <Stack direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "5px", sm: "8px"}}>
                            <p className="form__detail">Selected Category:</p>
                            <div style={{width: "100%"}}>
                            <p className="text__darker">{taskDetails.category}</p>
                            <span className="text__blue">change</span>
                            </div>
                        </Stack>
                    </div>

                    <div className="form__field form__task">
                        <Stack direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "5px", sm: "8px"}}>
                            <p className="form__detail">Description:</p>
                            <div style={{width: "100%"}}>
                                <Textarea name="description" className="form__textarea form__textarea__no__label" id="title" rows={7} onChange={handleChange} onBlur={handleBlur} value={values.description} />
                                {errors.description && touched.description ? (
                                    <small className="form__error">{errors.description}</small>
                                ) : <small className="text__darker"><span style={{marginRight: "0.5em"}}><InfoIcon boxSize={6} color="#3182CE" /></span>Be as specific as you can about what needs doing</small>}
                            </div>
                        </Stack>
                    </div>

                    <div className="form__field form__task" style={{margin: "2em 0"}}>
                        <Stack alignItems="center" direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "5px", sm: "8px"}}>
                            <p className="form__detail">Urgency:<span style={{display: "block"}}>(Optional)</span></p>
                                
                            <div style={{width: "100%"}}>
                                <Checkbox className="form__checkbox__bg" size="lg" colorScheme="green" iconSize="2em" spacing="1em"><div className="urgent__label">URGENT</div>
                                </Checkbox>
                                <div>
                                <small className="text__darker"><span style={{marginRight: "0.5em"}}><InfoIcon boxSize={6} color="#3182CE" /></span>Add an urgent label to let taskers know that you are looking for quick responses</small>
                                </div>
                                 </div>
                        </Stack>
                    </div>

                    <div className="form__field form__task" >
                        <Stack direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "5px", sm: "8px"}}>
                            <p className="form__detail">Tags:<span style={{display: "block"}}>(Optional)</span></p>
                            <div style={{width: "100%"}}>
                                <p className="text__dark__grey">Increase your exposure. Enter up to 4 keywords taskers can use to search yout task.</p>
                                
                                <Stack style={{marginTop: "1em"}} direction="row" spacing="20px">
                                    <Input style={{width: "300px"}} placeholder="Add a tag" className="form__input" />
                                    <Button type="button" style={{fontWeight: 500}} className="btn btn__sm btn__primary">Add tag</Button>
                                </Stack>
                            </div>
                        </Stack>
                    </div>
                    
                </div>

                    <div className="form__box">
                        <div className="form__box__description">
                            <div className="numbered__box">2</div>
                            Task Media (Optional)
                        </div>
                        <Divider mt={4} mb={4} />
                        
                        <h1 className="title">Add photos to imporve the interest on your task</h1>
                        
                        <p className="text__silent text__sm text__small__cut">Add pictures that explain your task or pictures of what you want to be done. You can upload a maximum of 3 photos. The photos are stored in a cloudinary bucket and resize the image to the recommended 618px by 427px ratio. Drag an drop your photos into the given area below.</p>
                        
                        <SimpleGrid style={{margin: "2em 0", width: "100%"}} templateColumns={{xl: "1fr 1fr", lg: "1fr 1fr", md: "1fr", sm: "1fr"}}   spacing="20px">
                            <div>
                        <TaskFormImageUploader setFieldValue={setFieldValue} />
                            </div>
                            <div>
                        <TaskFormUploadedImagesPreview />
                            </div>
                        </SimpleGrid>
                        
                    </div>

                    <div className="form__box">
                        <div className="form__box__description">
                            <div className="numbered__box">3</div>
                            Task Location
                        </div>
                        <Divider mt={4} mb={4} />
                        
                        

                    </div>


                    <button type="submit">submit</button>
                </form>
                    )}
                </Formik>
                
            </div>
        </div>
    )
}

export default observer(TaskDetailsForm);