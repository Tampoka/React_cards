import React from "react";
import {NavLink} from "react-router-dom";
import {routes} from "../../../app/AppRoutes";
import s from "./Header.module.scss"

const Header = () => {
    const mappedNavList = routes.map(({path, title}) => <NavLink to={path}
                                                                 className={({isActive}) => (isActive ? s.active : '')}
                                                                 key={path}>{title}</NavLink>)
    return (
        <div className={s.header}>
            <div className={s.navLinks}>
                {mappedNavList}
            </div>
        </div>
    );
};

export default Header;