import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {Navigate} from 'react-router-dom';
import {useAppSelector} from "../../redux/store";
import {deleteDeck, fetchCardsPacks, PacksInitialState, setPrivateDecks, updateDeck} from "../../redux/decks-reducer";
import {PacksPagination} from "../../common/components/PacksPagination/PacksPagination";
import s from './Decks.module.scss'
import {DecksTable} from "./DecksTable/DecksTable";
import Spinner from "../../common/components/Spinner/Spinner";
import {BtnBlock} from "./BtnBlock/BtnBlock";

export const Decks = React.memo(() => {
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const userId = useAppSelector<string>(state => state.profile.profile._id)

    const {
        cardPacks,
        cardPacksTotalCount,
        minCardsCount,
        maxCardsCount,
        page,
        pageCount,
        privatePacks,
        sortBy,
        currentCardsCount,
        countPerPage
    } = useAppSelector<PacksInitialState>(state => state.decks)

    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)

    const deleteDeckHandler = useCallback((id: string) => {
        dispatch(deleteDeck({id}));
    }, [dispatch, userId]);

    const updateDeckHandler = useCallback((id: string, title: string) => {
        dispatch(updateDeck({cardsPack: {_id: id, name: title}}));
    }, [dispatch, userId]);

    const showPrivate = useCallback((value: boolean) => {
        dispatch(setPrivateDecks(value))
    }, [dispatch])

    useEffect(() => {
        // if (cardPacks.length === 0) {
        dispatch(fetchCardsPacks())
        // }

    }, [dispatch, page, pageCount, currentCardsCount, privatePacks, sortBy, isLoggedIn])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Navigate to='/login'/>
    return (
        <div className={s.decksContainer}>
            {isLoading && <Spinner/>}
            <BtnBlock showPrivate={showPrivate}/>
            <DecksTable decks={cardPacks}
                        deleteDeckHandler={deleteDeckHandler}
                        updateDeckHandler={updateDeckHandler}
            userId={userId}/>
            <PacksPagination totalCount={cardPacksTotalCount}
                             pageCount={pageCount}
                             currentPage={page}
                             countPerPage={countPerPage}/>
        </div>
    )
})

