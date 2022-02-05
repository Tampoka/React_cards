import s from './Learn.module.scss'
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/store';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {getCard, grades} from '../../../utils/grades';
import {useDispatch} from 'react-redux';
import {CardType} from '../../../api/cards-api';
import {fetchCards, gradeAnswer} from '../../../redux/cards-reducer';
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
    const navigate = useNavigate()

    const [card, setCard] = useState<CardType>({}as CardType);

    useEffect(() => {
        if (first) {
            dispatch(fetchCards({cardsPack_id: cardsPackId}));
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards))
    }, [dispatch, cardsPackId, cards]);

    const gradeHandler = (card_id: string, grade: number) => {
        dispatch(gradeAnswer({card_id, grade}))
        onNext()
    }

    const onNext = () => {
        setIsChecked(false);
        cards.length > 0 && setCard(getCard(cards));
    }

    if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN}/>
    if (isLoading) return <Loader/>
    return (
        <div className={s.learnContainer}>
            <h3>Total: {cards.length} questions</h3>
            {cards.length>0&&<h2>Question: <span className={s.question}>{card.question}</span></h2>}
            <div className={s.btnBlock}>
                <SuperButton onClick={() => navigate('/decks')} red>Back</SuperButton>
                <SuperButton onClick={() => setIsChecked(!isChecked)} disabled={isLoading || !cards.length}>Check
                    yourself</SuperButton>
                <SuperButton onClick={onNext} disabled={isLoading || !cards.length} red>Next</SuperButton>
            </div>
            {isChecked && <>
                <h3>Answer: <span className={s.answer}>{card.answer}</span></h3>
                <h2>Please rate your answer</h2>
                <div className={s.gradeButtons}>
                    {grades.map((g, i) => (
                        <SuperButton className={s.star}
                                     key={g}
                                     onClick={() => gradeHandler(card._id, i + 1)}
                                     disabled={isLoading}
                        ><span>&#9733;</span>

                        </SuperButton>
                    ))}
                </div>
            </>}
        </div>
    );
})

