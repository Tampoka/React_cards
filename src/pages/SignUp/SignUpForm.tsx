import React, {ChangeEvent, FormEvent} from 'react';
import s from './SignUp.module.scss';
import {SignUpData} from "../../api/cards-api";
import {Navigate, NavLink} from 'react-router-dom';
import SuperInputText from "../../common/components/SuperInputText/SuperInputText";
import SuperButton from "../../common/components/SuperButton/SuperButton";


type PropsType = {
    isLoading: boolean
    values: { email: string, password: string, confirmPassword: string }
    setValues: (values: SignUpData) => void
    onSubmitHandler: (e: FormEvent) => void
    errorMsg: string | null
    registrationSuccess: boolean
    toggleShowPassword: () => void
    showPassword: boolean
};

export const SignUpForm = React.memo(({
                                        values,
                                        setValues,
                                        isLoading,
                                        onSubmitHandler,
                                        errorMsg,
                                        registrationSuccess,
                                        toggleShowPassword,
                                        showPassword
                                    }: PropsType) => {

    if (registrationSuccess) {
        return <Navigate to='/login'/>;
    }
    console.log(errorMsg, isLoading)
    return (
        <div className={s.register}>
            <h2>Learning Cards</h2>
            {/*{isLoading && <Loader/>}*/}
            <p className={s.sectionTitle}>Sign Up</p>
            <p className={s.errorMsg}>{errorMsg}</p>
            <div className={s.formContainer}>
                <form onSubmit={onSubmitHandler} className={s.form}>
                    <label htmlFor='name'>Email</label>
                    <SuperInputText type={'email'}
                                    name='email' autoFocus
                                    required
                                    value={values.email}
                                    autoComplete='user-email'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValues({
                                        ...values,
                                        email: e.currentTarget.value,
                                    })}/>
                    <label htmlFor='password'>Password</label>
                    <div className={s.inputWithIcons}>
                        <SuperInputText name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={values.password}
                                        autoComplete='new-password'
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValues({
                                            ...values,
                                            password: e.currentTarget.value,
                                        })}/>
                        <span className={s.eye} onClick={toggleShowPassword}></span>
                    </div>
                    <label htmlFor='password'>Confirm password</label>
                    <div className={s.inputWithIcons}>
                        <SuperInputText name='confirmPassword'
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.confirmPassword} required
                                        autoComplete='new-password'
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValues({
                                            ...values,
                                            confirmPassword: e.currentTarget.value,
                                        })}/>
                        <span className={s.eye} onClick={toggleShowPassword}></span>
                    </div>
                    <div className={s.btnBlock}>
                        <SuperButton type='submit' disabled={isLoading}>Register</SuperButton>
                    </div>
                </form>
            </div>
            <p className={s.loginLink}>Already a member? <NavLink to='/login'>Sign In</NavLink></p>

        </div>
    );
});


