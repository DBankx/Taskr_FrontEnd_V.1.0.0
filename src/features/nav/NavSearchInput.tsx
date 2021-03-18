import {IconButton, InputGroup, Select} from "@chakra-ui/react";
import React from "react";
import {SearchIcon} from "../../infrastructure/icons/Icons";
import {observer} from "mobx-react-lite";
import { Formik } from "formik";
import {NumberParam, StringParam, useQueryParams} from "use-query-params";
import {history} from "../../index";
import {useLocation} from "react-router-dom";
import {Category} from "../../infrastructure/enums/category";
import {getAllEnumKeys} from "../../infrastructure/enums/enumFunctions";

const NavSearchInput = () => {
   const [navQuery, setNavQuery] = useQueryParams({
       title: StringParam,
       category: NumberParam
   });
   const location = useLocation();
    return (
        <Formik initialValues={{title: navQuery.title ? navQuery.title : undefined, category:  navQuery.category ? navQuery.category : undefined}} onSubmit={(values, action) => {
            if(location.pathname !== "/tasks"){
                history.push("/tasks")
            }
            setNavQuery({
                title: values.title,
                category: values.category
            });
            action.setSubmitting(false);
        }}>
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                isSubmitting
              }) => (
                <form className="navbar__search" onSubmit={handleSubmit}>
                    <input autoComplete="off"  placeholder="Find services..." name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} className="navbar__search__input search__main" />
                    <InputGroup className="navbar__input__group">
                        <Select name="category" value={values.category} onBlur={handleBlur} onChange={handleChange}  placeholder="Please select a category" className="navbar__search__input search__location">
                            {getAllEnumKeys(Category).map((category: string, i) => (
                                <option key={i} value={`${i}`}>{category}</option>
                            ))}
                        </Select>
                    </InputGroup>
                    <IconButton type="submit" isLoading={isSubmitting} className="navbar__search__button" aria-label="Search anything..." icon={<SearchIcon boxSize={8} />} />
                </form>         
            )}
        </Formik>
    )
}

export default observer(NavSearchInput);