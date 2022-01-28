import {CardType} from '../../../../api/cards-api';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../redux/store';
import {useDispatch} from 'react-redux';
import {fetchCards, gradeAnswer, setCardsPerPage} from '../../../../redux/cards-reducer';
import s from '../../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';
import {getCard, grades} from '../../../../utils/grades';
import {Navigate} from 'react-router-dom';
import {ROUTES} from '../../../../routes/routes';

type PropsType = {
    onClose: () => void
    id: string
}

export const Learn = React.memo(({onClose, id}: PropsType) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useAppSelector(state => state.cards.cards)
    const isLoading = useAppSelector(state => state.app.isLoading)

    const initialState = {
        _id: 'fake',
        cardsPack_id: 'fake',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        user_id: '',
        __v: 0,
        created: '',
        updated: '',
    }
    const [card, setCard] = useState<CardType>(initialState);
    const disabled = isLoading

    const onNext = () => {
        setIsChecked(false);
        if (cards.length > 0) setCard(getCard(cards));
    }

    useEffect(() => {
            if (first) {
                dispatch(fetchCards({cardsPack_id: id}));
                setFirst(false);
            }
        if (cards.length > 0) setCard(getCard(cards))
        return () => {
            dispatch(setCardsPerPage(10))
        }
    }, [dispatch, id, cards, first]);

    const gradeHandler = (card_id: string, grade: number) => {
        dispatch(gradeAnswer({card_id, grade}))
        onNext()
    }

    if (!id) return <Navigate to={ROUTES.DECKS}/>
    return (
        <div className={`${s.container} ${s.learnContainer}`}>
            <h2>Learn</h2>
            <button onClick={onClose} className={s.closeBtn}>X</button>
            <h2>Question: {card.question}</h2>
            <div className={s.btnBlock}>
                <SuperButton onClick={() => setIsChecked(!isChecked)} disabled={disabled}>Check yourself</SuperButton>
                <SuperButton onClick={onNext} disabled={disabled}>Next</SuperButton>
            </div>
            {isChecked && <>
                <h3>Answer: {card.answer}</h3>
                <h2>Please rate your answer</h2>
                <div className={s.gradeButtons}>
                    {grades.map((g, i) => (
                        <SuperButton key={g} onClick={() => {
                            gradeHandler(card._id, i + 1)
                        }} disabled={disabled}>{g}
                        </SuperButton>
                    ))}
                </div>
            </>}

            {/*<div className={s.submitBtn}><SuperButton onClick={onNext}>Next</SuperButton></div>*/}
        </div>
    );
})