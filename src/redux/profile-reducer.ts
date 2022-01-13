const initialState = {
    profile: null as null | ProfileType
}

export const profileReducer = (state: initialStateType = initialState, action: ProfileActionsType) => {
    switch (action.type) {
        case 'PROFILE/SET-USER-PROFILE':
            return {
                ...state, profile: action.profile
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setProfile = (profile: ProfileType) => ({
    type: 'PROFILE/SET-USER-PROFILE',
    profile
} as const)

//THUNK CREATORS

//TYPES
export type initialStateType = typeof initialState
export type ProfileType = {
    id: number,
    name: string,
}

export type SetProfileActionType = ReturnType<typeof setProfile>
export type ProfileActionsType =
    |SetProfileActionType