import {RestorePasswordForm} from "./RestorePasswordForm";
import {useAppSelector} from "../../../redux/store";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {passwordRecovery} from '../../../redux/restorePassword-reducer';

const RestorePassword = () => {
    const isLoading=useAppSelector<boolean>(state=>state.app.isLoading)
    const dispatch=useDispatch()
    const onSubmitHandler=useCallback((email:string)=>{
        dispatch(passwordRecovery(email))
    },[dispatch])


    return (
        <div>
            <RestorePasswordForm isLoading={isLoading} onSubmitHandler={onSubmitHandler}/>
        </div>
    );
};

export default RestorePassword;