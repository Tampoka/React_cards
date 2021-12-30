import React from "react";
import {NavLink} from "react-router-dom";
import {Path} from "../../../app/AppRoutes";
import s from "./Header.module.scss"

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.navLinks}>
                <NavLink to={Path.home} className={({isActive}) => (isActive ? s.active : '')}>Home</NavLink>
                <NavLink to={Path.profile} className={({isActive}) => (isActive ? s.active : '')}>Profile</NavLink>
                <NavLink to={Path.login} className={({isActive}) => (isActive ? s.active : '')}>Login</NavLink>
                <NavLink to={Path.register} className={({isActive}) => (isActive ? s.active : '')}>Register</NavLink>
                <NavLink to={Path.error} className={({isActive}) => (isActive ? s.active : '')}>Error404</NavLink>
                <NavLink to={Path.newPassword} className={({isActive}) => (isActive ? s.active : '')}>New
                    Password</NavLink>
                <NavLink to={Path.restorePassword} className={({isActive}) => (isActive ? s.active : '')}>Restore
                    Password</NavLink>
            </div>
        </div>
    );
};

export default Header;