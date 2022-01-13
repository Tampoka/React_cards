import {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SignUpData} from "../../api/cards-api";
import {useAppSelector} from "../../redux/store";
import {setAppError} from "../../redux/app-reducer";
import {signUp} from "../../redux/signUp-reducer";
import {Register} from "./Register";

export const RegisterContainer = () => {
    const [values, setValues] = useState<SignUpData>({email: '', password: '', confirmPassword: ''});

    const dispatch = useDispatch();

    const error = useAppSelector<string | null>(state => state.app.error);
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading);
    const signUpSuccess = useAppSelector<boolean>(state => state.signUp.signUpSuccess);

    const validate = () => {
        error && dispatch(setAppError(''));
        if (values.email === '' || values.password === '')
            setAppError('Please fill out all required fields and try again');
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!values.email.toLowerCase().match(regEx)) {
            setAppError('Please enter valid email address.')
        }
        if (values.password.trim().length <= 7) {
            dispatch(setAppError('Password must be more than 7 characters.'));
        }
        if (values.password !== values.confirmPassword) {
            dispatch(setAppError('Please make sure your passwords match'));
        }
        dispatch(signUp(values));
    };
    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
        validate();
        setValues({email: '', password: '', confirmPassword: ''});
    };

    return <Register isLoading={isLoading}
                     errorMsg={error}
                     values={values}
                     setValues={setValues}
                     onSubmitHandler={onSubmitHandler}
                     registrationSuccess={signUpSuccess}
    />;
};

