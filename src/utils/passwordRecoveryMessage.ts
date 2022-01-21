import {developmentMode} from '../api/axios-instance';
import {PasswordRecoveryData} from '../api/auth-api';

export const passwordRecoveryMessage = (email: string) => {
    const targetLink = developmentMode
        ? `http://localhost:3000/cards-react/#$/new-password/$token$`
        : `https://tampoka.github.io/cards-react/#$/new-password/$token$`

    const payload: PasswordRecoveryData = {
        email,
        from: 'test-front-admin, <cards@gmail.com>',
        message: `<div style='background-color: #ffb700; padding: 16px'>Password recovery link: <a href='${targetLink}'>link</a></div>`
    }

    return payload
}
