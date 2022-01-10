const initialState = {
    password: '',
}

export const newPasswordReducer = (state: initialStateType = initialState, action: NewPasswordActionsType) => {
    switch (action.type) {
        case 'NEW-PASSWORD/SET-NEW-PASSWORD':
            return {
                ...state, password: action.payload
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setNewPasswordAC = (payload: string) => ({
    type: 'NEW-PASSWORD/SET-NEW-PASSWORD',
    payload
} as const)

//THUNK CREATORS

//TYPES
export type initialStateType = typeof initialState

export type SetNewPasswordActionType = ReturnType<typeof setNewPasswordAC>
export type NewPasswordActionsType =
    |SetNewPasswordActionType