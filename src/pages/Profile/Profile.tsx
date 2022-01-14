import React from 'react';
import {useAppSelector} from "../../redux/store";
import {ProfileType} from "../../redux/profile-reducer";

const Profile = () => {
    const profile = useAppSelector<ProfileType | null>(state => state.profile.profile)
//     profile !== null
//         ? navigate('/profile', {replace: true})
//         : navigate('/login', {replace: true})
// }, [dispatch,profile])
    return (
        <div>
            Profile
        </div>
    );
};

export default Profile;