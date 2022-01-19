import React from 'react';
import SuperInputText from '../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import {Navigate, NavLink} from 'react-router-dom';
import s from '../SignUp/SignUp.module.scss'
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {login} from "../../redux/auth-reducer";
import SuperCheckbox from "../../common/components/SuperCheckbox/SuperCheckbox";
import {useAppSelector} from "../../redux/store";
import Spinner from "../../common/components/Spinner/Spinner";


type PropsType = {
    isLoading: boolean
    errorMsg: string
    toggleShowPassword: () => void
    showPassword: boolean
};

export const LoginForm = React.memo(({
                                         isLoading,
                                         errorMsg,
                                         toggleShowPassword,
                                         showPassword
                                     }: PropsType) => {
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: 'goal.thanks@gmail.com',
            password: '12345678',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Please Enter your email'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters long')
                .required('Please Enter your password')
            // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character')
        }),
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>;
    }

    return (
        <div className={s.register}>
            <h2>Learning Cards</h2>
            {isLoading && <Spinner/>}
            <p className={s.sectionTitle}>Sign In</p>
            <p className={s.errorMsg}>{errorMsg}</p>
            <div className={s.formContainer}>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <label htmlFor='name'>Email</label>
                    <SuperInputText type='email'
                                    error={formik.touched.email && formik.errors.email
                                        ? formik.errors.email
                                        : ''}
                                    {...formik.getFieldProps('email')}
                                    autoComplete='user-email'/>
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
                    <SuperCheckbox{...formik.getFieldProps('rememberMe')}>Remember Me</SuperCheckbox>
                    <div className={s.btnBlock}>
                        <SuperButton type='submit' disabled={isLoading}>Sign In</SuperButton>
                    </div>
                </form>
            </div>
            <div className={s.linksBlock}>
                <p className={s.loginLink}><NavLink to='/recover'>Forgot password? </NavLink></p>
                <p className={s.loginLink}><NavLink to='/register'>Not registered yet?</NavLink></p>
            </div>
        </div>
    );
})
