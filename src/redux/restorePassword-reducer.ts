const initialState = {
    sendRecoveryEmailSuccess: false,
    recoveryEmail: ''
}

export const restorePasswordReducer = (state: initialStateType = initialState, action: RestorePasswordActionsType) => {
    switch (action.type) {
        case 'SET-RECOVERY-EMAIL':
            return {
                ...state, recoveryEmail: action.payload.email
            }
        case 'SET-RECOVERY-EMAIL=SUCCESS':
            return {
                ...state, sendRecoveryEmailSuccess: action.payload.value
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setRecoveryEmail = (email: string) => ({type: 'SET-RECOVERY-EMAIL', payload: {email}} as const)
export const setRecoveryEmailSuccess = (value: boolean) => ({type: 'SET-RECOVERY-EMAIL=SUCCESS', payload: {value}} as const)

//THUNK CREATORS

//TYPES
export type initialStateType = typeof initialState

export type SetRecoveryEmail = ReturnType<typeof setRecoveryEmail>
export type SetRecoveryEmailSuccess = ReturnType<typeof setRecoveryEmailSuccess>

export type RestorePasswordActionsType =
    | SetRecoveryEmail
    | SetRecoveryEmailSuccess