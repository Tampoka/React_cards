const initialState = {
    isRestored: false
}

export const restorePasswordReducer = (state: initialStateType = initialState, action: RestorePasswordActionsType) => {
    switch (action.type) {
        case 'RESTORE-PASSWORD':
            return {
                ...state, isRestored: action.payload
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const restorePassword = (payload: boolean) => ({
    type: 'RESTORE-PASSWORD',
    payload
} as const)

//THUNK CREATORS

//TYPES
export type initialStateType = typeof initialState

export type RestorePasswordActionType = ReturnType<typeof restorePassword>
export type RestorePasswordActionsType =
    |RestorePasswordActionType