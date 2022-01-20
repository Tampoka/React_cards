const initialState = {
    password: '',
    //setSuccessNewPass: false,
}

export const newPasswordReducer = (state: initialStateType = initialState, action: NewPasswordActionsType) => {
    switch (action.type) {
        case 'NEW-PASSWORD/SET-NEW-PASSWORD':
            return {
                ...state, password: action.payload.password
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setNewPassword = (password: string) => ({
    type: 'NEW-PASSWORD/SET-NEW-PASSWORD',
    payload: {password}
} as const)

//THUNK CREATORS

//TYPES
export type initialStateType = typeof initialState

export type SetNewPasswordActionType = ReturnType<typeof setNewPassword>
export type NewPasswordActionsType =
    |SetNewPasswordActionType