import React from 'react';
import s from './Additem.module.scss';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';

type PropsType={
    setModal:(value:boolean)=>void
    title:string
}
export const AddItem = ({setModal,title}:PropsType) => {
    return (
        <div className={s.addBlock}>
            <SuperButton  className={s.addDeckBtn} onClick={() => setModal(true)}>{title}</SuperButton>

        </div>
    );
};

