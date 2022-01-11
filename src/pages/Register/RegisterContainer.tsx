import React from 'react';
import Register from './Register';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {RequestStatusType} from '../../redux/app-reducer';

const RegisterContainer = () => {
    const status=useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)
    return <Register disabled={status==="loading"}/>
};

export default RegisterContainer;