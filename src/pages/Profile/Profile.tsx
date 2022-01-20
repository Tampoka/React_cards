import React from 'react';
import {useAppSelector} from '../../redux/store';
import {ProfileType} from '../../redux/profile-reducer';
import {Navigate} from 'react-router-dom';

const Profile = React.memo(() => {
        const profile = useAppSelector<ProfileType>(state => state.profile.profile)
        const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

        if (!isLoggedIn) {
            return <Navigate to={'/login'}/>;
        }
        return (
            <div>
                <h1>Welcome back, {profile.name}</h1>
                <div>
                    <img src={profile.avatar} alt="avatar"/>
                    <p>Email: {profile.email}</p>
                </div>
            </div>
        );
    }
)
export default Profile;