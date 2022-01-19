import {FormEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SignUpData} from "../../api/auth-api";
import {useAppSelector} from "../../redux/store";
import {setAppError, setAppInfo} from "../../redux/app-reducer";
import {SignUpForm2} from "./SignUpForm2";
import {signUp} from "../../redux/signUp-reducer";

export const SignUp2 = () => {
        const [values, setValues] = useState<SignUpData>({email: '', password: '', confirmPassword: ''});
        const [showPassword, setShowPassword] = useState(false)

        const dispatch = useDispatch();

        const error = useAppSelector<boolean>(state => state.app.error);
        const info = useAppSelector<string>(state => state.app.appInfo);
        const isLoading = useAppSelector<boolean>(state => state.app.isLoading);
        const signUpSuccess = useAppSelector<boolean>(state => state.signUp.signUpSuccess);

        const toggleShowPassword = () => {
            setShowPassword(!showPassword)
        }

        const validate = () => {
            const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (values.email === '' || values.password === '') {
                dispatch(setAppError(true))
                dispatch(setAppInfo('Please fill out all required fields and try again'))
            } else if (!regex.test(values.email)) {
                dispatch(setAppError(true))
                dispatch(setAppInfo('Please enter valid email address.'))
            } else if (values.password.trim().length <= 7) {
                dispatch(setAppError(true))
                dispatch(setAppInfo('Password must be more than 7 characters.'))
            } else if (values.password !== values.confirmPassword) {
                dispatch(setAppError(true))
                dispatch(setAppInfo('Please make sure your passwords match'))
            } else return 1
        }

        const onSubmitHandler = (e: FormEvent) => {
            e.preventDefault();
            if (validate() === 1) {
                dispatch(signUp(values));
                setValues({email: '', password: '', confirmPassword: ''});
            }
        }

        return <SignUpForm2 isLoading={isLoading}
                            errorMsg={info}
                            values={values}
                            setValues={setValues}
                            onSubmitHandler={onSubmitHandler}
                            registrationSuccess={signUpSuccess}
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
        />;
    }
;
