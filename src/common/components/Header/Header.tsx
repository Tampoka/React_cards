import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import s from './Header.module.scss'
import SuperButton from '../SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../redux/store';
import {logOut} from '../../../redux/auth-reducer';

type NavListType = Array<{ title: string, to: string }>;

const Header = React.memo(() => {
        const dispatch = useDispatch()

        const navigate = useNavigate()

        const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

        const [showDevPages, setShowDevPages] = useState(false)
        const navList: NavListType = [
            {title: 'Home', to: '/'},
            {title: 'Profile', to: '/profile'},
            {title: 'Decks', to: '/decks'},
        ]
        const devPages: NavListType = [
            {title: 'Sign Up', to: '/register'},
            {title: 'Login', to: '/login'},
            {title: 'Restore Pass', to: '/restore-password'},
            {title: 'New Pass', to: '/new-password'},
            {title: 'Check Email', to: '/check-email'},
        ]
        const mappedNavList = navList.map(({to, title}) => <NavLink to={to}
                                                                    className={({isActive}) => (isActive
                                                                        ? s.active
                                                                        : '')}
                                                                    key={to}>{title}</NavLink>)
        const mappedDevPages = devPages.map(({to, title}) => <NavLink to={to}
                                                                      className={({isActive}) => (isActive
                                                                          ? s.active
                                                                          : '')}
                                                                      key={to}>{title}</NavLink>)

        const signOut = () => dispatch(logOut())

        return (
            <div className={s.header}>
                <div className={s.navLinks}>
                    {mappedNavList}
                </div>
                <div className={s.devPages}>
                    <SuperButton
                        onClick={() => setShowDevPages(!showDevPages)}>{!showDevPages
                        ? 'Show dev pages'
                        : 'Hide dev pages'}</SuperButton>
                    {showDevPages && mappedDevPages}
                </div>
                {isLoggedIn
                    ? <SuperButton
                        onClick={signOut}>Log out</SuperButton>
                    : <SuperButton
                        onClick={()=>navigate('/login')}>Log in</SuperButton>}
            </div>
        )
    }
);

export default Header;