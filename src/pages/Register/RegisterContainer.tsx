import React, {useState} from 'react';
import Register from './Register';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {RequestStatusType, setAppStatusAC} from '../../redux/app-reducer';

const RegisterContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const onEmailChange = (value: string) => setEmail(value)
    const onPasswordChange = (value: string) => setPassword(value)
    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        dispatch(setAppStatusAC('loading'))
    }

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return <Register disabled={status === "loading"}
                     email={email}
                     password={password}
                     setEmail={onEmailChange}
                     setPassword={onPasswordChange}
                     onSubmitHandler={onSubmitHandler}
    />
};

export default RegisterContainer;