import React from 'react';
import s from './Sidebar.module.scss'
import {BtnBlock} from '../BtnBlock/BtnBlock';

type PropsType = {
    showPrivate: (value: boolean) => void
    active: boolean
}

export const Sidebar = ({showPrivate, active}: PropsType) => {
    return (
        <div className={s.sidebarContainer}>
            <BtnBlock showPrivate={showPrivate} active={active}/>
        </div>
    );
};

