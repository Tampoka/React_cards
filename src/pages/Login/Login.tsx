import {useState} from 'react';
import {useAppSelector} from "../../redux/store";
import {LoginForm} from "./LoginForm";

export const Login = () => {
        const [showPassword, setShowPassword] = useState(false)

        const error = useAppSelector<string | null>(state => state.app.error);
        const isLoading = useAppSelector<boolean>(state => state.app.isLoading);

        const toggleShowPassword = () => {
            setShowPassword(!showPassword)
        }

        return <LoginForm isLoading={isLoading}
                          errorMsg={error}
                          showPassword={showPassword}
                          toggleShowPassword={toggleShowPassword}
        />;
    }
;
