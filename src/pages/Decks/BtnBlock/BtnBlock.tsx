import React from 'react';
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import s from './BtnBlock.module.scss'

type PropsType={
    showPrivate:(value:boolean)=>void
    active:boolean
    setModal:(value:boolean)=>void
}
export const BtnBlock = React.memo(({showPrivate,active,setModal}:PropsType) => {
    return (
        <div className={s.btnBlock}>
            <span>Show</span>
            <SuperButton onClick={()=>showPrivate(false)} className={!active?s.active:''}>All</SuperButton>
            <SuperButton onClick={()=>showPrivate(true)} className={active?s.active:''}>My</SuperButton>
            <div className={s.addBlock}>
                <SuperButton  className={s.addDeckBtn} onClick={() => setModal(true)}>Add deck</SuperButton>

            </div>
        </div>
    );
})

