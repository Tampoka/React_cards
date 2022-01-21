import {setAppError, setAppInfo, setAppIsLoading} from './app-reducer';
import {authApi} from '../api/auth-api';
import {ThunkType} from './store';

const initialState = {
    newPasswordSuccess: false,
}

export const newPasswordReducer = (state: initialStateType = initialState, action: NewPasswordActionsType) => {
    switch (action.type) {
        case 'NEW-PASS/SET-NEW-PASSWORD-SUCCESS':
            return {
                ...state, newPasswordSuccess: action.payload.value
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setNewPasswordSuccess = (value: boolean) => ({
    type: 'NEW-PASS/SET-NEW-PASSWORD-SUCCESS',
    payload: {value}
} as const)

//THUNK CREATORS
export const setNewPassword = (password: string, resetPasswordToken: string | undefined): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authApi.newPassword({password, resetPasswordToken})
        if (response.status === 200) {
            dispatch(setNewPasswordSuccess(true))
            dispatch(setAppInfo(response.data.info))
        }
    } catch (e: any) {
        dispatch(setAppError(true))
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

//TYPES
export type initialStateType = typeof initialState

export type SetNewPasswordSuccess = ReturnType<typeof setNewPasswordSuccess>
export type NewPasswordActionsType =
    |SetNewPasswordSuccess