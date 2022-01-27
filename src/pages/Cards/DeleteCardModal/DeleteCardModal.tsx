import React from 'react';
import {useModal} from '../../../common/hooks/useModal';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {Modal} from '../../../common/components/Modal/Modal';
import {DeleteCardForm} from './DeleteCardForm/DeleteCardForm';

type PropsType = {
    isLoading: boolean
    onSubmitHandler: () => void
}

export const DeleteCardModal = ({isLoading, onSubmitHandler}: PropsType) => {
    const {isOpen, onToggle} = useModal()
    return (
        <>
            <SuperButton disabled={isLoading}
                         onClick={() => onToggle()} red>Delete</SuperButton>
            <Modal visible={isOpen} setVisible={onToggle}>
                <DeleteCardForm onSubmitHandler={onSubmitHandler} isLoading={isLoading}
                                onClose={onToggle}/>
            </Modal>
        </>
    );
};

