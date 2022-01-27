import {useModal} from '../../../common/hooks/useModal';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import { Modal } from '../../../common/components/Modal/Modal';
import s from '../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss';
import React from 'react';

type PropsType = {
    deckName: string
    isLoading: boolean
    onSubmitHandler: (title: string) => void
}

export const LearnModal = ({deckName, isLoading, onSubmitHandler}: PropsType) => {
    const {isOpen, onToggle} = useModal()
    return (
            <>
                <SuperButton disabled={isLoading}
                             onClick={() => onToggle()}>Learn</SuperButton>
                <Modal visible={isOpen} setVisible={onToggle}>
                    <div className={s.container}><h2>{deckName}</h2>
                        <button onClick={onToggle} className={s.closeBtn}>X</button>
                        <p>Lets learn</p></div>
                </Modal>
            </>
    );
};
