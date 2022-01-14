import {authApi, SignInData} from "../api/cards-api";
import {ThunkType} from "./store";
import {setAppError, setAppIsLoading} from "./app-reducer";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "auth/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//Action Creators
export const setIsLoggedIn = (value: boolean) => ({
    type: 'auth/SET-IS-LOGGED-IN', value
} as const)


//Thunks Creators
export const login = (signInData: SignInData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await authApi.signIn(signInData);
        dispatch(setIsLoggedIn(true))
    } catch (e: any) {
        console.log(e as Error)
        dispatch(setAppError(e.response ? e.response.data.error.toUpperCase() : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const logOut = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await authApi.signOut();
        dispatch(setIsLoggedIn(false))
    } catch (e: any) {
        console.log(e as Error)
        dispatch(setAppError(e.response ? e.response.data.error.toUpperCase() : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

// Types
export type InitialStateType = typeof initialState

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

export type AuthActionsType = |SetIsLoggedInActionType

