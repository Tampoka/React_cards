import {useAppSelector} from '../../redux/store';
import {ProfileType} from '../../redux/profile-reducer';
import s from './Profile.module.scss';
import userImg from '../../assets/images/icons8-person-96.png'
import {Navigate} from 'react-router-dom';
import {ROUTES} from '../../enums/routes/routes';
import {memo} from 'react';

const Profile = memo(() => {
        const profile = useAppSelector<ProfileType>(state => state.profile)
        const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

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