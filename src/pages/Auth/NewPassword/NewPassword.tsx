import {NewPasswordForm} from './NewPasswordForm';
import {useAppSelector} from '../../../redux/store';
import React, {useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setNewPassword} from '../../../redux/newPassword-reducer';

export const NewPassword = () => {
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const newPasswordSuccess = useAppSelector<boolean>(state => state.newPassword.newPasswordSuccess)
    const dispatch = useDispatch()
    const {token} = useParams<{token:string}>()
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const onSubmitHandler = (password: string) => {
        dispatch(setNewPassword(password, token))
    }

    if(newPasswordSuccess){
        return <Navigate to={'/login'}/>
    }
    return (
        <NewPasswordForm isLoading={isLoading} showPassword={showPassword} toggleShowPassword={toggleShowPassword}
                         onSubmitHandler={onSubmitHandler}/>
    );
};

