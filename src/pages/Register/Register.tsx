import React from 'react';
import s from './Register.module.scss'
import SuperInputText from "../../common/components/SuperInputText/SuperInputText";
import SuperButton from "../../common/components/SuperButton/SuperButton";

type PropsType={
    disabled:boolean
}
const Register = ({disabled}:PropsType) => {
    return (
        <div className={s.register}>
            <h2>Learning Cards</h2>
            <p className={s.sectionTitle}>Sign Up</p>
            <div className={s.formContainer}>
                <form>
                    <label htmlFor="name">Email</label>
                    <SuperInputText name="email" autoFocus required/>
                    <label htmlFor="password">Password</label>
                    <SuperInputText name="password" type="password" required/>
                    <label htmlFor="password">Confirm password</label>
                    <SuperInputText name="password" type="password" required/>
                    <div className={s.btnBlock}>
                        <SuperButton type="submit" disabled={disabled}>Register</SuperButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;