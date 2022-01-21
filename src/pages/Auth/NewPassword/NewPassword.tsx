import {NewPasswordForm} from './NewPasswordForm';
import {useAppSelector} from '../../../redux/store';
import {useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setNewPassword} from '../../../redux/newPassword-reducer';

export const NewPassword = () => {
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const newPasswordSuccess = useAppSelector<boolean>(state => state.newPassword.newPasswordSuccess)
    const dispatch = useDispatch()
    const {token} = useParams()
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const onSubmitHandler = (password: string) => {
        dispatch(setNewPassword(password, token))
    }

    return (
        <NewPasswordForm isLoading={isLoading} showPassword={showPassword} toggleShowPassword={toggleShowPassword}
                         onSubmitHandler={onSubmitHandler}/>
    );
};

