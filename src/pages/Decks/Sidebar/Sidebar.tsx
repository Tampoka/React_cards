import React from 'react';
import s from './Sidebar.module.scss'
import {BtnBlock} from '../BtnBlock/BtnBlock';
import { DecksRange } from '../DecksRange/DecksRange';

type PropsType = {
    showPrivate: (value: boolean) => void
    active: boolean
    userName:string
    minCardsCount: number
    maxCardsCount: number
    isLoading:boolean
}

export const Sidebar = ({showPrivate, active,userName,minCardsCount,maxCardsCount,isLoading}: PropsType) => {
    return (
        <div className={s.sidebarContainer}>
            <p>Decks created: <span>18</span></p>
            <BtnBlock showPrivate={showPrivate} active={active}/>
            <DecksRange minCardsCount={minCardsCount} maxCardsCount={maxCardsCount} isLoading={isLoading}/>
        </div>
    );
};

