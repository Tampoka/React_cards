import s from '../../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss'
import React from 'react';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';

type PropsType = {
    title: string
    isLoading: boolean
    onSubmitHandler: () => void
    onClose:()=>void
}

export const DeleteDeckForm = ({title,isLoading,onSubmitHandler,onClose}:PropsType) => {
    return (
        <div className={s.container}>
            <h2>Delete deck</h2>
            <button onClick={onClose} className={s.closeBtn}>X</button>
            <p>Do you really want to delete deck - "{title}"?
            All cards will be excluded from this deck. </p>
            <div  className={s.submitBtn} ><SuperButton type='submit' disabled={isLoading} red onClick={onSubmitHandler}>Delete</SuperButton></div>
        </div>
    );
};

