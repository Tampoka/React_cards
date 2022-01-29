import s from './Learn.module.scss'
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/store';
import {Navigate, useParams} from 'react-router-dom';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {getCard, grades} from '../../../utils/grades';
import {useDispatch} from 'react-redux';
import {CardType} from '../../../api/cards-api';
import {fetchCards, gradeAnswer, setCardsPerPage} from '../../../redux/cards-reducer';
import {ROUTES} from '../../../routes/routes';
import {Loader} from '../../../common/components/Loader/Loader';

export const Learn = React.memo(() => {
    const isLoading = useAppSelector(state => state.app.isLoading)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();
    const {cardsPackId} = useParams()
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useAppSelector(state => state.cards.cards)

    const initialState = {
        _id: 'fake',
        cardsPack_id: 'fake',
        answer: 'Fake answer',
        question: 'Fake question',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        __v: 0,
        user_id: '',
        created: '',
        updated: '',
    }
    const [card, setCard] = useState<CardType>(initialState);
    const disabled = isLoading

    useEffect(() => {
        if (first) {
            dispatch(fetchCards({cardsPack_id: cardsPackId, pageCount: 100}));
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards))
        return () => {
            setCardsPerPage(10)
        }
    }, [dispatch, cardsPackId, cards, first]);

    const gradeHandler = (card_id: string, grade: number) => {
        dispatch(gradeAnswer({card_id, grade}))
        onNext()
    }

    const onNext = () => {
        setIsChecked(false);
        cards.length > 0 && setCard(getCard(cards));
    }

    // if (!id) return <Navigate to={ROUTES.DECKS}/>
    if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN}/>

    return (
        <div className={s.learnContainer}>
            <h2>Learn</h2>
            {isLoading && <Loader/>}
            <h2>Question: {card.question}</h2>
            <div className={s.btnBlock}>
                <SuperButton onClick={() => setIsChecked(!isChecked)}>Check yourself</SuperButton>
                <SuperButton onClick={onNext}>Next</SuperButton>
            </div>
            {isChecked && <>
                <h3>Answer: {card.answer}</h3>
                <h2>Please rate your answer</h2>
                <div className={s.gradeButtons}>
                    {grades.map((g, i) => (
                        <SuperButton key={g}
                                     onClick={() => gradeHandler(card._id, i + 1)}
                                     disabled={disabled}>{g}
                        </SuperButton>
                    ))}
                </div>
            </>}
        </div>
    );
})

