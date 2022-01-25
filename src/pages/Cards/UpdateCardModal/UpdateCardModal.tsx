import React from 'react';
import {useModal} from '../../../common/hooks/useModal';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {Modal} from '../../../common/components/Modal/Modal';
import {UpdateCardForm} from './UpdateCardForm/UpdateCardForm';

type PropsType = {
    isLoading: boolean
    onSubmitHandler: (question: string, answer: string) => void
    question: string
    answer: string
}

export const UpdateCardModal = ({isLoading, onSubmitHandler, question, answer}: PropsType) => {
    const {isOpen, onToggle} = useModal()
    return (
        <>
            <SuperButton disabled={isLoading}
                         onClick={() => onToggle()}>Edit</SuperButton>
            <Modal visible={isOpen} setVisible={onToggle}>
                <UpdateCardForm onSubmitHandler={onSubmitHandler} isLoading={isLoading} question={question}
                                answer={answer} closeOnSubmit={onToggle}/>
            </Modal>
        </>
    );
};

