import React from 'react';
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import s from './BtnBlock.module.scss'

type PropsType={
    showPrivate:(value:boolean)=>void
}
export const BtnBlock = ({showPrivate}:PropsType) => {
    return (
        <div className={s.btnBlock}>
            <span>Show</span>
            <SuperButton onClick={()=>showPrivate(false)}>All</SuperButton>
            <SuperButton onClick={()=>showPrivate(true)}>Private</SuperButton>
        </div>
    );
};

