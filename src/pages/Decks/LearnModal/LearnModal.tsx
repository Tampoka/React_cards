import {useModal} from '../../../common/hooks/useModal';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {Modal} from '../../../common/components/Modal/Modal';
import {Learn} from './Learn/Learn';

type PropsType = {
    deckName: string
    isLoading: boolean
    id:string
}

export const LearnModal = ({deckName, isLoading, id}: PropsType) => {
    const {isOpen, onToggle} = useModal()



    return (
        <>
            <SuperButton disabled={isLoading}
                         onClick={onToggle}>Learn</SuperButton>
            <Modal visible={isOpen} setVisible={onToggle}>
                <Learn onClose={onToggle} id={id}/>
            </Modal>
        </>
    );
};
