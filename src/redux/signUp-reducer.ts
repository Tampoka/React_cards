const initialState = {
    isSignedUp: false
}

export const signUpReducer = (state: initialStateType = initialState, action: SignUpActionsType) => {
    switch (action.type) {
        case 'SIGN-UP/SET-SIGN-UP':
            return {
                ...state, isSignedUp: action.payload
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setSignedUpAC = (payload: boolean) => ({
    type: 'SIGN-UP/SET-SIGN-UP',
    payload
} as const)

//THUNK CREATORS

//TYPES
export type initialStateType = typeof initialState

export type SignUpActionType = ReturnType<typeof setSignedUpAC>
export type SignUpActionsType =
    |SignUpActionType