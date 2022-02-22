import React, {useEffect} from 'react';
import {initializeApp} from '../../redux/app-reducer';
import {Loader} from '../../common/components/Loader/Loader';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/store';
import s from './Home.module.scss'

export const Home = () => {
    const dispatch = useDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!isInitialized) return <Loader/>

    return (
        <div className={s.homeContainer}>
          <h1>Welcome to Learning Cards</h1>
        </div>
    );
};

