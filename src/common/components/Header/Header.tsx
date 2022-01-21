import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.scss'
import SuperButton from '../SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../redux/store';
import {logOut} from '../../../redux/auth-reducer';

type NavListType = Array<{ title: string, to: string }>;

const Header = React.memo(() => {
        const navList: NavListType = [
            {title: 'Home', to: '/'},
            {title: 'Profile', to: '/profile'},
            {title: 'Decks', to: '/decks'},
            {title: 'Cards', to: '/cards'},
            {title: 'Restore', to: '/restore-password'},
            {title: 'CheckEmail', to: '/check-email'},
            {title: 'Login', to: '/login'},
            {title: 'Sign-Up', to: '/register'},
        ]
        const mappedNavList = navList.map(({to, title}) => <NavLink to={to}
                                                                    className={({isActive}) => (isActive ? s.active : '')}
                                                                    key={to}>{title}</NavLink>)
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
        )
    }
);

export default Header;