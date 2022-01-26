import {authApi, ChangeUsersInfoData, UsersInfoResponse} from '../api/auth-api';
import {setAppError, setAppInfo, setAppIsLoading} from './app-reducer';
import {ThunkType} from './store';

export const ProfileInitialState: ProfileType = {
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
}

export const profileReducer = (state: ProfileType = ProfileInitialState, action: ProfileActionsType) => {
    switch (action.type) {
        case 'PROFILE/SET-USER-PROFILE':
            return {
                ...state, ...action.payload.profileData
            }
        case 'PROFILE/UPDATE-USER-PROFILE':
            return {
                ...state, name: action.payload.name,
                avatar: action.payload.avatar
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
export const setUpdatedProfile = (payload: UsersInfoResponse) => ({
    type: 'PROFILE/UPDATE-USER-PROFILE',
    payload
} as const)

//THUNK CREATORS
export const updateProfile = (payload: ChangeUsersInfoData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        const res = await authApi.changeUsersInfo(payload);
        dispatch(setUpdatedProfile(res.data.updatedUser))
        dispatch(setAppInfo('Profile was successfully updated!'));
    } catch (e: any) {
        dispatch(setAppError(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}
//TYPES
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
export type SetUpdatedProfileActionType = ReturnType<typeof setUpdatedProfile>

export type ProfileActionsType =
    | SetProfileActionType
    | SetUpdatedProfileActionType