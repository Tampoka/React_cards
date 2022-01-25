import React from 'react';
import s from './Additem.module.scss';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';
import {useAppSelector} from '../../../../redux/store';

type PropsType={
    setModal:(value:boolean)=>void
    title:string
    isLoading:boolean
}
export const AddItem = ({setModal,title,isLoading}:PropsType) => {
    return (
        <div className={s.addBlock}>
            <SuperButton  className={s.addDeckBtn} onClick={() => setModal(true)} disabled={isLoading}>{title}</SuperButton>
        </div>
    );
};

