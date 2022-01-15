export const ProfileInitialState = {
    profile: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0, // количество колод
        created: '',
        updated: '',
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
        error: '',
    },
    profileError: false
}

export const profileReducer = (state: initialStateType = ProfileInitialState, action: ProfileActionsType) => {
    switch (action.type) {
        case 'PROFILE/SET-USER-PROFILE':
            return {
                ...state, profile: action.payload.profileData
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setProfile = (profileData: ProfileType) => ({
    type: 'PROFILE/SET-USER-PROFILE',
    payload: {profileData}
} as const)

//THUNK CREATORS
// export const fetchProfileData = (): ThunkType => async dispatch => {
//     try {
//         dispatch(setAppIsLoading(true))
//         let res = await authApi.authMe()
//         console.log(res.data)
//         dispatch(setAppInitialized(true))
//         dispatch(setProfile(res.data))
//         dispatch(setAppIsLoading(false))
//     } catch (e: any) {
//         console.log(e as Error)
//         dispatch(setAppError(e.response ? e.response.data.error.toUpperCase() : e));
//     } finally {
//         dispatch(setAppIsLoading(false))
//         dispatch(setAppInitialized(true))
//     }
// }
//TYPES
export type initialStateType = {
    profile: ProfileType
    profileError: boolean
}
export type ProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: string;   //Date
    updated: string   //Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string
}

export type SetProfileActionType = ReturnType<typeof setProfile>
export type ProfileActionsType =
    |SetProfileActionType