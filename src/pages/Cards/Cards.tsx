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
import {Navigate, NavLink, useParams} from 'react-router-dom';
import s from './Cards.module.scss'
import {CardsPackType} from '../../api/decks-api';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import Spinner from '../../common/components/Spinner/Spinner';
import {CardsTable} from './CardsTable/CardsTable';
import {Search} from '../../common/components/Search/Search';
import {AddItem} from '../Decks/Sidebar/AddItem/AddItem';
import {CardsPagination} from './CardsPagination/CardsPagination';

export const Cards = React.memo(() => {
    const {cardsPackId} = useParams<{ cardsPackId: string }>()
    const {isOpen, onToggle} = useModal()
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const userId = useAppSelector<string>(state => state.profile.profile?._id)
    const cardPacks = useAppSelector<CardsPackType[]>(state => state.decks.cardPacks)
    const currentCardsPack = cardPacks.find(d => d._id === cardsPackId)
    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)

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

    const updateCardHandler = useCallback((id: string, question?: string, answer?: string) => {
        dispatch(updateCard({card: {_id: id, question, answer}}));
    }, [dispatch]);

    const addNewCardHandler = useCallback((cardsPack_id: string) => {
        dispatch(createCard({card: {cardsPack_id}}))
    }, [dispatch])

    const onCardQuestionSearchCallback = useCallback((value: string) => {
        dispatch(setCardQuestion(value))
    }, [dispatch])
    const onCardAnswerSearchCallback = useCallback((value: string) => {
        dispatch(setCardAnswer(value))
    }, [dispatch])

    useEffect(() => {
        dispatch(setCurrentCardsDeckID(cardsPackId))
        // clearing cards
        return () => {
            dispatch(setCards(initialState))
        }
    }, [dispatch, cardsPackId])

    useEffect(() => {
        cardsPackId && dispatch(fetchCards())
    }, [dispatch, cardsPackId, page, pageCount, sortCardsMethod, currentGrade, isLoggedIn, cardAnswer, cardQuestion])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Navigate to='/login'/>
    console.log(currentCardsPack)
    return (
        <div className={s.cardsContainer}>
            {currentCardsPack ? < >
                    <SuperButton><NavLink to={'/decks'}>Back</NavLink></SuperButton>
                    {currentCardsPack.cardsCount === 0
                        ? <h1>There are no cards in this deck.
                            <span>Please <NavLink to={'/decks'}>choose another deck</NavLink></span></h1>
                        : <h1 ref={paginationScrollTopRef}>{currentCardsPack.name}</h1>}
                    <div className={s.searchWithAddItem}>
                        <Search totalCount={cardsTotalCount} searchCallback={onCardQuestionSearchCallback} label='Search by question'/>
                        <Search totalCount={cardsTotalCount} searchCallback={onCardAnswerSearchCallback} label='Search by answer'/>
                        <AddItem title='Add Card' setModal={onToggle} isLoading={isLoading}/>
                    </div>
                    {isLoading && <Spinner/>}
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

            {/*<Modal visible={isOpen} setVisible={onToggle}>*/}
            {/*    <AddDeckForm onSubmitHandler={addNewCardHandler} isLoading={isLoading}/>*/}
            {/*</Modal>*/}

            <CardsPagination totalCount={cardsTotalCount}
                             pageCount={pageCount}
                             currentPage={page}
                             countPerPage={countPerPage}/>
        </div>
    )
})

