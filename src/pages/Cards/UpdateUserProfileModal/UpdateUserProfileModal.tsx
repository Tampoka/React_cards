import React from 'react';
import {useModal} from '../../../common/hooks/useModal';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {Modal} from '../../../common/components/Modal/Modal';
import {UpdateUserProfileForm} from './UpdateUserProfileForm/UpdateUserProfileForm';

type PropsType = {
    isLoading: boolean
    onSubmitHandler: (name: string, avatar: string) => void
    userName: string
    avatar?: string
}

export const UpdateUserProfileModal = ({isLoading, onSubmitHandler, userName, avatar}: PropsType) => {
    const {isOpen, onToggle} = useModal()
    return (
        <>
            <SuperButton disabled={isLoading}
                         onClick={() => onToggle()}>Edit profile</SuperButton>
            <Modal visible={isOpen} setVisible={onToggle}>
                <UpdateUserProfileForm onSubmitHandler={onSubmitHandler} isLoading={isLoading} closeOnSubmit={onToggle}
                                       userName={userName} avatar={avatar?avatar:''}/>
            </Modal>
        </>
    );
};

