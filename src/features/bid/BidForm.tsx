import {
    InputGroup,
    InputLeftElement, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Button,
    Flex,
    Spacer
} from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, {useContext, useState} from "react";
import {IBidSubmission} from "../../infrastructure/models/bid";
import {ITask} from "../../infrastructure/models/task";
import {MoneyIcon} from "../../infrastructure/icons/Icons";
import * as yup from "yup";
import rootStoreContext from "../../application/stores/rootstore";

interface IProps{
    task: ITask
}

const BidForm : React.FC<IProps> = ({task}) => {
    const [isDescriptionEnabled, setDescription] = useState<boolean>(false);
    const validationSchema = yup.object().shape({
        price: yup.number().lessThan(task.initialPrice, `Price must be less than initial bid: $${task.initialPrice} `)
    });
    const {createBid} = useContext(rootStoreContext).bidStore;
    
    return (
        <Formik validationSchema={validationSchema} initialValues={{description: "", price: 0}} onSubmit={(values: IBidSubmission, action) => {
            createBid(isDescriptionEnabled  ? values : {price: values.price}, task.id).finally(() => action.setSubmitting(false));
        }}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <form onSubmit={handleSubmit} className="task__bid__form__card">
                    
                    <div className="map__compact__image">
                        <img src="https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg" alt="compact-map" />
                        <p className="map__compact__footer">VIEW MAP</p>
                    </div>
                  
                    <div style={{textAlign: "center", margin: "1em 0"}}>
                        <Flex spacing="10px" alignItems="center">
                            
                    <span style={{color: "#777777", fontSize: "12px"}} className="query__price__label a"><MoneyIcon boxSize={8} color="#37a864"/>Budget:</span>
                            
                            <Spacer />
                            
                        <h3 style={{color:"#37a864", fontSize: "24px"}}> &#36;{task.initialPrice}</h3>
                        </Flex>
                    </div>
                  
                    
                    <div className="form__field">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                fontSize="1.2em"
                                className="query__price__placeholder"
                            >
                                $
                            </InputLeftElement>
                            <NumberInput max={task.initialPrice} clampValueOnBlur={false}  size="md" defaultValue={0} precision={2} min={0}>
                                <NumberInputField name="price" error={!!errors.price && touched.price} value={values.price} onChange={handleChange} onBlur={handleBlur}  className="task__price__input" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>

                            </NumberInput>
                        </InputGroup>
                        {errors.price ? <small className="form__error">{errors.price}</small> :<small className="form__sm__text">Enter ${task.initialPrice} or less</small>}
                    </div>

                    <button type="button" className="text__blue" onClick={() => setDescription(!isDescriptionEnabled)}>{isDescriptionEnabled ? <span>&#8722;</span> : <span>&#43;</span>} {!isDescriptionEnabled ? "Add description" : "Remove description"}</button>

                    {isDescriptionEnabled && <div className="form__field">
                        <label data-testid="label" className="form__textarea__label" id="message-Your Message" htmlFor="description">Your Message</label>
                        <textarea data-testid="input" value={values.description} onChange={handleChange} onBlur={handleBlur} className="form__textarea" id="description" rows={3} name="description" />
                    </div>}
                    
                    <div className="form__field">
                        <Button disabled={!isValid || isSubmitting} isLoading={isSubmitting} style={{fontWeight: 500}} type="submit" className="btn btn__primary btn__bg btn__full-width">SUBMIT BID</Button>
                    </div>
                    
                    <div style={{textAlign: "center"}}>
                        <p className="text__primary" style={{fontSize: "11px", lineHeight: "16px"}}>To make taskr a more reliable platform for delegating tasks we treat all bids as legal binding. By sending this bid you agree with our Terms of Use and Privacy Policy.</p>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default observer(BidForm);