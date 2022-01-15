import {authApi, SignInData} from "../api/cards-api";
import {ThunkType} from "./store";
import {setAppError, setAppIsLoading} from "./app-reducer";
import {ProfileInitialState, setProfile} from "./profile-reducer";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "auth/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.payload.value}
        default:
            return state
    }
}

//Action Creators
export const setIsLoggedIn = (value: boolean) => ({
    type: 'auth/SET-IS-LOGGED-IN', payload: {value}
} as const)


//Thunks Creators
export const login = (signInData: SignInData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        let res = await authApi.signIn(signInData);
        dispatch(setIsLoggedIn(true))
        dispatch(setProfile(res.data))
    } catch (e: any) {
        console.log(e as Error)
        dispatch(setAppError(e.response ? e.response.data.error.toUpperCase() : e));
    } finally {
        dispatch(setAppIsLoading(false))
        setAppError('')
    }
}

export const logOut = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await authApi.signOut();
        dispatch(setIsLoggedIn(false))
        dispatch(setProfile(ProfileInitialState.profile))
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

