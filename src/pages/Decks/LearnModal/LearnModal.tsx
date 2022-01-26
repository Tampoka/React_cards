import {useModal} from '../../../common/hooks/useModal';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import { Modal } from '../../../common/components/Modal/Modal';

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
                    <h2>{deckName}</h2>
                    <p>Lets learn</p>
                </Modal>
            </>
    );
};
