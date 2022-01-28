import React, {useCallback, useEffect, useRef} from 'react';
import {useModal} from '../../common/hooks/useModal';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/store';
import {
    CardsInitialStateType,
    createCard,
    deleteCard,
    fetchCards,
    initialState,
    setCardAnswer,
    setCardQuestion,
    setCards,
    setCurrentCardsDeckID,
    setSortCardsMethod,
    updateCard
} from '../../redux/cards-reducer';
import {Navigate, NavLink, useNavigate, useParams} from 'react-router-dom';
import s from './Cards.module.scss'
import {CardsPackType} from '../../api/decks-api';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import {CardsTable} from './CardsTable/CardsTable';
import {CardsPagination} from './CardsPagination/CardsPagination';
import {CardsSearch} from './CardsSearch/CardsSearch';
import {Modal} from '../../common/components/Modal/Modal';
import {AddCardForm} from './AddCardForm/AddCardForm';
import {Loader} from '../../common/components/Loader/Loader';

export const Cards = React.memo(() => {
    const {cardsPackId} = useParams<{ cardsPackId: string }>()
    const {isOpen, onToggle} = useModal()
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const userId = useAppSelector<string>(state => state.profile?._id)
    const cardPacks = useAppSelector<CardsPackType[]>(state => state.decks.cardPacks)
    const currentCardsPack = cardPacks.find(d => d._id === cardsPackId)
    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)
    const navigate = useNavigate()

    const changeCardsSortMethod = (sortMethod: string) => {
        dispatch(setSortCardsMethod(sortMethod))
    }

    const {
        cards,
        page,
        pageCount,
        cardsTotalCount,
        packUserId,
        minGrade,
        maxGrade,
        currentCardsPackID,
        sortCardsMethod,
        currentGrade,
        countPerPage,
        cardAnswer,
        cardQuestion
    } = useAppSelector<CardsInitialStateType>(state => state.cards)

    const deleteCardHandler = useCallback((id: string) => {
        dispatch(deleteCard({id}));
    }, [dispatch]);

    const updateCardHandler = useCallback((id: string, question: string, answer: string) => {
        dispatch(updateCard({card: {_id: id, question, answer}}));
    }, [dispatch]);

    const addNewCardHandler = useCallback((question: string, answer: string) => {
        dispatch(createCard({card: {cardsPack_id: cardsPackId ? cardsPackId : '', question, answer}}))
    }, [dispatch])


    const onCardQuestionSearchCallback = useCallback((value: string) => {
        dispatch(setCardQuestion(value))
    }, [dispatch])
    const onCardAnswerSearchCallback = useCallback((value: string) => {
        dispatch(setCardAnswer(value))
    }, [dispatch])

    useEffect(() => {
        dispatch(setCurrentCardsDeckID(cardsPackId))
        return () => {
            dispatch(setCards(initialState))
        }
    }, [dispatch, cardsPackId])

    useEffect(() => {
        console.log("Cards effect")
        cardsPackId && dispatch(fetchCards())
    }, [dispatch, cardsPackId, page, pageCount, sortCardsMethod, currentGrade ,cardAnswer, cardQuestion, cardsTotalCount])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Navigate to='/login'/>
    return (
        <div className={s.cardsContainer}>
            {currentCardsPack ? < >
                    <SuperButton onClick={() => navigate('/decks')}>Back</SuperButton>
                    {cardsTotalCount === 0
                        ? <h1>There are no cards in this deck.
                            <span>Please <NavLink to={'/decks'}>choose another deck</NavLink></span></h1>
                        : <h1 ref={paginationScrollTopRef}>{currentCardsPack.name}</h1>}
                    {isLoading && <Loader/>}
                    <CardsSearch isLoading={isLoading} onCardQuestionSearchCallback={onCardQuestionSearchCallback}
                                 onCardAnswerSearchCallback={onCardAnswerSearchCallback} totalCount={cardsTotalCount}
                                 onToggle={onToggle} isOwner={userId === packUserId}/>
                    <Modal visible={isOpen} setVisible={onToggle}>
                        <AddCardForm onSubmitHandler={addNewCardHandler} isLoading={isLoading} onClose={onToggle}/>
                    </Modal>
                    <CardsTable cards={cards}
                                deleteCardHandler={deleteCardHandler}
                                updateCardHandler={updateCardHandler}
                                isOwner={userId === packUserId}
                                sortCallback={changeCardsSortMethod}
                                sortMethod={sortCardsMethod}
                                minGrade={minGrade}
                                maxGrade={maxGrade}/>
                </>
                : <h1>Please <NavLink to={'/decks'}>choose deck</NavLink> to start learning</h1>
            }
            <CardsPagination totalCount={cardsTotalCount}
                             pageCount={pageCount}
                             currentPage={page}
                             countPerPage={countPerPage}/>
        </div>
    )
})

