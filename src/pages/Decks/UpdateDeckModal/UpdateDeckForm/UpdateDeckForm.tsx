import SuperInputText from '../../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';
import {useFormik} from 'formik';
import s from '../../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss';
import * as Yup from 'yup';
import React from 'react';

type PropsType = {
    onSubmitHandler: (title: string) => void
    isLoading: boolean
    title: string
    onClose:()=>void
}
export const UpdateDeckForm = React.memo(({onSubmitHandler, isLoading, title,onClose}: PropsType) => {
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
        <div className={s.container}>
            <h2>Change Title</h2>
            <button onClick={onClose} className={s.closeBtn}>X</button>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <SuperInputText  {...formik.getFieldProps('name')}
                                 error={formik.touched.name && formik.errors.name
                                     ? formik.errors.name
                                     : ''}
                                 autoComplete='new-title'
                />
                <div className={s.submitBtn}><SuperButton type='submit'disabled={isLoading}>Update</SuperButton></div>
            </form>
        </div>
    )
})