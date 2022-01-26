import React from 'react';
import s from './Sidebar.module.scss'
import {BtnBlock} from '../BtnBlock/BtnBlock';
import {DecksRange} from '../DecksRange/DecksRange';
import {useAppSelector} from '../../../redux/store';
import userImg from '../../../assets/images/icons8-person-96.png';
import {UpdateUserProfileModal} from '../../Cards/UpdateUserProfileModal/UpdateUserProfileModal';

type PropsType = {
    showPrivate: (value: boolean) => void
    active: boolean
    minCardsCount: number
    maxCardsCount: number
    isLoading: boolean
    onSubmitHandler:(name:string,avatar:string)=>void
    totalCount:number
}

export const Sidebar = ({showPrivate, active, minCardsCount, maxCardsCount, isLoading,onSubmitHandler,totalCount}: PropsType) => {
    const avatar = useAppSelector(state => state.profile.avatar)
    const userName = useAppSelector(state => state.profile.name)
    return (
        <div className={s.sidebarContainer}>
            <div className={s.profile}>
                <div className={s.avatar}>
                    <img src={avatar ? avatar : userImg} alt="avatar"/>
                </div>
                <p className={s.username}>{userName.includes('@') ? userName.substring(0, userName.indexOf('@')) : userName}</p>
                <UpdateUserProfileModal isLoading={isLoading} onSubmitHandler={onSubmitHandler} userName={userName} avatar={avatar}/>
            </div>
            <div className={s.info}>
                <p>Decks created: <span>{totalCount}</span></p>
                <BtnBlock showPrivate={showPrivate} active={active}/>
                <DecksRange minCardsCount={minCardsCount} maxCardsCount={maxCardsCount} isLoading={isLoading}/>
            </div>
        </div>
    );
};

