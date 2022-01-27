import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import s from '../../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss';
import SuperInputText from '../../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';

type PropsType={
    isLoading:boolean
    onSubmitHandler: (name:string,avatar:string) => void
    userName: string
    avatar: string
    onClose:()=>void
}

export const UpdateUserProfileForm = ({onSubmitHandler,isLoading,onClose,userName,avatar}:PropsType) => {
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
        },
    });
    return (
        <div className={s.container}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <h2>User Info</h2>
                <button onClick={onClose} className={s.closeBtn}>X</button>
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
                <div  className={s.submitBtn}><SuperButton type='submit' disabled={isLoading}>Save</SuperButton></div>
            </form>
        </div>
    );
};

