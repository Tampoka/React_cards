import React from "react";
import {NavLink} from "react-router-dom";
import {routes} from "../../../app/AppRoutes";
import s from "./Header.module.scss"
import SuperButton from "../SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../redux/store";
import {logOut} from "../../../redux/auth-reducer";

const Header = () => {
    const mappedNavList = routes.map(({path, title}) => <NavLink to={path}
                                                                 className={({isActive}) => (isActive ? s.active : '')}
                                                                 key={path}>{title}</NavLink>)
    const dispatch = useDispatch()
    const signOut = () => dispatch(logOut())
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    return (
        <div className={s.header}>
            <div className={s.navLinks}>
                {mappedNavList}
            </div>
            {isLoggedIn && <SuperButton onClick={signOut}>Log out</SuperButton>}
        </div>
    );
};

export default Header;