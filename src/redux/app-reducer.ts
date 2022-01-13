import {ThunkType} from "./store"

const initialState = {
    isLoading: false,
    error: null as null | string,
    //true if app already/successfully initialized (user authentication, settings etc.)
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-IS-LOADING':
            return {...state, isLoading: action.payload.isLoading}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.payload.value}
        default:
            return {...state}
    }
}

//Action Creators
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', payload: {error}} as const)
export const setAppIsLoading = (isLoading: boolean) => ({type: 'APP/SET-IS-LOADING', payload: {isLoading}} as const)
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', payload: {value}} as const)

//Thunk Creators
export const initializeApp = (): ThunkType => async dispatch => {
    try {
        // await authAPI.authMe();
        // dispatch(setLoggedIn(true));
    } catch (e) {
        console.log((e as Error).message);
    } finally {
        dispatch(setAppInitialized(true));
    }
};

//Types
export type InitialStateType = typeof initialState

export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppIsLoadingActionType = ReturnType<typeof setAppIsLoading>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitialized>

export type AppActionsType =
    | SetAppInitializedActionType
    | SetAppIsLoadingActionType
    | SetAppErrorActionType

