const initialState = {
    password: '',
}

export const newPasswordReducer = (state: initialStateType = initialState, action: NewPasswordActionsType) => {
    switch (action.type) {
        case 'NEW-PASSWORD/SET-NEW-PASSWORD':
            return {
                ...state, password: action.password
            }
        default:
            return state
    }
}

export const setNewPassword = (password: string) => ({
    type: 'NEW-PASSWORD/SET-NEW-PASSWORD',
    password
} as const)

//TYPES
export type initialStateType = typeof initialState

export type SetNewPasswordActionType = ReturnType<typeof setNewPassword>
export type NewPasswordActionsType =
    |SetNewPasswordActionType