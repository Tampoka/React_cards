import React, {useEffect} from 'react';
import {useAppSelector} from '../../redux/store';
import {ProfileType} from '../../redux/profile-reducer';
import s from './Profile.module.scss';
import userImg from '../../assets/images/icons8-person-96.png'
import {Navigate} from 'react-router-dom';
import {ROUTES} from '../../routes/routes';
import {initializeApp} from '../../redux/app-reducer';
import {useDispatch} from 'react-redux';
import {Loader} from '../../common/components/Loader/Loader';

const Profile = React.memo(() => {
        const dispatch = useDispatch()
        const profile = useAppSelector<ProfileType>(state => state.profile)
        const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
        const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

        useEffect(() => {
            dispatch(initializeApp())
        }, [dispatch])

        if (!isInitialized) return <Loader/>
        if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN}/>

        return (
            <div className={s.profileContainer}>
                <h1>Welcome back ,
                    <span>{profile.name.includes('@') ? profile.name.substring(0, profile.name.indexOf('@')) : profile.name}</span>
                </h1>
                <div className={s.avatar}>
                    <img src={profile.avatar ? profile.avatar : userImg} alt="avatar"/>
                </div>
            </div>
        );
    }
)
export default Profile;