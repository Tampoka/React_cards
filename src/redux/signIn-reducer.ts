const initialState = {
    isSignedIn: false
}

export const signInReducer = (state: initialStateType = initialState, action: SignInActionsType) => {
    switch (action.type) {
        case 'SIGN-IN/SET-SIGN-IN':
            return {
                ...state, isSignedUp: action.payload
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setSignedInAC = (payload: boolean) => ({
    type: 'SIGN-IN/SET-SIGN-IN',
    payload
} as const)

//THUNK CREATORS

//TYPES
export type initialStateType = typeof initialState

export type SignInActionType = ReturnType<typeof setSignedInAC>
export type SignInActionsType =
    |SignInActionType