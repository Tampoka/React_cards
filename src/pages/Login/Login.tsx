import {useState} from 'react';
import {useAppSelector} from '../../redux/store';
import {LoginForm} from './LoginForm';

export const Login = () => {
        const [showPassword, setShowPassword] = useState(false)

        const info = useAppSelector<string>(state => state.app.appInfo);
        const isLoading = useAppSelector<boolean>(state => state.app.isLoading);

        const toggleShowPassword = () => {
            setShowPassword(!showPassword)
        }

        return <LoginForm isLoading={isLoading}
                          errorMsg={info}
                          showPassword={showPassword}
                          toggleShowPassword={toggleShowPassword}
        />;
    }
;
