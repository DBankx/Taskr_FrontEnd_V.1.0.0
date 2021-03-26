import React, {useContext} from "react";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Center} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import { Formik } from "formik";
import * as yup from "yup";
import rootStoreContext from "../../../application/stores/rootstore";
import {ISignUpFormValues} from "../../../infrastructure/models/auth";

const SignUpForm = () => {
    const {SignUpUser} = useContext(rootStoreContext).authStore;
    
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Please use a valid email address").required("Email address is required"),
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required!").min(8, "Password must not be less than 8 characters").matches(new RegExp("[A-Z]"), "Password must contain 1 uppercase letter").matches(new RegExp("[a-z]"), "Password must have at least 1 lowercase character").matches(new RegExp("[0-9]"), "Password contains at least one number").matches(new RegExp("[^a-zA-Z0-9]"), "Password must contain one Alphanumeric"),
        confirmPassword: yup.string().required("Please confirm your password!").oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    
    return (
       <Formik validationSchema={validationSchema} initialValues={{firstName: "", lastName: "", email: "", username: "", password: "", country: "", confirmPassword: ""}} onSubmit={(values: ISignUpFormValues, action) => {
           SignUpUser(values).finally(() => action.setSubmitting(false));
       }}>
           {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
               isValid,
               dirty
             }) => (
               <form onSubmit={handleSubmit} style={{marginTop: "0.7em"}}>
                   <Box className="form__field">
                   <FormControl isInvalid={!!errors.email && touched.email} id="email" isRequired>
                       <FormLabel style={{fontSize: "1em"}}>Email Address</FormLabel>
                       <Input type="text" isInvalid={!!errors.email && touched.email} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Please provide a valid email address" name="email"  />
                       {errors.email && touched.email && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.email}</FormErrorMessage>}
                   </FormControl>
                   </Box>
                   <Box className="form__field">
                   <Stack direction={["column", "row"]} justifyContent="space-between">
                       <FormControl isInvalid={!!errors.firstName && touched.firstName} id="firstName" isRequired>
                           <FormLabel style={{fontSize: "1em"}}>First Name</FormLabel>
                           <Input type="text" isInvalid={!!errors.firstName && touched.firstName} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.firstName} placeholder="John" name="firstName"  />
                           {errors.firstName && touched.firstName && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.firstName}</FormErrorMessage>}
                       </FormControl>
                       
                       <FormControl isInvalid={!!errors.lastName && touched.lastName} id="lastName" isRequired>
                           <FormLabel style={{fontSize: "1em"}}>Last Name</FormLabel>
                           <Input type="text" isInvalid={!!errors.lastName && touched.lastName} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.lastName} placeholder="Doe" name="lastName"  />
                           {errors.lastName && touched.lastName && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.lastName}</FormErrorMessage>}
                       </FormControl>
                   </Stack>
                   </Box>
                   <Box className="form__field">
                       <FormControl isInvalid={!!errors.username && touched.username} id="email" isRequired>
                           <FormLabel style={{fontSize: "1em"}}>Username</FormLabel>
                           <Input type="text" isInvalid={!!errors.username && touched.username} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.username} placeholder="Add a username" name="username"  />
                           {errors.username && touched.username && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.username}</FormErrorMessage>}
                       </FormControl>
                   </Box>
                       <Box className="form__field">
                       <FormControl isInvalid={!!errors.username && touched.username} id="country">
                       <FormLabel style={{fontSize: "1em"}}>Country of origin</FormLabel>
                       <Select className="form__select" id="country" name="country" onChange={handleChange} onBlur={handleBlur} value={values.country}>
                           <option value="">Please select a country</option>
                           <option value="Afganistan">Afghanistan</option>
                           <option value="Albania">Albania</option>
                           <option value="Algeria">Algeria</option>
                           <option value="American Samoa">American Samoa</option>
                           <option value="Andorra">Andorra</option>
                           <option value="Angola">Angola</option>
                           <option value="Anguilla">Anguilla</option>
                           <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                           <option value="Argentina">Argentina</option>
                           <option value="Armenia">Armenia</option>
                           <option value="Aruba">Aruba</option>
                           <option value="Australia">Australia</option>
                           <option value="Austria">Austria</option>
                           <option value="Azerbaijan">Azerbaijan</option>
                           <option value="Bahamas">Bahamas</option>
                           <option value="Bahrain">Bahrain</option>
                           <option value="Bangladesh">Bangladesh</option>
                           <option value="Barbados">Barbados</option>
                           <option value="Belarus">Belarus</option>
                           <option value="Belgium">Belgium</option>
                           <option value="Belize">Belize</option>
                           <option value="Benin">Benin</option>
                           <option value="Bermuda">Bermuda</option>
                           <option value="Bhutan">Bhutan</option>
                           <option value="Bolivia">Bolivia</option>
                           <option value="Bonaire">Bonaire</option>
                           <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                           <option value="Botswana">Botswana</option>
                           <option value="Brazil">Brazil</option>
                           <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                           <option value="Brunei">Brunei</option>
                           <option value="Bulgaria">Bulgaria</option>
                           <option value="Burkina Faso">Burkina Faso</option>
                           <option value="Burundi">Burundi</option>
                           <option value="Cambodia">Cambodia</option>
                           <option value="Cameroon">Cameroon</option>
                           <option value="Canada">Canada</option>
                           <option value="Canary Islands">Canary Islands</option>
                           <option value="Cape Verde">Cape Verde</option>
                           <option value="Cayman Islands">Cayman Islands</option>
                           <option value="Central African Republic">Central African Republic</option>
                           <option value="Chad">Chad</option>
                           <option value="Channel Islands">Channel Islands</option>
                           <option value="Chile">Chile</option>
                           <option value="China">China</option>
                           <option value="Christmas Island">Christmas Island</option>
                           <option value="Cocos Island">Cocos Island</option>
                           <option value="Colombia">Colombia</option>
                           <option value="Comoros">Comoros</option>
                           <option value="Congo">Congo</option>
                           <option value="Cook Islands">Cook Islands</option>
                           <option value="Costa Rica">Costa Rica</option>
                           <option value="Cote DIvoire">Cote DIvoire</option>
                           <option value="Croatia">Croatia</option>
                           <option value="Cuba">Cuba</option>
                           <option value="Curaco">Curacao</option>
                           <option value="Cyprus">Cyprus</option>
                           <option value="Czech Republic">Czech Republic</option>
                           <option value="Denmark">Denmark</option>
                           <option value="Djibouti">Djibouti</option>
                           <option value="Dominica">Dominica</option>
                           <option value="Dominican Republic">Dominican Republic</option>
                           <option value="East Timor">East Timor</option>
                           <option value="Ecuador">Ecuador</option>
                           <option value="Egypt">Egypt</option>
                           <option value="El Salvador">El Salvador</option>
                           <option value="Equatorial Guinea">Equatorial Guinea</option>
                           <option value="Eritrea">Eritrea</option>
                           <option value="Estonia">Estonia</option>
                           <option value="Ethiopia">Ethiopia</option>
                           <option value="Falkland Islands">Falkland Islands</option>
                           <option value="Faroe Islands">Faroe Islands</option>
                           <option value="Fiji">Fiji</option>
                           <option value="Finland">Finland</option>
                           <option value="France">France</option>
                           <option value="French Guiana">French Guiana</option>
                           <option value="French Polynesia">French Polynesia</option>
                           <option value="French Southern Ter">French Southern Ter</option>
                           <option value="Gabon">Gabon</option>
                           <option value="Gambia">Gambia</option>
                           <option value="Georgia">Georgia</option>
                           <option value="Germany">Germany</option>
                           <option value="Ghana">Ghana</option>
                           <option value="Gibraltar">Gibraltar</option>
                           <option value="Great Britain">Great Britain</option>
                           <option value="Greece">Greece</option>
                           <option value="Greenland">Greenland</option>
                           <option value="Grenada">Grenada</option>
                           <option value="Guadeloupe">Guadeloupe</option>
                           <option value="Guam">Guam</option>
                           <option value="Guatemala">Guatemala</option>
                           <option value="Guinea">Guinea</option>
                           <option value="Guyana">Guyana</option>
                           <option value="Haiti">Haiti</option>
                           <option value="Hawaii">Hawaii</option>
                           <option value="Honduras">Honduras</option>
                           <option value="Hong Kong">Hong Kong</option>
                           <option value="Hungary">Hungary</option>
                           <option value="Iceland">Iceland</option>
                           <option value="Indonesia">Indonesia</option>
                           <option value="India">India</option>
                           <option value="Iran">Iran</option>
                           <option value="Iraq">Iraq</option>
                           <option value="Ireland">Ireland</option>
                           <option value="Isle of Man">Isle of Man</option>
                           <option value="Israel">Israel</option>
                           <option value="Italy">Italy</option>
                           <option value="Jamaica">Jamaica</option>
                           <option value="Japan">Japan</option>
                           <option value="Jordan">Jordan</option>
                           <option value="Kazakhstan">Kazakhstan</option>
                           <option value="Kenya">Kenya</option>
                           <option value="Kiribati">Kiribati</option>
                           <option value="Korea North">Korea North</option>
                           <option value="Korea Sout">Korea South</option>
                           <option value="Kuwait">Kuwait</option>
                           <option value="Kyrgyzstan">Kyrgyzstan</option>
                           <option value="Laos">Laos</option>
                           <option value="Latvia">Latvia</option>
                           <option value="Lebanon">Lebanon</option>
                           <option value="Lesotho">Lesotho</option>
                           <option value="Liberia">Liberia</option>
                           <option value="Libya">Libya</option>
                           <option value="Liechtenstein">Liechtenstein</option>
                           <option value="Lithuania">Lithuania</option>
                           <option value="Luxembourg">Luxembourg</option>
                           <option value="Macau">Macau</option>
                           <option value="Macedonia">Macedonia</option>
                           <option value="Madagascar">Madagascar</option>
                           <option value="Malaysia">Malaysia</option>
                           <option value="Malawi">Malawi</option>
                           <option value="Maldives">Maldives</option>
                           <option value="Mali">Mali</option>
                           <option value="Malta">Malta</option>
                           <option value="Marshall Islands">Marshall Islands</option>
                           <option value="Martinique">Martinique</option>
                           <option value="Mauritania">Mauritania</option>
                           <option value="Mauritius">Mauritius</option>
                           <option value="Mayotte">Mayotte</option>
                           <option value="Mexico">Mexico</option>
                           <option value="Midway Islands">Midway Islands</option>
                           <option value="Moldova">Moldova</option>
                           <option value="Monaco">Monaco</option>
                           <option value="Mongolia">Mongolia</option>
                           <option value="Montserrat">Montserrat</option>
                           <option value="Morocco">Morocco</option>
                           <option value="Mozambique">Mozambique</option>
                           <option value="Myanmar">Myanmar</option>
                           <option value="Nambia">Nambia</option>
                           <option value="Nauru">Nauru</option>
                           <option value="Nepal">Nepal</option>
                           <option value="Netherland Antilles">Netherland Antilles</option>
                           <option value="Netherlands">Netherlands (Holland, Europe)</option>
                           <option value="Nevis">Nevis</option>
                           <option value="New Caledonia">New Caledonia</option>
                           <option value="New Zealand">New Zealand</option>
                           <option value="Nicaragua">Nicaragua</option>
                           <option value="Niger">Niger</option>
                           <option value="Nigeria">Nigeria</option>
                           <option value="Niue">Niue</option>
                           <option value="Norfolk Island">Norfolk Island</option>
                           <option value="Norway">Norway</option>
                           <option value="Oman">Oman</option>
                           <option value="Pakistan">Pakistan</option>
                           <option value="Palau Island">Palau Island</option>
                           <option value="Palestine">Palestine</option>
                           <option value="Panama">Panama</option>
                           <option value="Papua New Guinea">Papua New Guinea</option>
                           <option value="Paraguay">Paraguay</option>
                           <option value="Peru">Peru</option>
                           <option value="Phillipines">Philippines</option>
                           <option value="Pitcairn Island">Pitcairn Island</option>
                           <option value="Poland">Poland</option>
                           <option value="Portugal">Portugal</option>
                           <option value="Puerto Rico">Puerto Rico</option>
                           <option value="Qatar">Qatar</option>
                           <option value="Republic of Montenegro">Republic of Montenegro</option>
                           <option value="Republic of Serbia">Republic of Serbia</option>
                           <option value="Reunion">Reunion</option>
                           <option value="Romania">Romania</option>
                           <option value="Russia">Russia</option>
                           <option value="Rwanda">Rwanda</option>
                           <option value="St Barthelemy">St Barthelemy</option>
                           <option value="St Eustatius">St Eustatius</option>
                           <option value="St Helena">St Helena</option>
                           <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                           <option value="St Lucia">St Lucia</option>
                           <option value="St Maarten">St Maarten</option>
                           <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                           <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                           <option value="Saipan">Saipan</option>
                           <option value="Samoa">Samoa</option>
                           <option value="Samoa American">Samoa American</option>
                           <option value="San Marino">San Marino</option>
                           <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                           <option value="Saudi Arabia">Saudi Arabia</option>
                           <option value="Senegal">Senegal</option>
                           <option value="Seychelles">Seychelles</option>
                           <option value="Sierra Leone">Sierra Leone</option>
                           <option value="Singapore">Singapore</option>
                           <option value="Slovakia">Slovakia</option>
                           <option value="Slovenia">Slovenia</option>
                           <option value="Solomon Islands">Solomon Islands</option>
                           <option value="Somalia">Somalia</option>
                           <option value="South Africa">South Africa</option>
                           <option value="Spain">Spain</option>
                           <option value="Sri Lanka">Sri Lanka</option>
                           <option value="Sudan">Sudan</option>
                           <option value="Suriname">Suriname</option>
                           <option value="Swaziland">Swaziland</option>
                           <option value="Sweden">Sweden</option>
                           <option value="Switzerland">Switzerland</option>
                           <option value="Syria">Syria</option>
                           <option value="Tahiti">Tahiti</option>
                           <option value="Taiwan">Taiwan</option>
                           <option value="Tajikistan">Tajikistan</option>
                           <option value="Tanzania">Tanzania</option>
                           <option value="Thailand">Thailand</option>
                           <option value="Togo">Togo</option>
                           <option value="Tokelau">Tokelau</option>
                           <option value="Tonga">Tonga</option>
                           <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                           <option value="Tunisia">Tunisia</option>
                           <option value="Turkey">Turkey</option>
                           <option value="Turkmenistan">Turkmenistan</option>
                           <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                           <option value="Tuvalu">Tuvalu</option>
                           <option value="Uganda">Uganda</option>
                           <option value="United Kingdom">United Kingdom</option>
                           <option value="Ukraine">Ukraine</option>
                           <option value="United Arab Erimates">United Arab Emirates</option>
                           <option value="United States of America">United States of America</option>
                           <option value="Uraguay">Uruguay</option>
                           <option value="Uzbekistan">Uzbekistan</option>
                           <option value="Vanuatu">Vanuatu</option>
                           <option value="Vatican City State">Vatican City State</option>
                           <option value="Venezuela">Venezuela</option>
                           <option value="Vietnam">Vietnam</option>
                           <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                           <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                           <option value="Wake Island">Wake Island</option>
                           <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                           <option value="Yemen">Yemen</option>
                           <option value="Zaire">Zaire</option>
                           <option value="Zambia">Zambia</option>
                           <option value="Zimbabwe">Zimbabwe</option>
                       </Select>
                       </FormControl>
                   </Box>
                   <Box className="form__field">
                       <Stack direction={["column", "row"]} justifyContent="space-between">
                           <FormControl isInvalid={!!errors.password && touched.password} id="password" isRequired>
                               <FormLabel style={{fontSize: "1em"}}>Password</FormLabel>
                               <Input type="password" isInvalid={!!errors.password && touched.password} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" name="password"  />
                               {errors.password && touched.password && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.password}</FormErrorMessage>}
                           </FormControl>

                           <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword} id="confirmPassword" isRequired>
                               <FormLabel style={{fontSize: "1em"}}>Confirm Password</FormLabel>
                               <Input type="password" isInvalid={!!errors.confirmPassword && touched.confirmPassword} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} placeholder="Re-enter password" name="confirmPassword"  />
                               {errors.confirmPassword && touched.confirmPassword && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.confirmPassword}</FormErrorMessage>}
                           </FormControl>
                       </Stack>
                   </Box> 
                   <Center mb="1em"><small className="text__darker">By clicking Register, you agree to our <b>Terms of Use</b> and <b>Privacy Policy</b></small></Center>
                   <Box className="form__field">
                       <Button type="submit" loadingText="Authenticating..." isLoading={isSubmitting} disabled={isSubmitting || !isValid || !dirty} className="form__action__button btn__full-width btn__primary">Sign Up</Button>
                   </Box>
               </form>
           )}
       </Formik> 
    )
}

export default observer(SignUpForm);