import React from 'react';

import s from '../FormCommon.module.scss';
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {Navigate, NavLink} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAppSelector} from '../../../redux/store';
import {Loader} from '../../../common/components/Loader/Loader';

type PropsType = {
    isLoading: boolean
    onSubmitHandler: (email: string) => void
}
export const RestorePasswordForm = ({isLoading, onSubmitHandler}: PropsType) => {
    const sendRecoveryEmailSuccess = useAppSelector<boolean>(state => state.restorePassword.sendRecoveryEmailSuccess)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Please Enter your email'),
        }),
        onSubmit: values => {
            onSubmitHandler(values.email)
            formik.resetForm()
        },
    });

    if (sendRecoveryEmailSuccess) return <Navigate to={'/check-email'}/>

    return (
        <div className={s.authContainer}>
            <h2>Learning Cards</h2>
            {isLoading && <Loader/>}
            <p className={s.sectionTitle}>Forgot your password?</p>
            <div className={s.formContainer}>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <label htmlFor='name'>Email</label>
                    <SuperInputText type='email'
                                    error={formik.touched.email && formik.errors.email
                                        ? formik.errors.email
                                        : ''}
                                    {...formik.getFieldProps('email')}
                                    autoComplete='user-email'/>
                    <div className={s.btnBlock}>
                        <SuperButton type='submit' disabled={isLoading}>Send instructions</SuperButton>
                    </div>
                </form>
            </div>
            <div className={s.linksBlock}>
                <p className={s.link}>Did you remember your password?</p>
                <p className={s.link}><NavLink to='/login'>Try logging in</NavLink></p>
            </div>
        </div>
    );
};

