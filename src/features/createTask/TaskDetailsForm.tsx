import {
    Button,
    Checkbox,
    Divider,
    Input, InputGroup,
    InputLeftElement,
    NumberInput, NumberInputField,
    SimpleGrid,
    Stack,
    Textarea
} from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, {lazy, Suspense, useCallback, useContext, useEffect, useState} from "react";
import {StringParam, useQueryParams, NumberParam} from "use-query-params";
import SEO from "../../application/appLayout/SEO";
import {InfoIcon} from "../../infrastructure/icons/Icons";
import TaskFormImageUploader from "./TaskFormImageUploader";
import TaskFormUploadedImagesPreview from "./TaskFormUploadedImagesPreview";
import {DeliveryTypes} from "../../infrastructure/enums/deliveryTypes";
import InlineLoader from "../../application/appLayout/InlineLoader";
import {ITaskSubmission} from "../../infrastructure/models/task";
import {v4 as uuid} from "uuid";
import rootStoreContext from "../../application/stores/rootstore";
import {history} from "../../index";
import {Category} from "../../infrastructure/enums/category";

const Preview = lazy(() => import("./Preview"));
const LocationComponent = lazy(() => import("./LocationFinder"));

const TaskDetailsForm = () => {
    const [taskDetails] = useQueryParams({
        title: StringParam,
        category: NumberParam,
        deliveryType: NumberParam
    })

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const togglePreviewWindow = useCallback(() => {
        setIsPreviewOpen(!isPreviewOpen)
    }, [isPreviewOpen])
    const closePreviewWindow = useCallback(() => {
        setIsPreviewOpen(false)
    }, [isPreviewOpen]);

    useEffect(() =>
        window.addEventListener('beforeunload', () => closePreviewWindow())
    );

   const {createTask} = useContext(rootStoreContext).taskStore;
   
    return (
        <div className="container">
            <SEO title={`${taskDetails.title} for ${taskDetails.category}`} />
            <div className="main">
                <div style={{margin: "1em 0"}}>
                    <h1 className="text__darker text__bigger__md">Post your task it&apos;s <span className="text__primary">Fast</span> & <span className="text__primary">Easy</span></h1>
                </div>
                
                <Formik initialValues={{title: taskDetails.title!, id: uuid(), description: "", urgent: false, imageFiles: [], address: "", postCode: "", price: 0, deliveryDate: "", category: taskDetails.category!, deliveryType: taskDetails.deliveryType!}} onSubmit={(values: ITaskSubmission, action) => {
                    const taskSubmissionData = new FormData();
                    taskSubmissionData.append("id", values.id);
                    taskSubmissionData.append("title", values.title);
                    taskSubmissionData.append("description", values.description);
                    values.imageFiles.forEach((image) => {
                        taskSubmissionData.append("imageFiles", image);
                    })
                    taskSubmissionData.append("address", values.address);
                    taskSubmissionData.append("postCode", values.postCode);
                    taskSubmissionData.append("initialPrice", values.price.toString());
                    taskSubmissionData.append("deliveryDate", new Date(values.deliveryDate).toUTCString());
                    taskSubmissionData.append("category", values.category.toString());
                    
                    createTask(taskSubmissionData).then(() => history.push(`/task/${values.id}`)).catch(() => action.setSubmitting(false));
                }}>
                    {({
                       handleChange,
                       handleBlur, 
                       handleSubmit,
                       values,
                       errors,
                       touched,
                        setFieldValue,
                        setFieldError,
                        isSubmitting
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
                            <p className="text__darker">{Category[taskDetails.category!]}</p>
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
                        <Stack direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "5px", sm: "8px"}}>
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
                                <small className="text__dark__grey">Increase your exposure. Enter up to 4 keywords taskers can use to search yout task.</small>
                                
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
                        
                        <div style={{marginBottom: "1em"}}>
                            <p className="bold__label">Delivery Type: <span className="text__darker">{DeliveryTypes[taskDetails.deliveryType!]}</span></p>
                            <p className="text__blue">Change</p>
                        </div>
                        {taskDetails.deliveryType! === DeliveryTypes.InPerson ? (
                            <Suspense fallback={<InlineLoader />}>
                                <p className="text__darker">Search and select your address</p>
                                <LocationComponent addressErrors={errors.address} setFieldError={setFieldError} setFieldValue={setFieldValue} values={values} />
                                <small className="text__darker"><span style={{marginRight: "0.5em"}}><InfoIcon boxSize={6} color="#3182CE" /></span>If you cannot see your address please select online as the delivery type then convey your real address to the runner on messages</small>
                               
                            </Suspense>
                        ) : (
                            <p className="text__darker">This task will be delivered online</p>
                        )}
                    </div>

                    <div className="form__box">
                        <div className="form__box__description">
                            <div className="numbered__box">4</div>
                            Budget & Dates
                        </div>
                        <Divider mt={4} mb={4} />

                        <div className="form__field form__task">
                            <Stack direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "5px", sm: "8px"}}>
                                <p className="form__detail">Budget:</p>
                                <div style={{width: "100%"}}>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            fontSize="1.2em"
                                            className="query__price__placeholder__green"
                                        >
                                            $
                                        </InputLeftElement>
                                        <NumberInput  clampValueOnBlur={false}  size="md" defaultValue={0} precision={2} min={0}>
                                            <NumberInputField name="price" error={!!errors.price && touched.price} value={values.price} onChange={handleChange} onBlur={handleBlur}  className="task__price__input" />
                                        </NumberInput>
                                    </InputGroup> 
                                    {errors.price && touched.price ? (
                                        <small className="form__error">{errors.price}</small>
                                    ) : <small className="text__darker"><span style={{marginRight: "0.5em"}}><InfoIcon boxSize={6} color="#3182CE" /></span>Your budget signifies the max amount you can pay, runners will start bidding from that price.</small>}
                                </div>
                            </Stack>
                        </div>

                        <div className="form__field form__task">
                            <Stack direction={["column", "row"]} spacing={{xl: "15px", lg: "15px", md: "5px", sm: "8px"}}>
                                <p className="form__detail">Delivery Date:</p>
                                <div style={{width: "100%"}}>
                                    <Input className="form__input" type="date" value={values.deliveryDate} onChange={handleChange} onBlur={handleBlur} name="deliveryDate" min={new Date().toISOString().split("T")[0]} />
                                    {errors.deliveryDate && touched.deliveryDate ? (
                                        <small className="form__error">{errors.deliveryDate}</small>
                                    ) : <small className="text__darker"><span style={{marginRight: "0.5em"}}><InfoIcon boxSize={6} color="#3182CE" /></span>Your task ends on the given date and you will have to re-activate it and set a new date</small>}
                                </div>
                            </Stack>
                        </div>

                    </div>
                    
                    <div style={{margin: "1em 0", lineHeight: "12px"}}>
                        <small className="text__darker text__small__cut">By listing your task on taskr, you are agreeing to our <span className="text__blue">terms of use, privacy policy</span> and <span className="text__blue">site policies</span>.</small>
                        <small className="text__darker text__small__cut" style={{display: "block"}}>Please do not post duplicate tasks.</small>
                    </div>

                    <Stack direction="row" spacing="20px">
                    <Button isLoading={isSubmitting} className="btn btn__primary btn__nm btn__bg btn__shadow " type="submit">List your task</Button>
                        <Button className="btn btn__white btn__nm btn__bg " type="submit" onClick={togglePreviewWindow}>Preview</Button>
                    </Stack>
                </form>
                    )}
                </Formik>
                
            </div>
            {isPreviewOpen && (
                <Suspense fallback={<InlineLoader />}>
                <Preview closeWindow={closePreviewWindow}>
                    apple
                </Preview>
                </Suspense>
            )} 
        </div>
    )
}

export default observer(TaskDetailsForm);