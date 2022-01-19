import React from 'react';
import SuperInputText from "../../../common/components/SuperInputText/SuperInputText";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import s from './AddDeckForm.module.scss'
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";

type PropsType = {
    onSubmitHandler: (title: string) => void
    isLoading:boolean
}
const AddDeckForm = ({onSubmitHandler,isLoading}: PropsType) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Too Short!')
                .max(25, 'Too Long!')
                .required('Required')
        }),
        onSubmit: (values) => {
            onSubmitHandler(values.name)
            formik.resetForm();
        },
    });
    return (
        <>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <label>
                    Name
                    <SuperInputText  {...formik.getFieldProps('name')}
                                     error={formik.touched.name && formik.errors.name
                                         ? formik.errors.name
                                         : ''}
                    autoComplete='new-title'/>
                </label>
                <SuperButton type='submit' className={s.submitBtn} disabled={isLoading}>Add new deck</SuperButton>
            </form>
        </>
    );
};

export default AddDeckForm;