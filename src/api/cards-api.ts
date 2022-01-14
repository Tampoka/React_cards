import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

const herokuInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

// const messageForRecoverPW = `\n<div style='background-color: lime; padding: 15px'>\n password recovery link: \n<a href='http://localhost:3000/react-project#/pass-recovery/$token$'>link</a>\n</div>\n`;

export const authApi = {
    signUp(payload: SignUpData) {
        return instance.post<SignUpData, AxiosResponse<{ error?: string }>>('/auth/register', payload)
    },
    signIn(payload: SignInData) {
        return instance.post<SignInData, AxiosResponse<AuthResponseType>>('/auth/login', payload)
    },
    signOut() {
        return instance.delete<AxiosResponse>('/auth/me')
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

export type AuthResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}