import React, {useCallback, useEffect, useRef} from 'react';
import {useModal} from '../../common/hooks/useModal';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/store';
import {
    CardsInitialStateType,
    createCard,
    deleteCard,
    fetchCards,
    setCurrentCardsDeckID,
    updateCard
} from '../../redux/cards-reducer';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import s from './Cards.module.scss'
import {CardsPackType} from '../../api/decks-api';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import Spinner from '../../common/components/Spinner/Spinner';

export const Cards = React.memo(() => {
    const {cardsPackId} = useParams<{ cardsPackId: string }>()
    console.log(cardsPackId)
    const {isOpen, onToggle} = useModal()
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const userId = useAppSelector<string>(state => state.profile.profile?._id)
    const cardPacks = useAppSelector<CardsPackType[]>(state => state.decks.cardPacks)
    const currentCardsPack = cardPacks.find(d => d._id === cardsPackId)
    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)
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
        countPerPage
    } = useAppSelector<CardsInitialStateType>(state => state.cards)

    const deleteCardHandler = useCallback((id: string) => {
        dispatch(deleteCard({id}));
    }, [dispatch]);

    const updateDeckHandler = useCallback((id: string, question?: string, answer?: string) => {
        dispatch(updateCard({card: {_id: id, question, answer}}));
    }, [dispatch]);

    const addNewCardHandler = useCallback((cardsPack_id: string) => {
        dispatch(createCard({card: {cardsPack_id}}))
    }, [dispatch])

    useEffect(() => {
        dispatch(setCurrentCardsDeckID(cardsPackId))
    }, [dispatch, cardsPackId])

    useEffect(() => {
        cardsPackId && dispatch(fetchCards())
    }, [dispatch, cardsPackId, page, pageCount, sortCardsMethod, currentGrade, isLoggedIn])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Navigate to='/login'/>
    return (
        <div className={s.cardsContainer}>
            {currentCardsPack ? < >
                    <SuperButton><NavLink to={'/decks'}>Back</NavLink></SuperButton>
                    {currentCardsPack.cardsCount === 0
                        ? <h1>There are no cards in this deck.
                            Please <NavLink to={'/decks'}>choose another deck</NavLink></h1>
                        : <h1 ref={paginationScrollTopRef}>{currentCardsPack.name}</h1>}
                    {isLoading && <Spinner/>}
                </>
                : <h1>Please <NavLink to={'/decks'}>choose deck</NavLink> to start learning</h1>
            }

            {/*<Modal visible={isOpen} setVisible={onToggle}>*/}
            {/*    <AddDeckForm onSubmitHandler={addNewCardHandler} isLoading={isLoading}/>*/}
            {/*</Modal>*/}
            {/*<DecksTable decks={cardPacks}*/}
            {/*            deleteDeckHandler={deleteDeckHandler}*/}
            {/*            updateDeckHandler={updateDeckHandler}*/}
            {/*            userId={userId}/>*/}
            {/*<PacksPagination totalCount={cardPacksTotalCount}*/}
            {/*                 pageCount={pageCount}*/}
            {/*                 currentPage={page}*/}
            {/*                 countPerPage={countPerPage}/>*/}


        </div>
    )
})

