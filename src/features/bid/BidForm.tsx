import {
    InputGroup,
    InputLeftElement, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Button
} from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, {useState} from "react";
import {IBidSubmission} from "../../infrastructure/models/bid";
import {ITask} from "../../infrastructure/models/task";
// import MoneyIcon from "../../infrastructure/icons/Icons";

interface IProps{
    task: ITask
}

const BidForm : React.FC<IProps> = ({task}) => {
    const [isDescriptionEnabled, setDescription] = useState<boolean>(false);
    return (
        <Formik initialValues={{description: "", price: 0}} onSubmit={(values: IBidSubmission) => {
            console.log(isDescriptionEnabled  ? values : {price: values.price});
        }}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                values
              }) => (
                <form onSubmit={handleSubmit} className="task__bid__form__card">
                    
                    <div className="map__compact__image">
                        <img src="https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg" alt="compact-map" />
                        <p className="map__compact__footer">VIEW MAP</p>
                    </div>
                  
                    <h3 style={{color:"#37a864", fontSize: "24px"}}><span style={{color: "#777777", fontSize: "16px"}}>Starting at</span> &#36;{task.initialPrice}<span style={{color: "#777777", fontSize: "13px"}}>/ Price</span></h3>
                  
                    
                    <p style={{marginBottom: "1em"}}>Place a bid</p>
                  
                    <div className="form__field">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                fontSize="1.2em"
                                className="query__price__placeholder"
                            >
                                $
                            </InputLeftElement>
                            <NumberInput size="md" defaultValue={0} precision={2} min={0}>
                                <NumberInputField name="price" value={values.price} onChange={handleChange} onBlur={handleBlur}  className="task__price__input" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>

                            </NumberInput>
                        </InputGroup>
                        <small className="form__sm__text">Enter ${task.initialPrice} or less</small>
                    </div>

                    <button type="button" className="text__blue" onClick={() => setDescription(!isDescriptionEnabled)}>{isDescriptionEnabled ? <span>&#8722;</span> : <span>&#43;</span>} Add description</button>

                    {isDescriptionEnabled && <div className="form__field">
                        <label data-testid="label" className="form__textarea__label" id="message-Your Message" htmlFor="description">Your Message</label>
                        <textarea data-testid="input" value={values.description} onChange={handleChange} onBlur={handleBlur} className="form__textarea" id="description" rows={3} name="description" />
                    </div>}
                    
                    <div className="form__field">
                        <Button isLoading={isSubmitting} type="submit" className="btn btn__primary btn__bg btn__full-width">Submit bid</Button>
                    </div>
                    
                    <div style={{textAlign: "center"}}>
                        <p className="text__primary" style={{fontSize: "11px", lineHeight: "16px"}}>To deter and identify potential fraud, spam or suspicious behaviour, we anonymize your email address (as applicable) and reserve the right to monitor conversations. By sending the message you agree to our Terms of Use and Privacy Policy.</p>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default observer(BidForm);