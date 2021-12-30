
const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "auth/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//Action Creators
export const setIsLoggedInAC = (value: boolean) => ({
    type: 'auth/SET-IS-LOGGED-IN', value
} as const)


//Thunks Creators


// Types
export type InitialStateType = typeof initialState

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>

type ActionsType = |SetIsLoggedInActionType

