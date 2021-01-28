import { Formik } from "formik";
import React, {useContext} from "react";
import {Button, HStack, Input, Select} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {getAllEnumKeys} from "../../../../infrastructure/enums/enumFunctions";
import {ExperienceLevel} from "../../../../infrastructure/enums/skill";
import rootStoreContext from "../../../../application/stores/rootstore";
import * as yup from "yup";
import {ILanguage} from "../../../../infrastructure/models/profile";

interface IProps{
    cancelEditing: any;
}

const LanguageForm : React.FC<IProps> = ({cancelEditing}) => {
    const {addProfileLanguages} = useContext(rootStoreContext).profileStore;
    const validationSchema = yup.object().shape({
        languageName: yup.string().required("Language name is required"),
        experienceLevel: yup.number().required("Experience level is required")
    })
    return (
        <Formik validationSchema={validationSchema} initialValues={{languageName: "", experienceLevel: 0}} onSubmit={(values : ILanguage, action) => addProfileLanguages(values).then(() => action.setSubmitting(false)).then(() => cancelEditing(false))}>
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
                        <Input isInvalid={!!errors.languageName && touched.languageName} placeholder="Name of a language E.g. English"  className="form__input" name="languageName" onChange={handleChange} onBlur={handleBlur} value={values.languageName} />
                        {errors.languageName && touched.languageName && (
                            <small className="form__error">{errors.languageName}</small>
                        )}
                    </div>
                    <div className="form__field">
                        <Select isInvalid={!!errors.experienceLevel && touched.experienceLevel} name="experienceLevel" onChange={handleChange} onBlur={handleBlur} value={values.experienceLevel} size="lg" className="form__select" placeholder="Experience Level">
                            {getAllEnumKeys(ExperienceLevel).map((experienceLevel, i) => (
                                <option key={i} value={i} >
                                    {experienceLevel}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <HStack justifyContent="space-between">
                        <Button onClick={() => cancelEditing(false)} className="btn btn__long" type="button">Cancel</Button>
                        <Button disabled={isSubmitting || !isValid || !dirty} className="btn btn__primary btn__long" isLoading={isSubmitting} type="submit">Add Language</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(LanguageForm);