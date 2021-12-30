import React from 'react';
import {NavLink} from "react-router-dom";
import {Path} from "../../../app/AppRoutes";

const Header = () => {
    return (
        <div>
            <div>Menu</div>
            <div>
                <NavLink to={Path.home}>Home</NavLink>
                <NavLink to={Path.profile}
                >Profile</NavLink>
                <NavLink to={Path.login}>Login</NavLink>
                <NavLink to={Path.test}>Test</NavLink>
                <NavLink to={Path.register}
                >Register</NavLink>
            </div>
        </div>
    );
};

export default Header;