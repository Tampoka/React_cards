import React from 'react';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {Modal} from '../../../common/components/Modal/Modal';
import {DeleteDeckForm} from './DeleteDeckForm/DeleteDeckForm';
import {useModal} from '../../../common/hooks/useModal';

type PropsType = {
    deckName: string
    isLoading: boolean
    onSubmitHandler: () => void
}

export const DeleteDeckModal = ({deckName, isLoading, onSubmitHandler}: PropsType) => {
    const {isOpen, onToggle} = useModal()
    return (
        <>
            <SuperButton disabled={isLoading}
                         onClick={() => onToggle()} red>Delete</SuperButton>
            <Modal visible={isOpen} setVisible={onToggle}>
                <DeleteDeckForm onSubmitHandler={onSubmitHandler} isLoading={isLoading} title={deckName}
                onClose={onToggle}/>
            </Modal>
        </>
    );
};

