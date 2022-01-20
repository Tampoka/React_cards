import axios, {AxiosResponse} from 'axios';
import {ProfileType} from '../redux/profile-reducer';

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const herokuInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

// const messageForRecoverPW = `\n<div style='background-color: lime; padding: 15px'>\n password recovery link: \n<a href='http://localhost:3000/react-project#/pass-recovery/$token$'>link</a>\n</div>\n`;

export const authApi = {
    signUp(payload: SignUpData) {
        return instance.post<SignUpData, AxiosResponse<{ error?: string }>>('/auth/register', payload)
    },
    signIn(payload: SignInData) {
        return instance.post<SignInData, AxiosResponse<ProfileType>>('/auth/login', payload)
    },
    signOut() {
        return instance.delete<CommonResponseType>('/auth/me')
    },
    authMe() {
        return instance.post<{}, AxiosResponse<ProfileType>>('/auth/me', {})
    },
    passwordRecovery(payload: PasswordRecoveryData) {
        return instance.post<PasswordRecoveryData, AxiosResponse<PasswordResponse>>('https://neko-back.herokuapp.com/2.0/auth/forgot', payload)
    },
    changeUsersInfo(payload: ChangeUsersInfoData) {
        return instance.put<ChangeUsersInfoData, AxiosResponse<UpdateUserResponse>>('/auth/me', payload)
    },
    newPassword(payload: NewPasswordData) {
        return instance.post<NewPasswordData, AxiosResponse<PasswordResponse>>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, payload)
    }
}


//TYPES
export type LoginData = {
    email: string
    password: string
}

export type SignUpData = LoginData & {
    confirmPassword: string
}

export type SignInData = LoginData & {
    rememberMe: boolean
}

export type CommonResponseType = {
    info: string
    error?: string
}

export type PasswordRecoveryData = {
    email: string,
    from: string,
    message: string
}

export type PasswordResponse = {
    info: string,
    error: string
}

type UpdateUserResponse = {
    updatedUser: UsersInfoResponse
    error?: string
}

export type UsersInfoResponse = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
}

export type ChangeUsersInfoData = {
    name?: string
    avatar?: string
}

export type NewPasswordData = {
    password: string,
    resetPasswordToken: string | undefined
}
