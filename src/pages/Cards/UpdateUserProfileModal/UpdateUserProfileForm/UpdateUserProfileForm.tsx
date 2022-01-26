import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import s from '../../AddCardForm/AddCardForm.module.scss';
import SuperInputText from '../../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';

type PropsType={
    isLoading:boolean
    onSubmitHandler: (name:string,avatar:string) => void
    closeOnSubmit:()=>void
    userName: string
    avatar: string
}

export const UpdateUserProfileForm = ({onSubmitHandler,isLoading,closeOnSubmit,userName,avatar}:PropsType) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            avatar: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Too Short!'),
            avatar: Yup.string()
                .min(2, 'Too Short!')
        }),
        onSubmit: (values) => {
            onSubmitHandler(values.name, values.avatar)
            formik.resetForm();
            closeOnSubmit()
        },
    });
    return (
        <div className={s.updateProfileContainer}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <label htmlFor='question'>Name</label>
                <SuperInputText  {...formik.getFieldProps('name')}
                                 error={formik.touched.name && formik.errors.name
                                     ? formik.errors.name
                                     : ''}
                                 autoComplete='new-question'
                                 placeholder={'Name'}/>
                <label htmlFor='answer'>Avatar</label>
                <SuperInputText  {...formik.getFieldProps('avatar')}
                                 error={formik.touched.avatar && formik.errors.avatar
                                     ? formik.errors.avatar
                                     : ''}
                                 autoComplete='new-answer'
                                 placeholder={'Link to your avatar'}/>
                <SuperButton type='submit' className={s.submitBtn} disabled={isLoading}>Save</SuperButton>
            </form>
        </div>
    );
};

