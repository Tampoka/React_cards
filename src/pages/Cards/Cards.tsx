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
import {Navigate, useParams} from 'react-router-dom';
import s from '../Decks/Decks.module.scss'
import {CardsPackType} from '../../api/decks-api';

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
    }, [dispatch,cardsPackId, page, pageCount, sortCardsMethod, currentGrade, isLoggedIn])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Navigate to='/login'/>
    return (
        <div className={s.decksContainer}>
            <h1 ref={paginationScrollTopRef}>Cards</h1>

            {currentCardsPack && <div >
                <p> {currentCardsPack.user_name}</p>
            </div>}
            {cardsPackId?<p>{cardsPackId} yo!</p>
            :<p>No deckId</p>}


            {/*<h1 >Cards</h1>*/}
            {/*{isLoading && <Spinner/>}*/}
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

