import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {useFormik} from 'formik';
import s from '../AddDeckForm/AddDeckForm.module.scss';
import * as Yup from 'yup';
import React from 'react';

type PropsType = {
    onSubmitHandler: (title: string) => void
    isLoading: boolean
    title: string
}
export const UpdateDeckForm = React.memo(({onSubmitHandler, isLoading, title}: PropsType) => {
    const formik = useFormik({
        initialValues: {
            name: title,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Too Short!')
                .max(25, 'Too Long!')
                .required('Required')
        }),
        onSubmit: (values) => {
            onSubmitHandler(values.name)
        },
    });
    return (
        <>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <SuperInputText  {...formik.getFieldProps('name')}
                                 error={formik.touched.name && formik.errors.name
                                     ? formik.errors.name
                                     : ''}
                                 autoComplete='new-title'
                />
                <SuperButton type='submit' className={s.submitBtn} disabled={isLoading}>Change deck title</SuperButton>
            </form>
        </>
    )
})