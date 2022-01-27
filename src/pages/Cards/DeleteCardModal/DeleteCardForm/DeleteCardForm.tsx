import s from '../../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';


type PropsType = {
    isLoading: boolean
    onSubmitHandler: () => void
    onClose: () => void
}

export const DeleteCardForm = ({isLoading, onSubmitHandler, onClose}: PropsType) => {
    return (
        <div className={s.container}>
            <h2>Delete card</h2>
            <button onClick={onClose} className={s.closeBtn}>X</button>
            <p>Do you really want to delete this card?
                Question with answer will be deleted. </p>
            <div className={s.submitBtn}><SuperButton type='submit' disabled={isLoading} red
                                                      onClick={onSubmitHandler}>Delete</SuperButton></div>
        </div>
    );
};

