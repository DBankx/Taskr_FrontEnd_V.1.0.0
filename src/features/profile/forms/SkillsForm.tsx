import { Formik } from "formik";
import React, {useContext} from "react";
import {Button, HStack, Input, Select} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {getAllEnumKeys} from "../../../infrastructure/enums/enumFunctions";
import {ExperienceLevel} from "../../../infrastructure/enums/skill";
import rootStoreContext from "../../../application/stores/rootstore";
import {ISkill} from "../../../infrastructure/models/profile";
import * as yup from "yup";

interface IProps{
    cancelEditing: any;
}

const SkillsForm : React.FC<IProps> = ({cancelEditing}) => {
    const {addProfileSkills} = useContext(rootStoreContext).profileStore;
    const validationSchema = yup.object().shape({
        skillName: yup.string().required("Skill name is required"),
        experienceLevel: yup.number().required("Experience level is required")
    }) 
    return (
        <Formik validationSchema={validationSchema} initialValues={{skillName: "", experienceLevel: 0}} onSubmit={(values: ISkill, action) => addProfileSkills(values).then(() => action.setSubmitting(false)).then(() => cancelEditing(false))}>
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
                 <Input isInvalid={!!errors.skillName && touched.skillName} placeholder="Name of a skill E.g. Coding"  className="form__input" name="skillName" onChange={handleChange} onBlur={handleBlur} value={values.skillName} />
                        {errors.skillName && touched.skillName && <small className="form__error">{errors.skillName}</small>}
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
                        <Button disabled={isSubmitting || !isValid || !dirty} type="submit" className="btn btn__primary btn__long" isLoading={isSubmitting}>Add Skill</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(SkillsForm);