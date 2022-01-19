import {AlertMessage} from "./AlertMessage";
import {useAppSelector} from "../../../redux/store";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {setAppError, setAppInfo} from "../../../redux/app-reducer";

export const Alert = () => {
    const error = useAppSelector(state => state.app.error)
    const info = useAppSelector(state => state.app.appInfo)
    const dispatch = useDispatch()

    const onCloseHandler = useCallback(() => {
        dispatch(setAppError(false))
        dispatch(setAppInfo(''))
    }, [dispatch])

    return <AlertMessage text={info} onClose={onCloseHandler} error={error}/>
}
