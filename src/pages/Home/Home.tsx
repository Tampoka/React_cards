import React, {useEffect} from 'react';
import {initializeApp} from '../../redux/app-reducer';
import {Loader} from '../../common/components/Loader/Loader';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/store';
import s from './Home.module.scss'
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../enums/routes/routes';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import {login} from '../../redux/auth-reducer';

export const Home = () => {
    const dispatch = useDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)

    const setTestAccountLogin = () => {
        const email = process.env.REACT_APP_EMAIL
        const password = process.env.REACT_APP_PASSWORD

        if (!email || !password) {
            throw new Error("Environment variable is not set")
        }

        console.log(email, password)
        dispatch(login({email, password, rememberMe: true}))
    }

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!isInitialized) return <Loader/>

    return (
        <div className={s.homeContainer}>
            <h1>Welcome to Learning Cards</h1>
            <div className={s.description}>
                <p>Studying language, preparing for exam <br/>
                    or just have to memorize some <span>Javascript</span> concepts?</p>
                <p>Using our Learning Cards app you can learn <strong>anytime, anywhere</strong>.</p>
            </div>
            <div className={s.instructions}>
                <p>Choose <span>Decks</span> ⟶ <span>Learn</span> and start answering questions or create your
                    own <span>Cards</span></p>
                <p className={s.rate}>✔ You can rate your answers so that answers with lower rate will display more
                    often to memorize things better.</p>
                <p className={s.test}>Before <NavLink to={ROUTES.REG}>register</NavLink>, you can discover features
                    with test account:</p>
                <SuperButton onClick={setTestAccountLogin}>Proceed with test account</SuperButton>.
            </div>

        </div>
    );
};

