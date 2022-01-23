import React from 'react';
import {useAppSelector} from '../../redux/store';
import {ProfileType} from '../../redux/profile-reducer';
import {useNavigate} from 'react-router-dom';
import s from './Profile.module.scss';
import userImg from '../../assets/images/icons8-person-96.png'

const Profile = React.memo(() => {
        const profile = useAppSelector<ProfileType>(state => state.profile.profile)
        const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
        const navigate = useNavigate()

        if (!isLoggedIn||profile._id!=='') {
            navigate('/login')
        }
        return (
            <div className={s.profileContainer}>
                <h1>Welcome
                    back, <span>{profile.name.includes('@') ? profile.name.substring(0, profile.name.indexOf('@')) : profile.name}</span> !</h1>
                <div className={s.avatar}>
                    <img src={profile.avatar?profile.avatar:userImg} alt="avatar"/>
                </div>
            </div>
        );
    }
)
export default Profile;