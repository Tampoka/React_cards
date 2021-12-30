import React from "react";
import {NavLink} from "react-router-dom";
import {Path} from "../../../app/AppRoutes";
import s from "./Header.module.scss"

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.navLinks}>
                <NavLink to={Path.home}>Home</NavLink>
                <NavLink to={Path.profile}>Profile</NavLink>
                <NavLink to={Path.login}>Login</NavLink>
                <NavLink to={Path.register}>Register</NavLink>
                <NavLink to={Path.error}>Error404</NavLink>
                <NavLink to={Path.newPassword}>New Password</NavLink>
                <NavLink to={Path.restorePassword}>Restore Password</NavLink>
            </div>
        </div>
    );
};

export default Header;