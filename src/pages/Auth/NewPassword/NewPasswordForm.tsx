import {useFormik} from 'formik';
import * as Yup from 'yup';
import {NavLink} from 'react-router-dom';
import s from '../FormCommon.module.scss';
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import React from 'react';
import {Loader} from '../../../common/components/Loader/Loader';

type PropsType = {
    isLoading: boolean
    showPassword: boolean
    toggleShowPassword: () => void
    onSubmitHandler: (password: string) => void
}
export const NewPasswordForm = React.memo(({
                                               isLoading,
                                               showPassword,
                                               toggleShowPassword,
                                               onSubmitHandler
                                           }: PropsType) => {
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Must be at least 8 characters long')
                .required('Please Enter your password')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Please make sure your passwords match'),
        }),
        onSubmit: values => {
            onSubmitHandler(values.password)
            formik.resetForm()
        },
    });

    return (
        <div className={s.authContainer}>
            <h2>Learning Cards</h2>
            {isLoading && <Loader/>}
            <p className={s.sectionTitle}>Create new password</p>
            <div className={s.formContainer}>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <label htmlFor='password'>Password</label>
                    <div className={s.inputWithIcons}>
                        <SuperInputText type={showPassword ? 'text' : 'password'}
                                        error={formik.touched.password && formik.errors.password
                                            ? formik.errors.password
                                            : ''}
                                        {...formik.getFieldProps('password')}
                                        autoComplete='new-password'/>
                        <span className={s.eye} onClick={toggleShowPassword}></span>
                    </div>
                    <label htmlFor='password'>Confirm password</label>
                    <div className={s.inputWithIcons}>
                        <SuperInputText
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword
                                ? formik.errors.confirmPassword
                                : ''}
                            {...formik.getFieldProps('confirmPassword')}
                            autoComplete='confirm-password'/>
                        <span className={s.eye} onClick={toggleShowPassword}></span>
                    </div>
                    <div className={s.btnBlock}>
                        <SuperButton type='submit' disabled={isLoading}>Sign In</SuperButton>
                    </div>
                </form>
            </div>
            <div className={s.linksBlock}>
                <p className={s.link}><NavLink to='/restore-password'>Forgot password? </NavLink></p>
                <p className={s.link}><NavLink to='/register'>Not registered yet?</NavLink></p>
            </div>
        </div>
    );
})
