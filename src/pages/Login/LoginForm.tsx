import React from 'react';
import SuperInputText from '../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import s from '../SignUp/SignUp.module.scss'
import * as Yup from "yup";
import {useFormik} from "formik";


type PropsType = {
    isLoading: boolean
    errorMsg: string | null
    toggleShowPassword: () => void
    showPassword: boolean
};

export const LoginForm = React.memo(({
                                         isLoading,
                                         errorMsg,
                                         toggleShowPassword,
                                         showPassword
                                     }: PropsType) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Please Enter your email'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters long')
                .required('Please Enter your password')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    return (
        <div className={s.register}>
            <h2>Learning Cards</h2>
            {/*{isLoading && <Loader/>}*/}
            <p className={s.sectionTitle}>Sign In</p>
            <p className={s.errorMsg}>{errorMsg}</p>
            <div className={s.formContainer}>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <label htmlFor='name'>Email</label>
                    <SuperInputText type={'email'}
                                    name='email' autoFocus
                                    error={formik.touched.email && formik.errors.email
                                        ? formik.errors.email
                                        : ''}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='user-email'/>
                    <label htmlFor='password'>Password</label>
                    <div className={s.inputWithIcons}>
                        <SuperInputText name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        error={formik.touched.password && formik.errors.password
                                            ? formik.errors.password
                                            : ''}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        autoComplete='new-password'/>
                        <span className={s.eye} onClick={toggleShowPassword}></span>
                    </div>

                    <div className={s.btnBlock}>
                        <SuperButton type='submit' disabled={isLoading}>Sign In</SuperButton>
                    </div>
                </form>
            </div>
            <p className={s.loginLink}>Not registered yet? <NavLink to='/register'>Sign Up</NavLink></p>
        </div>
    );
})
