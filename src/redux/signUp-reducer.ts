import {authApi, SignUpData} from "../api/auth-api"
import {ThunkType} from "./store";
import {setAppError, setAppInfo, setAppIsLoading} from "./app-reducer";

const initialState = {
    signUpSuccess: false
}

export const signUpReducer = (state: initialStateType = initialState, action: SignUpActionsType) => {
    switch (action.type) {
        case 'SIGN-UP/SET-SIGN-UP':
            return {
                ...state, signUpSuccess: action.payload.value
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setSignedUpSuccess = (value: boolean) => ({
    type: 'SIGN-UP/SET-SIGN-UP',
    payload: {value}
} as const)

//THUNK CREATORS
export const signUp = (signUpData: SignUpData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        const res = await authApi.signUp(signUpData)
        console.log(res.data)
        dispatch(setSignedUpSuccess(true))
        dispatch(setAppInfo('Congratulations! Your registration is confirmed.'))
    } catch (e: any) {
        console.log(e as Error)
        dispatch(setAppError(e.response ? e.response.data.error.toUpperCase() : e));
    } finally {
        dispatch(setAppIsLoading(false))
        dispatch(setSignedUpSuccess(false));
    }
}

//TYPES
export type initialStateType = typeof initialState

export type SignUpSuccessActionType = ReturnType<typeof setSignedUpSuccess>
export type SignUpActionsType =
    |SignUpSuccessActionType