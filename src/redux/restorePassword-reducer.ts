import {setAppInfo, setAppIsLoading} from './app-reducer';
import {ThunkType} from './store';
import {authApi} from '../api/auth-api';
import {passwordRecoveryMessage} from '../utils/passwordRecoveryMessage';

const initialState = {
    sendRecoveryEmailSuccess: false,
    recoveryEmail: ''
}

export const restorePasswordReducer = (state: initialStateType = initialState, action: RestorePasswordActionsType) => {
    switch (action.type) {
        case 'RESTORE-PASS/SET-RECOVERY-EMAIL':
            return {
                ...state, recoveryEmail: action.payload.email
            }
        case 'RESTORE-PASS/SET-RECOVERY-EMAIL=SUCCESS':
            return {
                ...state, sendRecoveryEmailSuccess: action.payload.value
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setRecoveryEmail = (email: string) => ({type: 'RESTORE-PASS/SET-RECOVERY-EMAIL', payload: {email}} as const)
export const setRecoveryEmailSuccess = (value: boolean) => ({type: 'RESTORE-PASS/SET-RECOVERY-EMAIL=SUCCESS', payload: {value}} as const)

//THUNK CREATORS
export const passwordRecovery = (email: string):ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authApi.passwordRecovery(passwordRecoveryMessage(email))
        dispatch(setRecoveryEmailSuccess(true))
        dispatch(setAppInfo(response.data.info))
        dispatch(setRecoveryEmail(email))
    } catch (e) {
        // errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
        dispatch(setRecoveryEmailSuccess(false))
    }
}

//TYPES
export type initialStateType = typeof initialState

export type SetRecoveryEmail = ReturnType<typeof setRecoveryEmail>
export type SetRecoveryEmailSuccess = ReturnType<typeof setRecoveryEmailSuccess>

export type RestorePasswordActionsType =
    | SetRecoveryEmail
    | SetRecoveryEmailSuccess