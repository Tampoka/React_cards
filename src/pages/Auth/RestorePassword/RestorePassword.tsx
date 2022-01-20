import {RestorePasswordForm} from "./RestorePasswordForm";
import {useAppSelector} from "../../../redux/store";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {login} from '../../../redux/auth-reducer';

const RestorePassword = () => {
    const isLoading=useAppSelector<boolean>(state=>state.app.isLoading)
    const dispatch=useDispatch()
    const onSubmitHandler=useCallback((value:string)=>{
        dispatch(login(value))
    },[dispatch])
    return (
        <div>
            <RestorePasswordForm isLoading={isLoading} onSubmitHandler={onSubmitHandler}/>
        </div>
    );
};

export default RestorePassword;