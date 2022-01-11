import React from 'react';
import s from './Register.module.scss'
import SuperInputText from '../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import Spinner from "../../common/components/Spinner/Spinner";

type PropsType = {
    disabled: boolean
    email: string
    password: string
    setPassword: (value: string) => void
    setEmail: (value: string) => void
    onSubmitHandler: (e:any) => void
}
const Register = ({disabled, email, password, setPassword, setEmail, onSubmitHandler}: PropsType) => {

    return (
        <div className={s.register}>
            <h2>Learning Cards</h2>
            {disabled && <Spinner/>}
            <p className={s.sectionTitle}>Sign Up</p>
            <div className={s.formContainer}>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="name">Email</label>
                    <SuperInputText name="email" autoFocus
                                    required
                                    value={email}
                                    onChange={(e: any) => setEmail(e.currentTarget.value)}/>
                    <label htmlFor="password">Password</label>
                    <SuperInputText name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e: any) => setPassword(e.currentTarget.value)}/>
                    <label htmlFor="password">Confirm password</label>
                    <SuperInputText name="password" type="password" required/>
                    <div className={s.btnBlock}>
                        <SuperButton type="submit" disabled={disabled}>Register</SuperButton>
                    </div>
                </form>
            </div>
            <p className={s.loginLink}>Already a member? <NavLink to="/login">Sign In</NavLink></p>
        </div>
    );
};

export default Register;