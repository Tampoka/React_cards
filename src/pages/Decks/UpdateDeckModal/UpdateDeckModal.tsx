import {Modal} from '../../../common/components/Modal/Modal';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {useModal} from '../../../common/hooks/useModal';
import {UpdateDeckForm} from './UpdateDeckForm/UpdateDeckForm';

type PropsType = {
    deckName: string
    isLoading: boolean
    onSubmitHandler: (title: string) => void
}

export const UpdateDeckModal = ({deckName, isLoading, onSubmitHandler}: PropsType) => {
    const {isOpen, onToggle} = useModal()

    return (
        <>
            <SuperButton disabled={isLoading}
                         onClick={onToggle}>Edit</SuperButton>
            <Modal visible={isOpen} setVisible={onToggle}>
                <UpdateDeckForm onSubmitHandler={onSubmitHandler} isLoading={isLoading} title={deckName} onClose={onToggle}/>
            </Modal>
        </>
    );
};

