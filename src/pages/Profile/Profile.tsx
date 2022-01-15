import React, {useEffect} from 'react';
import {useAppSelector} from "../../redux/store";
import {ProfileType} from "../../redux/profile-reducer";
import {Navigate, useNavigate} from "react-router-dom";
import {initializeApp} from "../../redux/app-reducer";
import {useDispatch} from "react-redux";

const Profile = React.memo(() => {
        const profile = useAppSelector<ProfileType>(state => state.profile.profile)
        const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
        const error = useAppSelector<string | null>(state => state.app.error)
        const navigate = useNavigate()
        const dispatch = useDispatch()

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