import React from 'react';
import {useAppSelector} from "../../redux/store";
import {ProfileType} from "../../redux/profile-reducer";

const Profile = () => {
    const profile = useAppSelector<ProfileType | null>(state => state.profile.profile)
    const error = useAppSelector<string | null>(state => state.app.error)
    // const dispatch = useDispatch()

    if (profile === null) return <div>{error}</div>
    return (
        <div>
            <p>{error}</p>
            <h1>Welcome back, {profile.name}</h1>
            <div>
                <img src={profile.avatar} alt="avatar"/>
                <p>Email: {profile.email}</p>
            </div>
        </div>
    );
};

export default Profile;